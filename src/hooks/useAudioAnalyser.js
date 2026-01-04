import { useState, useEffect, useRef, useCallback } from "react";

// Frequency band ranges (for fftSize 2048, 1024 bins)
// Sample rate ~44100Hz, each bin = ~43Hz
const BASS_RANGE = [0, 10]; // 0-430Hz (bass/sub-bass)
const MID_RANGE = [10, 100]; // 430-4300Hz (mids)
const TREBLE_RANGE = [100, 512]; // 4300Hz+ (highs)

export function useAudioAnalyser(audioSrc) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const frequencyDataRef = useRef(null);
  const isInitializedRef = useRef(false);
  const hasTriedAutoplayRef = useRef(false);

  // Initialize audio context and analyser
  const initAudio = useCallback(() => {
    if (isInitializedRef.current) return audioRef.current;

    try {
      const audio = new Audio(audioSrc);
      audio.crossOrigin = "anonymous";
      audio.loop = true;
      audio.preload = "auto";
      audioRef.current = audio;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);

      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      sourceRef.current = source;

      // Audio event listeners
      audio.addEventListener("play", () => {
        setIsPlaying(true);
        setNeedsInteraction(false);
      });

      audio.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      audio.addEventListener("ended", () => {
        // Loop is set, but just in case
        audio.currentTime = 0;
        audio.play();
      });

      isInitializedRef.current = true;
      setIsReady(true);

      return audio;
    } catch (e) {
      console.warn("Audio initialization error:", e);
      return null;
    }
  }, [audioSrc]);

  // Get frequency data for visualizer
  const getFrequencyData = useCallback(() => {
    if (!analyserRef.current || !frequencyDataRef.current) {
      return { bass: 0, mid: 0, treble: 0, average: 0, raw: new Uint8Array(0) };
    }

    analyserRef.current.getByteFrequencyData(frequencyDataRef.current);
    const data = frequencyDataRef.current;

    // Calculate averages for each band
    const getAverage = (start, end) => {
      let sum = 0;
      const actualEnd = Math.min(end, data.length);
      for (let i = start; i < actualEnd; i++) {
        sum += data[i];
      }
      return sum / (actualEnd - start) / 255; // Normalize to 0-1
    };

    return {
      bass: getAverage(...BASS_RANGE),
      mid: getAverage(...MID_RANGE),
      treble: getAverage(...TREBLE_RANGE),
      average: getAverage(0, data.length),
      raw: data,
    };
  }, []);

  // Play audio
  const play = useCallback(async () => {
    let audio = audioRef.current;
    if (!audio) {
      audio = initAudio();
    }
    if (!audio) return;

    // Resume audio context if suspended (browser autoplay policy)
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch (e) {
        console.warn("AudioContext resume failed:", e);
      }
    }

    try {
      await audio.play();
      localStorage.removeItem("musicPlayerPaused");
      setNeedsInteraction(false);
    } catch (e) {
      console.warn("Audio play failed:", e);
      setNeedsInteraction(true);
    }
  }, [initAudio]);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    localStorage.setItem("musicPlayerPaused", "true");
  }, []);

  // Toggle play/pause
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Initialize and attempt autoplay on mount
  useEffect(() => {
    const userPaused = localStorage.getItem("musicPlayerPaused") === "true";

    // Initialize audio system immediately
    initAudio();

    // If user hasn't explicitly paused, try to autoplay
    if (!userPaused && !hasTriedAutoplayRef.current) {
      hasTriedAutoplayRef.current = true;

      // Try to play immediately
      play().catch(() => {
        // Autoplay blocked - set up listeners for ANY user interaction
        setNeedsInteraction(true);
      });
    }
  }, [initAudio, play]);

  // Set up global interaction listeners to start audio on ANY interaction
  useEffect(() => {
    const userPaused = localStorage.getItem("musicPlayerPaused") === "true";
    if (userPaused) return;

    const startOnInteraction = () => {
      if (!isPlaying && audioRef.current) {
        play();
      }
      // Remove listeners after first successful interaction
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("keydown", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      document.removeEventListener("scroll", startOnInteraction);
    };

    // Add listeners for common user interactions
    document.addEventListener("click", startOnInteraction, { once: true });
    document.addEventListener("keydown", startOnInteraction, { once: true });
    document.addEventListener("touchstart", startOnInteraction, { once: true });
    document.addEventListener("scroll", startOnInteraction, { once: true });

    return cleanup;
  }, [isPlaying, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    isPlaying,
    isReady,
    needsInteraction,
    play,
    pause,
    toggle,
    getFrequencyData,
    audioElement: audioRef.current,
  };
}
