"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// Seeded pseudo-random to avoid hydration mismatch
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Smooth lerp for fluid animations
function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

// ============================================================
// SMOOTH SCROLL PROVIDER - tracks scroll with interpolation
// ============================================================
function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = window.scrollY;
    };

    const animate = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, 0.08);
      if (Math.abs(currentRef.current - targetRef.current) > 0.5) {
        setScrollY(currentRef.current);
      } else {
        currentRef.current = targetRef.current;
        setScrollY(targetRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return scrollY;
}

// ============================================================
// CONFIGURACION
// ============================================================
const CONFIG = {
  musicUrl: "/musica.mp3",
  chapter1Image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuOkNdloWMvaGaG51ymytVFoIDpB_kPbTzFYUBo8aD3HRzSxt_tdTMNGazpkscLTmrJrtPXo2omcu73-6g0BkuCo_ivp9zimbInC5e3tk0mcJV5N0EVMBINIO88dcXfxRy6WW5kqZE6EX9qyIVO8HY-djHKAedxgdu-9L6zBJeF-Ah3Rfn62r3o_WIJMgUNmOWHFLhfpkLwL7V26sOjtw4oDyDPe3Ja1hzbzX2sn25JRVzsYF3VYssvjLCOmAEvrOrS8k1aMfBpA",
  chapter2Image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrh2E5v2NHuWXpGuTrpmfCsxkPstLEqOZho6YtX-GG4iFH1BZyVav11jjPmkXtS33yRa7yJFCxzISo6m82cBVRzt-3hMoPV5aSSs07VJ-fxhnVfNm2SlQZIyqbHdqWMgajungmgdqkCtIACFQX3_1zXMg9Vu32jKYl2Ezpp4ccSujMPO3jEvkGR0JYAnrBWxj_stcvc-t5h76Bd9YnAoFB7ce0xP88u_vAPxFKOi_sG9VpD98XxNwZN6oc4IAIldCOJAce2joAuw",
};

// ============================================================
// MUSIC BUTTON
// ============================================================
function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Autoplay: intenta reproducir al cargar, si el navegador bloquea, reproduce en el primer click
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Navegador bloqueó autoplay, reproducir en primer interacción
        const playOnInteraction = () => {
          audio.play().then(() => setPlaying(true));
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction, { once: true });
        document.addEventListener("touchstart", playOnInteraction, { once: true });
      });
    };

    tryPlay();
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      {CONFIG.musicUrl && (
        <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="auto" />
      )}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-end px-6 py-4 pointer-events-none">
        <button
          onClick={toggle}
          aria-label="Toggle Music"
          className="pointer-events-auto flex items-center justify-center glass rounded-full w-11 h-11 group cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg"
        >
          <span className="material-symbols-outlined text-primary group-hover:text-primary-deep transition-colors text-xl">
            {playing ? "music_off" : "music_note"}
          </span>
        </button>
      </nav>
    </>
  );
}

