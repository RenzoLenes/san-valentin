"use client";

import { useRef, useState, useEffect } from "react";

// ============================================================
// CONFIGURACIÓN - Cambia las imágenes y la música aquí
// ============================================================
const CONFIG = {
  // Música de fondo (reemplaza con la URL de tu archivo mp3)
  musicUrl: "/musica.mp3",

  // Imágenes de los capítulos (reemplaza las URLs)
  chapter1Image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuOkNdloWMvaGaG51ymytVFoIDpB_kPbTzFYUBo8aD3HRzSxt_tdTMNGazpkscLTmrJrtPXo2omcu73-6g0BkuCo_ivp9zimbInC5e3tk0mcJV5N0EVMBINIO88dcXfxRy6WW5kqZE6EX9qyIVO8HY-djHKAedxgdu-9L6zBJeF-Ah3Rfn62r3o_WIJMgUNmOWHFLhfpkLwL7V26sOjtw4oDyDPe3Ja1hzbzX2sn25JRVzsYF3VYssvjLCOmAEvrOrS8k1aMfBpA",
  chapter2Image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBrh2E5v2NHuWXpGuTrpmfCsxkPstLEqOZho6YtX-GG4iFH1BZyVav11jjPmkXtS33yRa7yJFCxzISo6m82cBVRzt-3hMoPV5aSSs07VJ-fxhnVfNm2SlQZIyqbHdqWMgajungmgdqkCtIACFQX3_1zXMg9Vu32jKYl2Ezpp4ccSujMPO3jEvkGR0JYAnrBWxj_stcvc-t5h76Bd9YnAoFB7ce0xP88u_vAPxFKOi_sG9VpD98XxNwZN6oc4IAIldCOJAce2joAuw",
};

