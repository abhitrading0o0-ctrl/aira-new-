import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BackgroundAudioProps {
  forcePlay?: boolean;
}

export default function BackgroundAudio({ forcePlay }: BackgroundAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73456.mp3");
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (forcePlay && audioRef.current && !isPlaying) {
      audioRef.current.play().catch((e) => console.log("Audio play blocked", e));
      setIsPlaying(true);
    }
  }, [forcePlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-8 right-8 z-[100]"
    >
      <button
        onClick={togglePlay}
        className="glass p-3 rounded-full text-white/40 hover:text-white/80 transition-all duration-500 group relative"
        title={isPlaying ? "Mute" : "Play soothing music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <Volume2 size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <VolumeX size={18} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/10 rounded-full"
          />
        )}
      </button>
    </motion.div>
  );
}
