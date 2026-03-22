import { motion } from "motion/react";
import { Heart, MessageCircle, Moon } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  setPage: (page: string) => void;
}

export default function Navigation({ currentPage, setPage }: NavigationProps) {
  const navItems = [
    { id: "main", label: "Story", icon: Moon },
    { id: "motivation", label: "Reminders", icon: Heart },
    { id: "contact", label: "Reach Out", icon: MessageCircle },
  ];

  return (
    <nav className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto">
      <div className="relative flex items-center justify-around sm:justify-start gap-1 sm:gap-2 p-1.5 sm:p-2 glass rounded-[2rem] border border-white/10 shadow-2xl">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-500 flex items-center gap-2 sm:gap-3 group flex-1 sm:flex-none justify-center sm:justify-start ${
                isActive ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <item.icon 
                size={18} 
                className={`relative z-10 transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`} 
              />
              
              <span className={`relative z-10 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ${
                isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 hidden sm:block group-hover:opacity-40"
              }`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
