import { motion, useScroll, useTransform, AnimatePresence, useInView } from "motion/react";
import { useRef, useEffect, useState, ReactNode } from "react";
import { ChevronDown, Moon, Wind, Sparkles, Shield, Heart, Zap, Box, Layers, Send } from "lucide-react";
import { useSoundEffects } from "../hooks/useSoundEffects";

const StarField = () => {
  const [stars, setStars] = useState<{ top: string; left: string; size: number; delay: string; duration: string }[]>([]);
  
  useEffect(() => {
    const newStars = Array.from({ length: 200 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 5 + 3}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--delay": star.delay,
            "--duration": star.duration,
            opacity: 0.4,
          } as any}
        />
      ))}
    </div>
  );
};

const MistLayer = () => (
  <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
    <motion.div
      animate={{ 
        x: ["-10%", "10%"],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-0 left-0 right-0 h-[60vh] mist"
    />
    <motion.div
      animate={{ 
        x: ["10%", "-10%"],
        opacity: [0.05, 0.15, 0.05]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      className="absolute bottom-20 left-0 right-0 h-[40vh] mist"
    />
  </div>
);

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  
  return (
    <motion.span>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.03,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface SectionProps {
  children: ReactNode;
  className?: string;
  theme?: "mystical" | "warm" | "vulnerable" | "draining" | "stable" | "split" | "protective" | "peaceful";
  onInView?: () => void;
}

const Section = ({ children, className = "", theme = "mystical", onInView }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    if (isInView && onInView) {
      onInView();
    }
  }, [isInView, onInView]);

  const getThemeStyles = () => {
    switch (theme) {
      case "mystical":
        return "border-white/5 bg-white/[0.02] rounded-[3rem]";
      case "warm":
        return "border-shiva-violet/20 bg-shiva-violet/[0.05] rounded-full shadow-[0_0_50px_rgba(139,92,246,0.1)]";
      case "vulnerable":
        return "border-white/10 bg-white/[0.03] rounded-none skew-x-3 border-dashed";
      case "draining":
        return "border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-[5rem] border-b-0";
      case "stable":
        return "border-white/20 bg-white/[0.05] rounded-xl border-2 shadow-xl";
      case "split":
        return "border-l-2 border-r-2 border-white/10 bg-white/[0.02] rounded-none";
      case "protective":
        return "border-shiva-glow/30 bg-shiva-glow/[0.05] rounded-[4rem] shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]";
      case "peaceful":
        return "border-transparent bg-transparent rounded-none";
      default:
        return "border-white/5 bg-white/[0.02] rounded-3xl";
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 relative ${className}`}
    >
      <motion.div 
        className={`w-full max-w-2xl p-8 sm:p-12 border backdrop-blur-sm transition-all duration-1000 ${getThemeStyles()} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default function MainPage({ hasStarted, onStart }: { hasStarted: boolean; onStart: () => void }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { playScroll } = useSoundEffects();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mountainScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const sections = [
    {
      id: "opening",
      theme: "mystical" as const,
      content: (
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="mb-12 relative"
          >
            <Moon className="w-20 h-20 text-white/20 mx-auto animate-pulse" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/5 rounded-full scale-150"
            />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-serif mb-10 text-glow tracking-tight text-white shadow-black/50 drop-shadow-2xl">
            <TypingText text="Hey Aira…" />
          </h1>
          <div className="space-y-6 text-lg md:text-2xl font-elegant italic text-white/80 leading-relaxed drop-shadow-lg">
            <p><TypingText text="I couldn’t explain everything properly in chat," delay={1} /></p>
            <p><TypingText text="so I made this." delay={2.5} /></p>
            <p><TypingText text="I wanted to say it calmly, clearly," delay={3.5} /></p>
            <p><TypingText text="and without any confusion." delay={5} /></p>
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="mt-20 px-10 py-4 glass rounded-full text-xs uppercase tracking-[0.4em] text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-700 group border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7, duration: 1 }}
          >
            Start reading
            <motion.div 
              className="h-px bg-white/40 w-0 group-hover:w-full transition-all duration-700 mt-1"
            />
          </motion.button>
        </div>
      ),
    },
    {
      id: "talking",
      theme: "warm" as const,
      content: (
        <div className="space-y-10 text-center relative overflow-hidden">
          <Heart className="absolute -top-10 -right-10 w-40 h-40 text-shiva-violet/5 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight drop-shadow-xl flex items-center justify-center gap-4">
            <Sparkles className="text-shiva-violet/40" size={24} />
            I really liked talking to you.
          </h2>
          <div className="space-y-6 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>You never disturbed me.</p>
            <p>In fact, you were one of the few people</p>
            <p>I could genuinely talk to and understand.</p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="pt-6 italic text-white font-serif drop-shadow-2xl text-2xl"
            >
              I didn’t say this much, but I valued our conversations.
            </motion.p>
          </div>
        </div>
      ),
    },
    {
      id: "issue",
      theme: "vulnerable" as const,
      content: (
        <div className="space-y-10 text-left">
          <div className="flex items-center gap-4 mb-6">
            <Wind className="text-white/20" size={32} />
            <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">The real issue</h2>
          </div>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>There’s something about me that I’ve been trying to understand and fix.</p>
            <p>When I start caring about someone, my mind begins to react too strongly to small things.</p>
            <div className="py-6 space-y-4 border-l border-white/10 pl-8">
              {["A late reply…", "a sudden silence…", "a conversation ending in the middle…"].map((t, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5, duration: 1 }}
                  className="text-white/50 italic text-lg"
                >
                  {t}
                </motion.p>
              ))}
            </div>
            <p>These are normal things, but my mind doesn’t treat them normally.</p>
            <p>It keeps thinking about them again and again, even when I don’t want to.</p>
          </div>
        </div>
      ),
    },
    {
      id: "effect",
      theme: "draining" as const,
      content: (
        <div className="space-y-10 text-center">
          <Zap className="w-12 h-12 text-white/20 mx-auto mb-8 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">What it does to me</h2>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>Because of that, I start losing focus.</p>
            <p>It drains my energy, and even when I try to think about my life, my mind keeps going back to the same thoughts.</p>
            <motion.p 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white italic text-2xl"
            >
              I want to talk, but at the same time, I know how much it can affect me.
            </motion.p>
          </div>
        </div>
      ),
    },
    {
      id: "life",
      theme: "stable" as const,
      content: (
        <div className="space-y-10 text-center">
          <Box className="w-12 h-12 text-white/40 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">My life right now</h2>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>Right now, I’m trying to build myself.</p>
            <p>I want to work on my future, improve my situation, take care of my health, my sleep, and become more stable.</p>
            <p>I don’t have unlimited time or resources, so I have to be careful where I invest my energy.</p>
          </div>
        </div>
      ),
    },
    {
      id: "decision",
      theme: "split" as const,
      content: (
        <div className="space-y-10 text-center">
          <Layers className="w-12 h-12 text-white/20 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">The decision</h2>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>So I stepped back.</p>
            <p>Not because you did something wrong. Not because I didn’t like talking to you.</p>
            <motion.div 
              className="py-10 px-10 glass rounded-none border-y border-white/10 bg-white/5 relative"
              whileInView={{ scale: [0.98, 1], opacity: [0, 1] }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <p className="text-2xl text-white font-serif italic drop-shadow-2xl">I stepped back because I couldn’t manage my own mind properly.</p>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </motion.div>
            <p>I didn’t want to keep talking while struggling internally every day.</p>
          </div>
        </div>
      ),
    },
    {
      id: "answer",
      theme: "protective" as const,
      content: (
        <div className="space-y-10 text-center">
          <Shield className="w-16 h-16 text-shiva-glow/40 mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">Answer to your question</h2>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>You once asked me what was wrong in you so you could improve.</p>
            <motion.p 
              className="text-4xl text-white font-serif italic py-8 text-glow drop-shadow-2xl"
              whileInView={{ opacity: [0, 1], filter: ["blur(10px)", "blur(0px)"] }}
              transition={{ duration: 2 }}
            >
              Honestly… there is nothing wrong with you.
            </motion.p>
            <p>This was never about you being a problem.</p>
            <p>The real issue is how my mind reacts, how I handle attachment, and how I deal with small uncertainties.</p>
            <p className="pt-6 text-white font-medium text-2xl">So please don’t think you need to change yourself because of this.</p>
            <motion.p 
              className="text-5xl font-serif text-glow mt-8 text-white drop-shadow-2xl"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              You are not the problem.
            </motion.p>
          </div>
        </div>
      ),
    },
    {
      id: "respect",
      theme: "peaceful" as const,
      content: (
        <div className="space-y-10 text-center">
          <Send className="w-12 h-12 text-white/20 mx-auto mb-8 rotate-[-45deg]" />
          <h2 className="text-3xl md:text-4xl font-serif text-white drop-shadow-xl">Respect and care</h2>
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>You’re a good person, and I respect you.</p>
            <p>I know life can already be heavy sometimes, so I didn’t want to add more weight to it.</p>
            <p>That’s why I chose to say this in a calm and clear way.</p>
          </div>
        </div>
      ),
    },
    {
      id: "ending",
      theme: "peaceful" as const,
      content: (
        <div className="space-y-16 text-center">
          <div className="space-y-8 text-xl font-elegant text-white/70 leading-relaxed drop-shadow-lg">
            <p>I didn’t disappear.</p>
            <p>I just took a step back to understand myself better.</p>
            <p className="italic text-white/40">No pressure. No expectations.</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="space-y-6"
          >
            <h3 className="text-6xl font-serif text-glow tracking-tighter text-white drop-shadow-2xl">Take care, Aira.</h3>
            <div className="w-40 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-12" />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-shiva-dark overflow-hidden">
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            key="entry"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-shiva-dark flex flex-col items-center justify-center text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="relative mb-12"
            >
              <Moon className="w-24 h-24 text-white/10" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/5 rounded-full scale-[2]"
              />
            </motion.div>
            <h2 className="text-2xl font-serif text-white/40 mb-12 tracking-[0.2em] uppercase">A Message for Aira</h2>
            <button
              onClick={onStart}
              className="group relative px-12 py-5 glass rounded-full overflow-hidden transition-all duration-700 hover:scale-105"
            >
              <span className="relative z-10 text-xs uppercase tracking-[0.6em] text-white/60 group-hover:text-white transition-colors">Enter Peacefully</span>
              <motion.div 
                className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </button>
            <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/20">Best experienced with sound</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ 
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5 
        }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        <StarField />
      </motion.div>
      
      <MistLayer />
      
      <div className="fixed inset-0 pointer-events-none z-30 vignette opacity-80" />

      <motion.div 
        style={{ y: mountainY, scale: mountainScale }}
        animate={{ 
          x: mousePos.x * -0.2,
          y: mousePos.y * -0.2 
        }}
        className="fixed bottom-0 left-0 right-0 h-[60vh] pointer-events-none z-10 opacity-30"
      >
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-shiva-dark via-shiva-navy/60 to-transparent" />
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full fill-shiva-navy/40 filter blur-[2px]">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>

      <div className="relative z-40">
        {sections.map((section) => (
          <div key={section.id}>
            <Section theme={section.theme} onInView={() => hasStarted && playScroll()}>
              {section.content}
            </Section>
          </div>
        ))}
      </div>

      <motion.div 
        className="fixed bottom-28 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-3 z-50"
        style={{ opacity }}
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-medium">Scroll to begin</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </div>
  );
}
