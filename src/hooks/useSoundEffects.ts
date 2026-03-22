import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const scrollAudio = useRef<HTMLAudioElement | null>(null);

  // Initialize sounds
  if (typeof window !== 'undefined' && !clickAudio.current) {
    clickAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // Soft click
    clickAudio.current.volume = 0.2;
    
    scrollAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Soft whoosh/tick
    scrollAudio.current.volume = 0.1;
  }

  const playClick = useCallback(() => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
  }, []);

  const playScroll = useCallback(() => {
    if (scrollAudio.current) {
      scrollAudio.current.currentTime = 0;
      scrollAudio.current.play().catch(() => {});
    }
  }, []);

  return { playClick, playScroll };
};