function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

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
          className="pointer-events-auto flex items-center justify-center bg-white/50 backdrop-blur-md border border-white/20 hover:bg-white/80 transition-colors shadow-sm rounded-full w-10 h-10 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
            {playing ? "music_off" : "music_note"}
          </span>
        </button>
      </nav>
    </>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      height="80"
      width="80"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <MusicButton />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-soft-pink rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-peach rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl animate-fade-in-up">
          <div className="mb-8 opacity-80">
            <HeartIcon className="text-primary" />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight leading-tight">
            Nuestra historia
          </h1>

          <div className="h-px w-24 bg-primary/30 mb-6" />

          <h2 className="text-lg md:text-xl font-light uppercase tracking-[0.2em] text-text-main/70">
            Un capítulo que quiero seguir escribiendo contigo
          </h2>

          <div className="mt-16 animate-bounce opacity-50">
            <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
          </div>
        </div>
      </section>

      {/* ===== CAPÍTULO 1: Cuando te conocí ===== */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="order-2 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 bg-lavender rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition duration-500" />
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl bg-white">
                {/* REEMPLAZA: Cambia chapter1Image en CONFIG */}
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url('${CONFIG.chapter1Image}')` }}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 md:order-2 flex flex-col justify-center text-left">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">
              Capítulo 1
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1b0d11] font-bold leading-tight mb-6">
              Cuando te conocí
            </h2>
            <p className="text-lg text-text-main/80 leading-relaxed font-light mb-6">
              Recuerdo el día exacto en que te vi por primera vez. El mundo parecía moverse a una
              velocidad normal, pero cuando cruzamos miradas, todo se detuvo. No sabía que en ese
              momento mi vida estaba a punto de cambiar para siempre, ganando un color que nunca antes
              había visto.
            </p>
            <div className="flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined text-sm">favorite</span>
              <span className="text-xs font-medium tracking-wider">EL COMIENZO</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-10 opacity-30">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>

      {/* ===== CAPÍTULO 2: Lo que me haces sentir ===== */}
      <section className="relative py-24 md:py-32 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="flex flex-col justify-center text-left md:text-right order-1">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3">
              Capítulo 2
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1b0d11] font-bold leading-tight mb-6">
              Lo que me haces sentir
            </h2>
            <p className="text-lg text-text-main/80 leading-relaxed font-light mb-6">
              Contigo, los lunes no pesan y los silencios no son incómodos. Me has enseñado que el
              amor no es solo mariposas, sino una paz inmensa. Tu risa es mi sonido favorito y tu
              calma es el refugio donde siempre quiero estar. Eres mi hogar.
            </p>
            <div className="flex items-center md:justify-end gap-2 text-primary/60">
              <span className="text-xs font-medium tracking-wider">PAZ Y RISAS</span>
              <span className="material-symbols-outlined text-sm">sentiment_satisfied</span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-2 flex justify-center">
            <div className="relative w-full max-w-sm rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="absolute -inset-3 bg-peach rounded-lg blur-md opacity-70" />
              <div className="relative bg-white p-4 pb-12 shadow-2xl rounded-sm">
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-sm">
                  {/* REEMPLAZA: Cambia chapter2Image en CONFIG */}
                  <div
                    className="w-full h-full bg-cover bg-center sepia-[.3]"
                    style={{ backgroundImage: `url('${CONFIG.chapter2Image}')` }}
                  />
                </div>
                <div className="mt-4 font-serif text-center text-gray-500 italic text-sm">
                  Momentos inolvidables
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CAPÍTULO 3: Hoy ===== */}
      <ScrollReveal>
        <section className="relative py-32 px-6 bg-peach/30">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
              Capítulo 3
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1b0d11] font-bold mb-8">Hoy</h2>
            <p className="font-light italic text-xl md:text-2xl leading-relaxed text-text-main/90">
              &ldquo;No necesito días especiales para saber que te quiero, pero hoy es la excusa
              perfecta para recordártelo. Quiero seguir sumando capítulos, viajes, cenas improvisadas
              y mañanas de domingo a tu lado.&rdquo;
            </p>
            <div className="mt-12 flex justify-center">
              <span className="material-symbols-outlined text-primary/40 text-4xl animate-pulse">
                favorite
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== FINAL: La Propuesta ===== */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <span
            className="material-symbols-outlined absolute top-[20%] left-[15%] text-primary text-2xl animate-float"
            style={{ animationDelay: "0s" }}
          >
            favorite
          </span>
          <span
            className="material-symbols-outlined absolute top-[60%] right-[20%] text-primary text-3xl animate-float"
            style={{ animationDelay: "2s" }}
          >
            favorite
          </span>
          <span
            className="material-symbols-outlined absolute bottom-[15%] left-[30%] text-primary text-xl animate-float"
            style={{ animationDelay: "4s" }}
          >
            favorite
          </span>
        </div>

        <ScrollReveal className="max-w-3xl mx-auto text-center relative z-10 bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/40 shadow-xl">
          <h2 className="font-serif text-3xl md:text-5xl text-[#1b0d11] font-bold leading-tight mb-8">
            Este 14 de febrero quiero seguir escribiendo nuestra historia...
          </h2>
          <p className="text-xl text-primary font-medium mb-12">
            ¿Quieres ser mi San Valentín? ❤️
          </p>
          <button className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-[0_0_20px_rgba(238,43,91,0.5)] hover:shadow-[0_0_30px_rgba(238,43,91,0.7)] hover:-translate-y-1 animate-heartbeat cursor-pointer">
            <span className="mr-3">Sí, acepto</span>
            <span className="material-symbols-outlined group-hover:animate-bounce">favorite</span>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40" />
          </button>
        </ScrollReveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 bg-white border-t border-primary/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="font-serif text-lg text-text-main/70 mb-2">
            Gracias por ser mi lugar favorito.
          </p>
          <p className="text-sm font-medium text-primary tracking-widest uppercase">
            Con amor, Renzo
          </p>
        </div>
      </footer>
    </>
  );
}
