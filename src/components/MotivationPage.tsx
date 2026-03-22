import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Heart, Sparkles, Moon, Wind, Leaf, Sun, Shield, Star, Compass, Flower2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSoundEffects } from "../hooks/useSoundEffects";

const FallingPetal = ({ 
  delay = 0, 
  x = 0, 
  duration = 10, 
  size = 15, 
  swing = 10,
  rotationSpeed = 360
}: { 
  delay?: number; 
  x?: number; 
  duration?: number; 
  size?: number;
  swing?: number;
  rotationSpeed?: number;
}) => (
  <motion.div
    initial={{ 
      y: "-10vh", 
      x: `${x}vw`, 
      opacity: 0, 
      rotate: 0,
      scale: 0.5,
      filter: "blur(4px)"
    }}
    animate={{ 
      y: "110vh", 
      x: [
        `${x}vw`, 
        `${x + swing}vw`, 
        `${x - swing * 0.5}vw`, 
        `${x + swing * 0.8}vw`,
        `${x - swing * 0.2}vw`
      ],
      opacity: [0, 1, 1, 0],
      rotate: [0, rotationSpeed * 0.5, rotationSpeed, rotationSpeed * 1.5],
      scale: [0.5, 1.1, 0.9, 1.2, 0.8],
      filter: ["blur(3px)", "blur(0px)", "blur(1px)", "blur(0px)", "blur(2px)"]
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="fixed pointer-events-none z-0 text-sakura-pink/30 mix-blend-screen"
  >
    <Flower2 size={size} fill="currentColor" />
  </motion.div>
);

const BranchBox = ({ quote, index, icon: Icon }: { quote: string; index: number; icon: any; key?: any }) => {
  const { playClick } = useSoundEffects();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={playClick}
      className="group relative p-8 md:p-10 glass-sakura rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 hover:border-sakura-pink/40"
    >
      {/* Branch/Root SVG Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-sakura-pink fill-none">
          <path d="M100,0 C80,20 60,10 40,30 C20,50 30,70 0,100" strokeWidth="2" strokeLinecap="round" />
          <path d="M80,0 C70,15 75,25 60,35" strokeWidth="1" strokeLinecap="round" />
          <path d="M50,15 C45,25 55,30 40,45" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-sakura-pink fill-none">
          <path d="M100,0 C80,20 60,10 40,30 C20,50 30,70 0,100" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="p-4 bg-sakura-pink/10 rounded-full text-sakura-pink group-hover:text-sakura-dark transition-colors duration-700"
        >
          <Icon size={24} />
        </motion.div>
        
        <p className="text-xl md:text-2xl font-elegant italic text-sakura-pink/80 group-hover:text-white leading-relaxed transition-colors duration-700">
          "{quote}"
        </p>
        
        <div className="w-12 h-px bg-sakura-pink/20 group-hover:w-24 group-hover:bg-sakura-pink/50 transition-all duration-700" />
      </div>
    </motion.div>
  );
};

const SakuraBreath = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const { playClick } = useSoundEffects();

  return (
    <div className="flex flex-col items-center gap-12 my-32">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: isBreathing ? [1, 2, 1] : 1,
            opacity: isBreathing ? [0.2, 0.5, 0.2] : 0.2
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-64 h-64 bg-sakura-pink rounded-full blur-3xl"
        />
        
        <motion.button
          onMouseDown={() => { setIsBreathing(true); playClick(); }}
          onMouseUp={() => setIsBreathing(false)}
          onMouseLeave={() => setIsBreathing(false)}
          onTouchStart={() => { setIsBreathing(true); playClick(); }}
          onTouchEnd={() => setIsBreathing(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-40 h-40 glass-sakura rounded-full flex flex-col items-center justify-center gap-2 border-sakura-pink/20 hover:border-sakura-pink/50 transition-all duration-700"
        >
          <Flower2 className={`text-sakura-pink transition-all duration-1000 ${isBreathing ? 'scale-150 rotate-180' : ''}`} size={32} />
          <span className="text-[10px] uppercase tracking-[0.4em] text-sakura-pink/60">
            {isBreathing ? "Bloom..." : "Hold to Bloom"}
          </span>
        </motion.button>
      </div>
      
      <p className="text-sakura-pink/60 font-elegant italic text-lg max-w-xs text-center leading-relaxed">
        Breathe with the sakura. Let every breath bring you a little more peace.
      </p>
    </div>
  );
};

export default function MotivationPage() {
  const containerRef = useRef(null);
  const [petals, setPetals] = useState<{ x: number; delay: number; duration: number; size: number; swing: number; rotationSpeed: number }[]>([]);
  const { scrollYProgress } = useScroll();
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    setPetals(Array.from({ length: 35 }).map(() => ({
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 10,
      size: Math.random() * 15 + 8,
      swing: Math.random() * 20 + 5,
      rotationSpeed: (Math.random() * 360 + 360) * (Math.random() > 0.5 ? 1 : -1)
    })));
  }, []);

  const reminders = [
    { quote: "You do not need to be perfect to be loved.", icon: Heart },
    { quote: "Healing takes time, and time is allowed.", icon: Moon },
    { quote: "Soft hearts are not weak hearts.", icon: Shield },
    { quote: "Small steps still move you forward.", icon: Compass },
    { quote: "Even quiet strength is strength.", icon: Wind },
    { quote: "You are allowed to rest.", icon: Leaf },
    { quote: "Some days are just for breathing, not proving.", icon: Sparkles },
    { quote: "Your pace is still your pace, and that is okay.", icon: Star },
    { quote: "You deserve calm, kindness, and peace.", icon: Sun },
    { quote: "Every breath is a small victory.", icon: Flower2 }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0508] relative overflow-hidden py-32 px-6">
      {/* Cherry Blossom Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-sakura-pink/5 via-transparent to-sakura-dark/5 pointer-events-none z-0" />
      
      {/* Falling Petals */}
      {petals.map((petal, i) => (
        <FallingPetal 
          key={i} 
          x={petal.x} 
          delay={petal.delay} 
          duration={petal.duration}
          size={petal.size}
          swing={petal.swing}
          rotationSpeed={petal.rotationSpeed}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          style={{ opacity: titleOpacity }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-32"
        >
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="inline-block p-6 border border-sakura-pink/10 rounded-full mb-10 relative"
          >
            <Flower2 className="text-sakura-pink" size={32} />
            <div className="absolute inset-0 border border-sakura-pink/20 rounded-full scale-125 animate-pulse" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-sakura-pink mb-8 tracking-tight text-sakura-glow">
            Gentle Reminders
          </h1>
          <p className="text-xl md:text-2xl font-elegant italic text-sakura-pink/50 max-w-2xl mx-auto leading-relaxed">
            Take these as small petals of peace for the days that feel heavy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {reminders.map((item, i) => (
            <BranchBox key={i} quote={item.quote} index={i} icon={item.icon} />
          ))}
        </div>

        <SakuraBreath />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="mt-48 text-center relative py-20"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Flower2 size={300} className="text-sakura-pink" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-sakura-pink/30 mx-auto" />
            <h3 className="text-4xl md:text-5xl font-serif text-sakura-pink italic tracking-tight text-sakura-glow">
              Keep blooming, Aira.
            </h3>
            <p className="text-sakura-pink/40 font-elegant text-lg tracking-[0.2em] uppercase">
              The world is more beautiful with you in it.
            </p>
            <div className="w-px h-24 bg-gradient-to-t from-transparent to-sakura-pink/30 mx-auto" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
