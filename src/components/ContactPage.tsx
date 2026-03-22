import { motion, AnimatePresence } from "motion/react";
import { Send, Check, Clock, Eye, Heart, MessageCircle, ChevronRight, ArrowLeft } from "lucide-react";
import { useState, FormEvent } from "react";

const WHATSAPP_NUMBER = "7055502899";

const QUESTIONS = [
  "Are you feeling peaceful right now?",
  "Is this a good time for us to talk?",
  "Do you feel comfortable reaching out?",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "maybe" | "read" | "questions" | "whatsapp">("idle");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAction = (type: any) => {
    setStatus(type);
    if (type === "questions") setCurrentQuestion(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStatus("whatsapp");
    }
  };

  return (
    <div className="min-h-screen bg-shiva-dark/95 relative overflow-hidden flex items-center justify-center p-6 py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-shiva-violet/20 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full glass p-10 rounded-[3rem] relative z-10 shadow-2xl shadow-black/50"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block p-3 bg-white/5 rounded-full mb-6"
          >
            <Heart size={24} className="text-white/40" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-serif text-white/90 mb-6">
            If you ever want to reach out
          </h1>
          <p className="text-lg font-elegant italic text-white/50 max-w-md mx-auto leading-relaxed">
            You do not have to reply. You do not have to decide now. This is only here if you ever want it.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <button
                onClick={() => handleAction("questions")}
                className="group p-6 glass rounded-3xl hover:bg-white/10 transition-all duration-500 flex flex-col items-center gap-4 border border-white/5 hover:border-white/20"
              >
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} className="text-white/60" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/40 group-hover:text-white/80">WhatsApp</span>
              </button>
              
              <button
                onClick={() => handleAction("maybe")}
                className="group p-6 glass rounded-3xl hover:bg-white/10 transition-all duration-500 flex flex-col items-center gap-4 border border-white/5 hover:border-white/20"
              >
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock size={24} className="text-white/60" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/40 group-hover:text-white/80">Maybe later</span>
              </button>
              
              <button
                onClick={() => handleAction("read")}
                className="group p-6 glass rounded-3xl hover:bg-white/10 transition-all duration-500 flex flex-col items-center gap-4 border border-white/5 hover:border-white/20"
              >
                <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  <Eye size={24} className="text-white/60" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/40 group-hover:text-white/80">Just read</span>
              </button>
            </motion.div>
          )}

          {status === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-8"
            >
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-2">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
                <h3 className="text-2xl font-serif text-white/80">{QUESTIONS[currentQuestion]}</h3>
              </div>
              <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <button
                  onClick={handleNextQuestion}
                  className="p-4 glass rounded-2xl hover:bg-white/10 transition-all text-sm font-elegant italic text-white/70 flex items-center justify-center gap-2"
                >
                  Yes, I do <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setStatus("idle")}
                  className="p-4 text-xs uppercase tracking-widest text-white/20 hover:text-white/40 transition-all"
                >
                  Not right now
                </button>
              </div>
            </motion.div>
          )}

          {status === "whatsapp" && (
            <motion.div
              key="whatsapp"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 mb-8">
                <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">My WhatsApp</p>
                <p className="text-3xl font-serif text-white/90 tracking-widest mb-2">+{WHATSAPP_NUMBER}</p>
                <p className="text-sm font-elegant italic text-white/40">Feel free to message whenever you're ready.</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStatus("idle")}
                  className="flex-1 p-4 glass rounded-2xl text-xs uppercase tracking-widest font-medium text-white/40 hover:text-white/80 transition-all"
                >
                  Back
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[2] p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs uppercase tracking-widest font-medium text-white transition-all flex items-center justify-center gap-2"
                >
                  Open WhatsApp
                </a>
              </div>
            </motion.div>
          )}

          {status === "maybe" && (
            <motion.div
              key="maybe"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Clock size={48} className="text-white/20 mx-auto mb-6" />
              <p className="text-2xl font-serif text-white/80 mb-8">That’s completely okay.</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-8 py-3 glass rounded-full text-[10px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-all"
              >
                Return
              </button>
            </motion.div>
          )}

          {status === "read" && (
            <motion.div
              key="read"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <Eye size={48} className="text-white/20 mx-auto mb-6" />
              <p className="text-2xl font-serif text-white/80 mb-8">I understand. Take care, Aira.</p>
              <button
                onClick={() => setStatus("idle")}
                className="px-8 py-3 glass rounded-full text-[10px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-all"
              >
                Return
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
