import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Hospital Verified Knowledge Base for HOPE Executive Hospital
const HOSPITAL_KNOWLEDGE = `
HOSPITAL PROFILE:
- Name: HOPE Executive Hospital
- Nature: Premium Private Executive Medical Facility
- Location: C4VJ+F9V, Kashmir Rd, C Block Amin Town, Faisalabad, Pakistan
- Contact Telephone: +92 313 7115700
- Operating Hours: Open 24 Hours daily (24/7 Emergency, Inpatient, and Pharmacy Services)
- Verified Google Maps Rating: 4.4 out of 5 stars (based on 21 patient reviews)
- Patient Highlights: Known for neat, clean clinical environment, swift attentive care, private executive consultation suites.

PRACTICES & SPECIALISTS ON PREMISE:
1. Dietitian Ubaid ur Rehman (Clinical Nutritionist & Dietetics)
   - Rating: 4.8 / 5
   - Scope: Medical nutrition therapy, metabolic management, diabetes diet planning, weight management, cardiovascular nutrition.
   - Availability: 24-hour appointment booking and clinical consultations.
2. Professional Aesthetics & Skin Care Clinic
   - Rating: 5.0 / 5
   - Scope: Advanced clinical dermatology, medical aesthetics, skin rejuvenation, acne & scar treatments, pigmentation therapies.
   - Operating Hours: Open daily until 10:00 PM.
3. 24/7 Emergency & Acute Medical Care
   - Staffed day and night for medical emergencies, trauma stabilization, urgent general care, and observational admissions.
4. Executive General Medicine & Diagnostics
   - Routine and executive health checkups, laboratory diagnostic panels, hypertension & diabetes management, preventive screenings.
5. Pediatrics & Family Wellness
   - Routine child health checkups, vaccination guidance, general pediatric outpatient consultations.

CLINICAL & SAFETY BOUNDARIES:
- The assistant MUST NEVER diagnose diseases or prescribe medications.
- If a patient mentions severe symptoms (severe chest pain, difficulty breathing, heavy uncontrolled bleeding, sudden stroke signs, loss of consciousness, severe trauma), immediately instruct them to visit the 24/7 Emergency Department at Kashmir Rd, Amin Town, Faisalabad, or call the emergency line directly at +92 313 7115700.
- State clearly that appointment requests through this digital assistant are handled as inquiries for the executive scheduling desk.
`;

// Initialize GoogleGenAI server-side with telemetry header
let genAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback deterministic AI assistant logic when Gemini API key is absent or offline
function getFallbackResponse(message: string): string {
  const query = message.toLowerCase();

  if (query.includes('chest pain') || query.includes('emergency') || query.includes('bleeding') || query.includes('breathing') || query.includes('heart attack')) {
    return 'EMERGENCY ALERT: If you or someone with you is experiencing chest pain, severe shortness of breath, heavy bleeding, or acute distress, please proceed immediately to the 24/7 Emergency Department at HOPE Executive Hospital, Kashmir Rd, C Block Amin Town, Faisalabad, or call our 24-hour line at +92 313 7115700.';
  }

  if (query.includes('diet') || query.includes('nutrition') || query.includes('ubaid')) {
    return 'Dietitian Ubaid ur Rehman (Clinical Nutritionist, 4.8★ rating) is available at HOPE Executive Hospital. He provides medical nutrition therapy, metabolic planning, weight management, and diabetic diet programs. You can request a consultation through our online appointment form or by calling +92 313 7115700.';
  }

  if (query.includes('skin') || query.includes('aesthetic') || query.includes('derma')) {
    return 'The Professional Aesthetics and Skin Care Clinic (5.0★ rating) at HOPE Executive Hospital is open daily until 10:00 PM. Our specialists offer medical dermatology, aesthetic skin rejuvenation, acne treatment, and clinical skincare protocols.';
  }

  if (query.includes('address') || query.includes('location') || query.includes('where')) {
    return 'HOPE Executive Hospital is located at C4VJ+F9V, Kashmir Rd, C Block Amin Town, Faisalabad, Pakistan. We are easily accessible from main Kashmir Road with dedicated patient parking and 24/7 admission access.';
  }

  if (query.includes('time') || query.includes('hour') || query.includes('open')) {
    return 'HOPE Executive Hospital is open 24 hours a day, 7 days a week for emergency, inpatient, and acute clinical services. Departmental outpatient clinics operate throughout the day, and our Aesthetics Clinic is open until 10:00 PM.';
  }

  if (query.includes('phone') || query.includes('contact') || query.includes('call') || query.includes('number')) {
    return 'You can contact HOPE Executive Hospital directly at +92 313 7115700. Our reception and emergency triage desk are active 24/7 to assist you with appointments and admissions.';
  }

  if (query.includes('appointment') || query.includes('book')) {
    return 'You can request an executive appointment directly on this website using our 5-step appointment request tool. Simply choose your preferred department (such as Clinical Nutrition, Aesthetics, or General Medicine), pick a preferred time, and our patient desk will review your slot.';
  }

  return 'Welcome to HOPE Executive Hospital. We are a private executive medical facility on Kashmir Road, C Block Amin Town, Faisalabad, open 24/7. How can I assist you with doctor schedules, clinical nutrition with Dietitian Ubaid ur Rehman, our Aesthetics Clinic, or appointment inquiries today?';
}