// ============================================================
// FLOATING PARTICLES (dreamy hearts, stars, dots)
// ============================================================
function FloatingParticles() {
  const particles = [
    { icon: "favorite", size: "text-sm", left: "5%", delay: "0s", duration: "7s", top: "10%" },
    { icon: "favorite", size: "text-xs", left: "15%", delay: "1.5s", duration: "8s", top: "25%" },
    { icon: "star", size: "text-xs", left: "25%", delay: "3s", duration: "6s", top: "60%" },
    { icon: "favorite", size: "text-lg", left: "35%", delay: "0.5s", duration: "9s", top: "40%" },
    { icon: "star", size: "text-sm", left: "48%", delay: "4s", duration: "7.5s", top: "15%" },
    { icon: "favorite", size: "text-xs", left: "58%", delay: "2s", duration: "8.5s", top: "70%" },
    { icon: "star", size: "text-xs", left: "68%", delay: "5s", duration: "6.5s", top: "35%" },
    { icon: "favorite", size: "text-sm", left: "78%", delay: "1s", duration: "7s", top: "55%" },
    { icon: "star", size: "text-xs", left: "88%", delay: "3.5s", duration: "9s", top: "20%" },
    { icon: "favorite", size: "text-xs", left: "92%", delay: "2.5s", duration: "8s", top: "80%" },
    { icon: "favorite", size: "text-xs", left: "42%", delay: "6s", duration: "7s", top: "45%" },
    { icon: "star", size: "text-sm", left: "72%", delay: "4.5s", duration: "6s", top: "65%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`particle material-symbols-outlined ${p.size} text-primary/20`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}

// ============================================================
// SCROLL REVEAL (smooth progressive reveal based on scroll position)
// ============================================================
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    const update = () => {
      if (!el || triggered.current) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Element starts revealing when its top enters the bottom 85% of viewport
      const start = windowH * 0.92;
      const end = windowH * 0.45;
      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - clamped, 3);
      setProgress(eased);
      if (eased >= 1) {
        triggered.current = true;
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const translateY = (1 - progress) * 60;
  const scale = 0.95 + progress * 0.05;
  const blur = (1 - progress) * 6;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: progress,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        willChange: progress < 1 ? "transform, opacity, filter" : "auto",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// PARALLAX IMAGE (smooth interpolated)
// ============================================================
function ParallaxImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distFromCenter = (elementCenter - windowHeight / 2) / windowHeight;
      targetOffset.current = distFromCenter * -50;
    };

    const animate = () => {
      currentOffset.current = lerp(currentOffset.current, targetOffset.current, 0.06);
      setOffset(currentOffset.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="w-full h-full bg-cover bg-center scale-[1.15]"
        style={{
          backgroundImage: `url('${src}')`,
          transform: `translateY(${offset}px) scale(1.15)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ============================================================
// BOKEH LIGHTS
// ============================================================
function BokehLights({ count = 6, seed = 0 }: { count?: number; seed?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const lights = Array.from({ length: count }, (_, i) => {
    const s = seed * 100 + i;
    return {
      size: 4 + seededRandom(s) * 8,
      left: `${10 + seededRandom(s + 1) * 80}%`,
      top: `${10 + seededRandom(s + 2) * 80}%`,
      color: ["#F9A8D4", "#C4B5FD", "#FDE68A", "#FBCFE8"][i % 4],
      duration: `${4 + seededRandom(s + 3) * 6}s`,
      delay: `${seededRandom(s + 4) * 4}s`,
    };
  });

  return (
    <>
      {lights.map((l, i) => (
        <div
          key={i}
          className="bokeh"
          style={{
            width: l.size,
            height: l.size,
            left: l.left,
            top: l.top,
            backgroundColor: l.color,
            animationDuration: l.duration,
            animationDelay: l.delay,
          }}
        />
      ))}
    </>
  );
}

// ============================================================
// CELEBRATION SCREEN
// ============================================================
function CelebrationScreen({ onClose }: { onClose: () => void }) {
  const heartColors = ["#EC4899", "#F9A8D4", "#C4B5FD", "#FDE68A", "#FB7185", "#A78BFA"];

  const hearts = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const rad = (angle * Math.PI) / 180;
    const distance = 80 + seededRandom(i * 10) * 120;
    return {
      tx: `${Math.cos(rad) * distance}px`,
      ty: `${Math.sin(rad) * distance}px`,
      rot: `${-180 + seededRandom(i * 10 + 1) * 360}deg`,
      color: heartColors[i % heartColors.length],
      size: 14 + seededRandom(i * 10 + 2) * 20,
      delay: `${seededRandom(i * 10 + 3) * 0.4}s`,
    };
  });

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    left: `${seededRandom(i * 20 + 500) * 100}%`,
    color: heartColors[i % heartColors.length],
    duration: `${2 + seededRandom(i * 20 + 501) * 3}s`,
    delay: `${seededRandom(i * 20 + 502) * 1.5}s`,
    size: 6 + seededRandom(i * 20 + 503) * 6,
    rotation: seededRandom(i * 20 + 504) * 360,
  }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-celebration-in">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      {/* Confetti */}
      {confettiPieces.map((c, i) => (
        <div
          key={`confetti-${i}`}
          className="confetti"
          style={{
            left: c.left,
            width: c.size,
            height: c.size * 0.6,
            backgroundColor: c.color,
            borderRadius: "2px",
            animationDuration: c.duration,
            animationDelay: c.delay,
            transform: `rotate(${c.rotation}deg)`,
          }}
        />
      ))}

      {/* Heart explosion */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((h, i) => (
          <span
            key={`heart-${i}`}
            className="heart-particle material-symbols-outlined"
            style={{
              "--tx": h.tx,
              "--ty": h.ty,
              "--rot": h.rot,
              color: h.color,
              fontSize: h.size,
              animationDelay: h.delay,
            } as React.CSSProperties}
          >
            favorite
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        <div className="mb-8">
          <span
            className="material-symbols-outlined text-primary animate-heartbeat inline-block"
            style={{ fontSize: 80 }}
          >
            favorite
          </span>
        </div>

        <h2 className="font-display text-5xl md:text-6xl font-bold text-gradient mb-6 leading-tight">
          Sabia que dirias que si!
        </h2>

        <p className="text-xl md:text-2xl text-text-main/80 font-light mb-4 leading-relaxed">
          Este es solo el comienzo de nuestro proximo capitulo juntos.
        </p>

        <p className="text-lg text-primary/70 font-medium mb-12">
          Te quiero infinitamente
        </p>

        <button
          onClick={onClose}
          className="glass rounded-full px-8 py-3 text-text-main/70 hover:text-primary transition-colors cursor-pointer hover:scale-105 duration-300 text-sm font-medium tracking-wide"
        >
          Volver a leer nuestra historia
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
// ============================================================
// SMOOTH PARALLAX SECTION (content moves at different scroll speed)
// ============================================================
function SmoothSection({
  children,
  className = "",
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const dist = (center - windowH / 2) / windowH;
      targetRef.current = dist * -30 * speed;
    };

    const animate = () => {
      currentRef.current = lerp(currentRef.current, targetRef.current, 0.05);
      setOffset(currentRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const smoothScroll = useSmoothScroll();

  // Hero parallax: content moves up slightly as you scroll down
  const heroContentY = smoothScroll * -0.15;
  const heroOpacity = Math.max(1 - smoothScroll / 800, 0);

  return (
    <>
      <FloatingParticles />
      <MusicButton />

      {showCelebration && (
        <CelebrationScreen onClose={() => setShowCelebration(false)} />
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-mesh">
        {/* Aurora glows */}
        <div className="aurora-glow w-[500px] h-[500px] bg-primary-soft/40 top-[-10%] right-[-5%]" />
        <div className="aurora-glow w-[600px] h-[600px] bg-lavender-deep/30 bottom-[-15%] left-[-10%]" style={{ animationDelay: "4s" }} />
        <div className="aurora-glow w-[300px] h-[300px] bg-peach/50 top-[40%] left-[60%]" style={{ animationDelay: "8s" }} />

        <div
          className="relative z-10 flex flex-col items-center max-w-2xl animate-fade-in-up"
          style={{
            transform: `translateY(${heroContentY}px)`,
            opacity: heroOpacity,
            willChange: "transform, opacity",
          }}
        >
          {/* Heart icon with glow */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150" />
            <svg
              className="relative text-primary drop-shadow-lg"
              fill="currentColor"
              height="70"
              width="70"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold text-gradient mb-6 tracking-tight leading-[1.1]">
            Nuestra historia
          </h1>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />

          <h2 className="text-base md:text-lg font-light uppercase tracking-[0.25em] text-text-main/60">
            Un capitulo que quiero seguir escribiendo contigo
          </h2>

          <div className="mt-20 animate-glow-pulse text-primary/60">
            <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
          </div>
        </div>
      </section>

      {/* ===== CAPITULO 1: Cuando te conoci ===== */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        {/* Aurora background */}
        <div className="aurora-glow w-[400px] h-[400px] bg-lavender/60 top-[10%] right-[-5%]" style={{ animationDelay: "2s" }} />

        <SmoothSection speed={0.5} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal className="order-2 md:order-1">
            <div className="relative group">
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-lavender-deep/40 to-primary-soft/40 rounded-2xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" />
              <ParallaxImage
                src={"img5.jpg"}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
              />
              {/* Glass overlay label */}
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-2 text-center">
                <span className="text-xs font-medium tracking-widest text-text-main/60 uppercase">El comienzo</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 md:order-2 flex flex-col justify-center" delay={200}>
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <span className="text-gradient font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
                Capitulo 1
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-text-main font-bold leading-tight mb-6">
                Cuando te conoci
              </h2>
              <p className="text-base md:text-lg text-text-main/75 leading-relaxed font-light mb-6">
                Recuerdo el dia exacto en que te vi por primera vez. El mundo parecia moverse a una
                velocidad normal, pero cuando cruzamos miradas, todo se detuvo. No sabia que en ese
                momento mi vida estaba a punto de cambiar para siempre, ganando un color que nunca antes
                habia visto.
              </p>
              <div className="flex items-center gap-2 text-primary/50">
                <span className="material-symbols-outlined text-sm">favorite</span>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">El comienzo</span>
              </div>
            </div>
          </ScrollReveal>
        </SmoothSection>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="material-symbols-outlined text-primary text-xs">favorite</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary to-transparent" />
        </div>
      </div>

      {/* ===== CAPITULO 2: Lo que me haces sentir ===== */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        {/* Aurora */}
        <div className="aurora-glow w-[500px] h-[500px] bg-peach/50 bottom-[5%] left-[-8%]" style={{ animationDelay: "6s" }} />
        <BokehLights count={8} seed={1} />

        <SmoothSection speed={0.4} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal className="flex flex-col justify-center text-left md:text-right order-1">
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <span className="text-gradient font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
                Capitulo 2
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-text-main font-bold leading-tight mb-6">
                Lo que me haces sentir
              </h2>
              <p className="text-base md:text-lg text-text-main/75 leading-relaxed font-light mb-6">
                Contigo, los lunes no pesan y los silencios no son incomodos. Me has ensenado que el
                amor no es solo mariposas, sino una paz inmensa. Tu risa es mi sonido favorito y tu
                calma es el refugio donde siempre quiero estar. Eres mi hogar.
              </p>
              <div className="flex items-center md:justify-end gap-2 text-primary/50">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">Paz y risas</span>
                <span className="material-symbols-outlined text-sm">sentiment_satisfied</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-2 flex justify-center" delay={200}>
            <div className="relative animate-levitate">
              {/* Glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-peach/60 to-primary-soft/40 rounded-lg blur-2xl opacity-50" />
              {/* Polaroid */}
              <div className="relative bg-white p-4 pb-14 shadow-2xl rounded-md">
                <div className="aspect-[3/4] w-72 md:w-80 bg-gray-100 overflow-hidden rounded-sm">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('/img2.jpg')` }}
                  />
                </div>
                <div className="mt-4 font-display text-center text-text-light italic text-lg">
                  Momentos inolvidables
                </div>
              </div>
            </div>
          </ScrollReveal>
        </SmoothSection>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="material-symbols-outlined text-primary text-xs">favorite</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary to-transparent" />
        </div>
      </div>

      {/* ===== CAPITULO 3: Nuestras aventuras ===== */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        {/* Aurora background */}
        <div className="aurora-glow w-[450px] h-[450px] bg-primary-soft/40 top-[5%] left-[-8%]" style={{ animationDelay: "3s" }} />
        <BokehLights count={6} seed={3} />

        <SmoothSection speed={0.45} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal className="order-2 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-soft/40 to-peach/50 rounded-2xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" />
              {/* Collage de 4 fotos */}
              <div className="relative grid grid-cols-2 gap-3 p-4 glass-strong rounded-2xl shadow-2xl">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('/img8.jpg')" }} />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('/img7.jpg')" }} />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('/img6.jpg')" }} />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('/img3.jpg')" }} />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-full px-5 py-1.5 text-center">
                <span className="text-xs font-medium tracking-widest text-text-main/60 uppercase">Recuerdos</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 md:order-2 flex flex-col justify-center" delay={200}>
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <span className="text-gradient font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
                Capitulo 3
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-text-main font-bold leading-tight mb-6">
                Nuestras aventuras
              </h2>
              <p className="text-base md:text-lg text-text-main/75 leading-relaxed font-light mb-6">
                Cada momento a tu lado se convierte en una aventura. Desde los viajes que
                planeamos juntos hasta las cenas improvisadas un martes cualquiera. No necesitamos
                destinos lejanos para crear recuerdos, porque contigo hasta ir al supermercado
                se siente como una pelicula.
              </p>
              <div className="flex items-center gap-2 text-primary/50">
                <span className="material-symbols-outlined text-sm">explore</span>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">Juntos siempre</span>
              </div>
            </div>
          </ScrollReveal>
        </SmoothSection>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="material-symbols-outlined text-primary text-xs">favorite</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary to-transparent" />
        </div>
      </div>

      {/* ===== CAPITULO 4: Lo que mas amo de ti ===== */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        {/* Aurora */}
        <div className="aurora-glow w-[400px] h-[400px] bg-lavender-deep/30 top-[15%] right-[-5%]" style={{ animationDelay: "5s" }} />
        <BokehLights count={7} seed={4} />

        <SmoothSection speed={0.35} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal className="flex flex-col justify-center text-left md:text-right order-1">
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              <span className="text-gradient font-bold text-sm tracking-[0.2em] uppercase mb-4 block">
                Capitulo 4
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-text-main font-bold leading-tight mb-6">
                Lo que mas amo de ti
              </h2>
              <p className="text-base md:text-lg text-text-main/75 leading-relaxed font-light mb-6">
                Amo como me miras cuando crees que no me
                doy cuenta, y como siempre sabes que decir cuando el mundo se pone dificil.
                Amo tu fuerza, tu ternura, y esa forma unica que tienes de hacer que todo
                a tu alrededor brille un poco mas.
              </p>
              <div className="flex items-center md:justify-end gap-2 text-primary/50">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">Cada detalle</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-2 flex justify-center" delay={200}>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-lavender/50 to-primary-soft/40 rounded-3xl blur-2xl opacity-50" />
              {/* Lista de cosas que amo - estilo tarjetas */}
              <div className="relative glass-strong rounded-3xl p-8 space-y-4 shadow-2xl">
                {[
                  { icon: "visibility", text: "Tu mirada" },
                  { icon: "sentiment_very_satisfied", text: "Tu sonrisa" },
                  { icon: "record_voice_over", text: "Tu voz" },
                  { icon: "psychology", text: "Tu forma de pensar" },
                  { icon: "volunteer_activism", text: "Tu corazon" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/40 hover:bg-white/70 transition-all duration-500 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-soft to-lavender flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span>
                    </div>
                    <span className="font-display text-xl text-text-main font-medium group-hover:text-primary transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </SmoothSection>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <span className="material-symbols-outlined text-primary text-xs">favorite</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary to-transparent" />
        </div>
      </div>

      {/* ===== CAPITULO 5: Hoy ===== */}
      <section className="relative py-32 md:py-40 px-6 overflow-hidden">
        {/* Dramatic radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-lavender/40 via-soft-pink/20 to-background-light" />
        <BokehLights count={10} seed={2} />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <span className="text-gradient font-bold text-sm tracking-[0.2em] uppercase mb-6 block">
              Capitulo 5
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-text-main font-bold mb-10">
              Hoy
            </h2>
            <div className="glass-strong rounded-3xl p-10 md:p-14">
              <p className="font-display italic text-2xl md:text-3xl leading-relaxed text-text-main/85">
                &ldquo;No necesito dias especiales para saber que te quiero, pero hoy es la excusa
                perfecta para recordartelo. Quiero seguir sumando capitulos, viajes, cenas improvisadas
                y mananas de domingo a tu lado.&rdquo;
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <span className="material-symbols-outlined text-primary/30 text-4xl animate-heartbeat">
                favorite
              </span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FINAL: La Propuesta ===== */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-mesh">
        {/* Aurora glows */}
        <div className="aurora-glow w-[400px] h-[400px] bg-primary-soft/30 top-[10%] left-[10%]" />
        <div className="aurora-glow w-[350px] h-[350px] bg-lavender-deep/25 bottom-[15%] right-[10%]" style={{ animationDelay: "3s" }} />

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "15%", left: "10%", size: "text-xl", delay: "0s", dur: "7s" },
            { top: "25%", left: "85%", size: "text-2xl", delay: "1.5s", dur: "8s" },
            { top: "55%", left: "8%", size: "text-lg", delay: "3s", dur: "6s" },
            { top: "70%", left: "80%", size: "text-sm", delay: "2s", dur: "9s" },
            { top: "40%", left: "92%", size: "text-xs", delay: "4s", dur: "7s" },
            { top: "80%", left: "25%", size: "text-lg", delay: "5s", dur: "8s" },
            { top: "10%", left: "60%", size: "text-sm", delay: "1s", dur: "6.5s" },
          ].map((h, i) => (
            <span
              key={i}
              className={`particle material-symbols-outlined ${h.size} text-primary/15`}
              style={{
                top: h.top,
                left: h.left,
                animationDelay: h.delay,
                animationDuration: h.dur,
              }}
            >
              favorite
            </span>
          ))}
        </div>

        <ScrollReveal className="max-w-3xl mx-auto text-center relative z-10">
          <div className="glass-strong rounded-[2rem] p-10 md:p-16 border-gradient shadow-2xl">
            <h2 className="font-display text-4xl md:text-6xl text-text-main font-bold leading-tight mb-8">
              Este 14 de febrero quiero seguir escribiendo nuestra historia...
            </h2>
            <p className="text-xl md:text-2xl text-gradient font-semibold mb-12">
              Quieres ser mi San Valentin?
            </p>
            <button
              onClick={() => setShowCelebration(true)}
              className="group relative inline-flex items-center justify-center px-14 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primary-deep rounded-full hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:-translate-y-1 animate-heartbeat cursor-pointer"
            >
              <span className="mr-3 tracking-wide">Si, acepto</span>
              <span className="material-symbols-outlined group-hover:animate-bounce">favorite</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-soft-pink/30 to-background-light" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="flex justify-center mb-4 opacity-30">
            <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
          </div>
          <p className="font-display text-xl md:text-2xl text-text-main/60 mb-3 italic">
            Gracias por ser mi lugar favorito.
          </p>
          <p className="text-sm font-semibold text-gradient tracking-[0.2em] uppercase">
            Con amor, Renzo
          </p>
        </div>
      </footer>
    </>
  );
}
