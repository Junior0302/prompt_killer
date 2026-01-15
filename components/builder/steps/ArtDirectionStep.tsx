'use client';
import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ArtDirection } from '@/types';

const VIBES: { value: ArtDirection['vibe'][number]; label: string }[] = [
  { value: 'minimalist', label: 'Minimaliste (Épuré, "Less is more")' },
  { value: 'brutalist', label: 'Brutaliste (Raw, typo géante, contrastes)' },
  { value: 'futuristic', label: 'Futuriste (Tech, néon, verre, sombre)' },
  { value: 'organic', label: 'Organique (Naturel, formes douces)' },
  { value: 'corporate', label: 'Corporate (Pro, fiable, structuré)' },
  { value: 'luxury', label: 'Luxe (Élégant, serif, premium)' },
];

const PALETTES: { value: ArtDirection['colorPalette']; label: string; colors: string }[] = [
  { value: 'monochrome', label: 'Monochrome (Sophistiqué)', colors: 'bg-neutral-200' },
  { value: 'vibrant', label: 'Vibrant (Énergique, saturé)', colors: 'bg-orange-500' },
  { value: 'pastel', label: 'Pastel (Doux, apaisant)', colors: 'bg-pink-300' },
  { value: 'dark_mode_neon', label: 'Néon Sombre (Cyberpunk)', colors: 'bg-purple-600' },
  { value: 'earth_tones', label: 'Terre (Naturel, rassurant)', colors: 'bg-amber-800' },
];

const MOTION_LEVELS: { value: ArtDirection['motionLevel']; label: string }[] = [
    { value: 'static', label: 'Statique (Aucune animation)' },
    { value: 'subtle', label: 'Subtil (Micro-interactions)' },
    { value: 'immersive', label: 'Immersif (Scroll-telling, 3D)' },
    { value: 'aggressive', label: 'Aggressif (Expérimental)' },
];

export const ArtDirectionStep = () => {
  const { manifest, setArtDirection } = useProjectStore();

  const toggleVibe = (vibe: ArtDirection['vibe'][number]) => {
    const current = manifest.artDirection.vibe;
    if (current.includes(vibe)) {
      setArtDirection({ vibe: current.filter((v) => v !== vibe) });
    } else {
      setArtDirection({ vibe: [...current, vibe] });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Direction Artistique</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Définissez le langage visuel et l'impact émotionnel.</p>
      </div>

      {/* Vibe Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Ambiance (Choix multiples)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {VIBES.map((item) => (
            <button
              key={item.value}
              onClick={() => toggleVibe(item.value)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                manifest.artDirection.vibe.includes(item.value)
                  ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-300"
                  : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-400"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Palette de Couleurs</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {PALETTES.map((item) => (
            <button
              key={item.value}
              onClick={() => setArtDirection({ colorPalette: item.value })}
              className={clsx(
                "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                manifest.artDirection.colorPalette === item.value
                  ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
                  : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400"
              )}
            >
              <div className={clsx("w-6 h-6 rounded-full border border-black/10 dark:border-white/10", item.colors)} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

       {/* Motion Level */}
       <div className="space-y-3">
        <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Niveau d'Animation & Interactivité</h3>
        <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          {MOTION_LEVELS.map((level) => (
             <button
             key={level.value}
             onClick={() => setArtDirection({ motionLevel: level.value })}
             className={clsx(
               "flex-1 py-2 text-sm rounded-md capitalize transition-all",
               manifest.artDirection.motionLevel === level.value
                 ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                 : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
             )}
           >
             {level.label}
           </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
