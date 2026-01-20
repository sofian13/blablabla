import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACCENT = "#2F80FF";

const steps = [
  {
    id: "01",
    title: "Accès avec plateformes interactifs",
    description: "Astuces e-commerce, stratégies digitales, études de cas.",
    img: "https://focus-business.com/wp-content/uploads/2025/08/Capture-decran-2025-08-21-a-12.00.01-2.png",
  },
  {
    id: "02",
    title: "Ressources exclusives",
    description: "Templates, checklists, documents prêts à l’emploi.",
    img: "https://focus-business.com/wp-content/uploads/2025/08/carta.png",
  },
  {
    id: "03",
    title: "Communauté privée",
    description: "Un espace pour avancer plus vite, ensemble.",
    img: "https://focus-business.com/wp-content/uploads/2025/06/group-image-4.webp",
  },
];

function preloadImages(urls) {
  return Promise.allSettled(
    urls.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
          img.src = src;
        })
    )
  );
}

export default function InteractiveFeatures() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // états robustes
  const [loaded, setLoaded] = useState(() => steps.map(() => false));
  const [failed, setFailed] = useState(() => steps.map(() => false));
  const [ready, setReady] = useState(false); // évite écran vide au premier rendu

  const dotBg = useMemo(
    () => ({
      backgroundImage:
        "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
      backgroundSize: "14px 14px",
    }),
    []
  );

  // Preload au montage pour éviter "plus rien"
  useEffect(() => {
    let cancelled = false;
    preloadImages(steps.map((s) => s.img)).then((results) => {
      if (cancelled) return;

      const nextLoaded = [...loaded];
      const nextFailed = [...failed];

      results.forEach((r, idx) => {
        if (r.status === "fulfilled") nextLoaded[idx] = true;
        else nextFailed[idx] = true;
      });

      setLoaded(nextLoaded);
      setFailed(nextFailed);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rotation auto (toujours dynamique)
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((p) => (p + 1) % steps.length);
    }, 4500);
    return () => clearInterval(t);
  }, [paused]);

  const activeStep = steps[active];
  const activeImgOk = loaded[active] && !failed[active];

  // Fallback visuel si image KO (évite panneau vide)
  const fallbackStyle = useMemo(() => {
    const maps = [
      "linear-gradient(135deg, rgba(47,128,255,0.28), rgba(0,0,0,0.25))",
      "linear-gradient(135deg, rgba(47,128,255,0.20), rgba(0,0,0,0.35))",
      "linear-gradient(135deg, rgba(47,128,255,0.24), rgba(0,0,0,0.30))",
    ];
    return { backgroundImage: maps[active] || maps[0] };
  }, [active]);

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* ambient subtil */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute -bottom-44 -right-44 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT */}
          <div
            className="lg:col-span-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
              Focus
            </div>

            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
              Ce que{" "}
              <span className="text-white/45">vous trouverez</span>
              <br />
              dans FOCUS
            </h2>

            <div className="mt-10 relative">
              <div className="absolute left-[20px] top-2 bottom-2 w-px bg-white/10" />

              <div className="space-y-7">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className="w-full text-left"
                    >
                      <div className="flex gap-6 items-start">
                        <div className="relative mt-0.5">
                          <div
                            className={[
                              "h-11 w-11 rounded-full flex items-center justify-center text-sm font-semibold",
                              isActive
                                ? "text-white"
                                : "text-white/45 bg-white/10",
                            ].join(" ")}
                            style={
                              isActive
                                ? {
                                    backgroundColor: ACCENT,
                                    boxShadow:
                                      "0 0 0 6px rgba(47,128,255,0.14)",
                                  }
                                : undefined
                            }
                          >
                            {s.id}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div
                            className={[
                              "text-lg md:text-xl font-medium tracking-tight",
                              isActive ? "text-white" : "text-white/35",
                            ].join(" ")}
                          >
                            {s.title}
                          </div>

                          <div className="mt-2 text-white/55 text-sm md:text-base">
                            {s.description}
                          </div>

                          {isActive && (
                            <div className="mt-5 h-1.5 w-[320px] max-w-full rounded-full bg-white/10 overflow-hidden">
                              <motion.div
                                key={active} // reset
                                initial={{ width: "0%" }}
                                animate={{ width: paused ? "0%" : "100%" }}
                                transition={{ duration: 4.5, ease: "linear" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: ACCENT }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-[38px] overflow-hidden border border-white/10 bg-white/[0.04]">
              <div className="absolute inset-0 opacity-45" style={dotBg} />

              {/* glow côtés */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-blue-500/35 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-blue-500/35 to-transparent" />

              <div className="relative p-6 md:p-10">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_30px_90px_rgba(0,0,0,0.70)]">
                  {/* Si pas prêt, on montre un skeleton animé */}
                  {!ready && (
                    <div className="h-[520px] md:h-[640px] w-full">
                      <div className="h-full w-full animate-pulse bg-white/5" />
                    </div>
                  )}

                  {/* Si prêt : image si OK, sinon fallback gradient */}
                  {ready && (
                    <>
                      {activeImgOk ? (
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={active}
                            src={activeStep.img}
                            alt={activeStep.title}
                            onError={() => {
                              setFailed((prev) => {
                                const n = [...prev];
                                n[active] = true;
                                return n;
                              });
                            }}
                            initial={{ opacity: 0, x: 22, scale: 0.995 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -22, scale: 0.995 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="w-full h-[520px] md:h-[640px] object-cover"
                          />
                        </AnimatePresence>
                      ) : (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`fallback-${active}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="w-full h-[520px] md:h-[640px]"
                            style={fallbackStyle}
                          >
                            <div className="h-full w-full flex items-center justify-center">
                              <div className="text-white/70 text-sm">
                                Aperçu en chargement…
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* halo réactif */}
            <motion.div
              key={active}
              className="pointer-events-none absolute -inset-12 rounded-[48px] blur-[110px] opacity-25"
              initial={{ opacity: 0.14 }}
              animate={{ opacity: 0.25 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ backgroundColor: ACCENT }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