// API: Patient Assistant Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!genAI || !process.env.GEMINI_API_KEY) {
      const reply = getFallbackResponse(message);
      res.json({ reply, source: 'hospital-knowledge-engine' });
      return;
    }

    // Call Gemini 3.8 Flash model
    const systemInstruction = `You are the official digital patient assistant for HOPE Executive Hospital, a private executive medical facility in Faisalabad, Pakistan.
${HOSPITAL_KNOWLEDGE}

Guidelines:
1. Provide warm, clear, professional, concise, and reassuring answers.
2. Never invent policies, doctor names, or prices not in the knowledge base.
3. If an inquiry is potentially urgent, prioritize patient safety and direct them immediately to the 24/7 emergency department at Kashmir Rd, Amin Town, Faisalabad, or phone +92 313 7115700.
4. Do not provide diagnostic conclusions or drug prescriptions.
5. Emphasize that this is a digital hospital desk assistant for patient information and appointment scheduling.`;

    const chatContents = [
      ...conversationHistory.slice(-4).map((h: { role: string; text: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const reply = response.text || getFallbackResponse(message);
    res.json({ reply, source: 'gemini-ai' });
  } catch (error) {
    console.warn('Gemini chat error, returning verified fallback:', error);
    const reply = getFallbackResponse(req.body?.message || '');
    res.json({ reply, source: 'fallback-knowledge' });
  }
});

// API: Appointment Demo Inquiries
app.post('/api/appointments', (req, res) => {
  const { department, doctor, date, timeSlot, patientName, patientPhone, notes } = req.body;
  if (!patientName || !patientPhone || !department) {
    res.status(400).json({ error: 'Please provide patient name, contact number, and desired service.' });
    return;
  }

  const referenceCode = `HEH-${Math.floor(100000 + Math.random() * 900000)}`;
  res.json({
    success: true,
    referenceCode,
    status: 'Demo Inquiry Logged',
    message: 'Your appointment inquiry has been received for demonstration purposes.',
    details: {
      department,
      doctor: doctor || 'Consultant on Duty',
      date,
      timeSlot,
      patientName,
      patientPhone,
      hospitalPhone: '+92 313 7115700',
      address: 'Kashmir Rd, C Block Amin Town, Faisalabad',
    },
  });
});

// Dev server or Production static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`HOPE Executive Hospital server running at http://0.0.0.0:${port}`);
  });
}

startServer();
