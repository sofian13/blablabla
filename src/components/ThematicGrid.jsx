import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingCart, Target, Cpu, Zap, X } from "lucide-react";

const themes = [
  {
    id: "ecommerce",
    title: "Ecommerce",
    icon: <ShoppingCart className="text-pink-500" />,
    img: "https://focus-business.com/wp-content/uploads/2025/08/Capture-decran-2025-08-21-a-12.00.01-2.png",
    details:
      "Maîtrisez le sourcing, la logistique et la conversion pour bâtir une boutique rentable dès le premier mois.",
  },
  {
    id: "branding",
    title: "E-Branding",
    icon: <Target className="text-blue-500" />,
    img: "https://focus-business.com/wp-content/uploads/2025/07/100-1.jpg",
    details:
      "Créez une identité visuelle forte et un storytelling qui transforme vos visiteurs en ambassadeurs.",
  },
  {
    id: "ia",
    title: "IA",
    icon: <Cpu className="text-purple-500" />,
    img: "https://focus-business.com/wp-content/uploads/2025/08/carta.png",
    details:
      "Automatisez 80% de vos tâches répétitives grâce aux meilleurs outils d'Intelligence Artificielle.",
  },
  {
    id: "automatisation",
    title: "Automatisation",
    icon: <Zap className="text-amber-500" />,
    img: "https://focus-business.com/wp-content/uploads/2025/06/group-image-4.webp",
    details:
      "Connectez vos outils entre eux pour faire tourner votre business pendant que vous dormez.",
  },
];

export default function ThematicGrid() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <section className="bg-white py-20 md:py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HEADER (DA blanche Focus : propre, premium, tailles similaires) */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Votre business avant tout !
          </div>

          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-950">
            <span className="bg-gradient-to-r from-fuchsia-500 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              Découvrez
            </span>{" "}
            notre
            <br />
            plateforme
          </h2>

          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            E-commerce, Branding & IA : tout ce dont vous avez besoin pour scaler.
          </p>
        </div>

        {/* GRILLE (blanche, bords/ombres clean, hover premium) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ y: -6 }}
              className="group relative bg-white border border-gray-200 rounded-[28px] overflow-hidden p-7 md:p-8 transition-all shadow-[0_18px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.10)]"
            >
              <div className="flex justify-between items-start gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 group-hover:scale-105 transition-transform">
                    {theme.icon}
                  </div>
                  <span className="text-lg md:text-xl font-semibold tracking-tight text-gray-950">
                    {theme.title}
                  </span>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => setSelectedTheme(theme)}
                  className="h-11 w-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center transition-all group-hover:shadow-md group-hover:-translate-y-[1px] active:translate-y-0"
                  aria-label={`Voir ${theme.title}`}
                >
                  <ArrowUpRight className="h-5 w-5 text-gray-950 transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                </button>
              </div>

              {/* Image + overlay subtil (DA claire) */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white/70 backdrop-blur">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
                  <span className="ml-3 text-xs text-gray-500 truncate">
                    {theme.title}
                  </span>
                </div>

                <div className="aspect-video">
                  <img
                    src={theme.img}
                    alt={theme.title}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODALE (blanche, même DA, typo/tailles clean) */}
      <AnimatePresence>
        {selectedTheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTheme(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 14 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[28px] p-7 md:p-10 shadow-[0_30px_120px_rgba(0,0,0,0.22)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setSelectedTheme(null)}
                className="absolute top-5 right-5 h-10 w-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-950 hover:shadow-md transition"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                    {selectedTheme.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-950">
                    {selectedTheme.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {selectedTheme.details}
                </p>

                <div className="pt-2">
                  <a
                    href="https://espace.focus-business.com/checkout"
                    className="group inline-flex items-center gap-2 rounded-full bg-gray-950 text-white px-6 py-3 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all"
                  >
                    Accéder au module
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
                  </a>
                </div>
              </div>

              {/* glow pastel discret */}
              <div className="pointer-events-none absolute -inset-24 rounded-full blur-3xl opacity-40 bg-gradient-to-br from-sky-200/70 via-white to-emerald-200/55" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
