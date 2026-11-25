import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Bot,
  User,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface Message {
  id: string;
  role: 'assistant' | 'user' | 'system';
  text: string;
  isEmergencyAlert?: boolean;
}

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Hello. I am the HOPE Executive Hospital digital patient assistant. How can I help you today with our 24/7 services, clinical nutrition with Dietitian Ubaid ur Rehman, or scheduling inquiries?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const suggestedPrompts = [
    'What services does the hospital offer?',
    'How do I consult with Dietitian Ubaid ur Rehman?',
    'Where is the hospital located and hours?',
    'Do you have 24/7 emergency care?',
    'Tell me about the Aesthetics clinic',
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInputValue('');
    setLoading(true);

    // Urgent symptom detection check
    const lower = textToSend.toLowerCase();
    const isUrgent =
      lower.includes('chest pain') ||
      lower.includes('heart attack') ||
      lower.includes('unconscious') ||
      lower.includes('can\'t breathe') ||
      lower.includes('heavy bleeding') ||
      lower.includes('severe accident') ||
      lower.includes('emergency');

    if (isUrgent) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            text: 'CRITICAL MEDICAL NOTICE: If you or anyone near you is experiencing severe symptoms like acute chest pain, respiratory distress, or severe bleeding, please call our 24/7 emergency desk immediately at +92 313 7115700 or proceed directly to our emergency room at Kashmir Rd, C Block Amin Town, Faisalabad.',
            isEmergencyAlert: true,
          },
        ]);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          conversationHistory: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            text: data.reply,
          },
        ]);
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Deterministic client fallback with verified hospital facts
      let fallbackAnswer =
        'HOPE Executive Hospital is located on Kashmir Road, C Block Amin Town, Faisalabad. We are open 24/7 for medical emergencies, and feature specialized clinics including Clinical Nutrition with Dietitian Ubaid ur Rehman (4.8★) and Professional Aesthetics & Skin Care (5.0★). For appointments or immediate questions, call +92 313 7115700.';

      if (lower.includes('diet') || lower.includes('nutrition') || lower.includes('ubaid')) {
        fallbackAnswer =
          'Dietitian Ubaid ur Rehman (4.8★ rating, BS Hons Nutrition) leads the Clinical Nutrition & Dietetics practice at HOPE Executive Hospital. He provides medical nutrition therapy for diabetes, cardiovascular lipids, and clinical weight management. Consultations are available 24 hours by appointment.';
      } else if (lower.includes('aesthetic') || lower.includes('skin') || lower.includes('derma')) {
        fallbackAnswer =
          'The Professional Aesthetics and Skin Care Clinic (5.0★ rating) at HOPE Executive Hospital is open daily until 10:00 PM. Our clinical team provides medical dermatology, acne scar treatment, skin rejuvenation, and laser procedures.';
      } else if (lower.includes('appointment') || lower.includes('book')) {
        fallbackAnswer =
          'You can use the 5-step appointment tool on this website to request a consultation, or contact our reception desk directly at +92 313 7115700.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: fallbackAnswer,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1769AA] hover:bg-[#10243A] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2.5 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#1769AA] focus:ring-offset-2"
          aria-label="Open Hospital AI Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline text-xs font-bold tracking-wide">
            Patient Assistant
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[calc(100vw-2.5rem)] sm:w-[410px] h-[550px] max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          role="dialog"
          aria-label="Hospital AI Assistant Dialog"
        >
          {/* Header */}
          <div className="bg-[#10243A] text-white p-4 px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769AA] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">Patient Digital Assistant</div>
                <div className="text-[10px] text-slate-300">HOPE Executive Hospital · Faisalabad</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome-reset',
                      role: 'assistant',
                      text: 'Conversation reset. How can I assist you with hospital information, specialist availability, or appointments today?',
                    },
                  ])
                }
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Demo & Safety Disclaimer Strip */}
          <div className="bg-blue-50/90 border-b border-blue-100 px-4 py-1.5 text-[10px] text-slate-600 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 text-[#1769AA] font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>Informational Demo Desk</span>
            </div>
            <span className="text-slate-500">Not for medical emergencies</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#1769AA] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    H
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1769AA] text-white rounded-br-none'
                      : msg.isEmergencyAlert
                      ? 'bg-rose-50 border border-rose-200 text-rose-900 rounded-bl-none shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.isEmergencyAlert && (
                    <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Immediate Emergency Advisory</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1769AA] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  H
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3 rounded-bl-none shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about hospital services, doctors, hours..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA] outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || loading}
                className="p-2.5 bg-[#1769AA] hover:bg-[#10243A] disabled:opacity-40 text-white rounded-xl transition-colors shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Emergency 24/7 Helpline:</span>
              <a href={`tel:${HOSPITAL_INFO.phone}`} className="text-[#1769AA] font-bold hover:underline">
                {HOSPITAL_INFO.displayPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
