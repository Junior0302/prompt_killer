'use client';
import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const INDUSTRIES = [
  { id: 'tech', label: 'Tech / SaaS', icon: '🚀' },
  { id: 'luxury', label: 'Luxe / Mode', icon: '💎' },
  { id: 'creative', label: 'Créatif / Portfolio', icon: '🎨' },
  { id: 'corporate', label: 'Corporate', icon: '🏢' },
  { id: 'gaming', label: 'Gaming / Web3', icon: '🎮' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛍️' },
];

const PROJECT_TYPES = [
  { id: 'landing', label: 'Landing Page', desc: 'Conversion' },
  { id: 'showcase', label: 'Site Vitrine', desc: 'Présentation' },
  { id: 'experience', label: 'Expérience 3D', desc: 'Immersif' },
  { id: 'app', label: 'Web App', desc: 'Fonctionnel' },
];

export const IdentityStep = () => {
  const { manifest, setIdentity } = useProjectStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Identité du Projet</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Commençons par les bases. Que construisons-nous ?</p>
      </div>

      <div className="space-y-6">
        {/* Nom du Projet */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Nom du Projet</label>
          <input
            type="text"
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            placeholder="ex: Nexus Portfolio 2024"
            value={manifest.identity.name}
            onChange={(e) => setIdentity({ name: e.target.value })}
          />
        </div>

        {/* Secteur / Niche (Grid de boutons) */}
        <div>
          <label className="block text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">Secteur / Niche</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setIdentity({ industry: ind.label })}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all flex items-center gap-2",
                  manifest.identity.industry === ind.label
                    ? "bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-purple-300 dark:hover:border-purple-700"
                )}
              >
                <span className="text-xl">{ind.icon}</span>
                <span className="text-sm font-medium">{ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type de Projet (Grid de boutons) */}
        <div>
          <label className="block text-sm font-medium mb-3 text-neutral-700 dark:text-neutral-300">Type de Projet</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setIdentity({ projectType: type.label })}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all",
                  manifest.identity.projectType === type.label
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-blue-300 dark:hover:border-blue-700"
                )}
              >
                <div className="text-sm font-bold mb-1">{type.label}</div>
                <div className="text-xs opacity-70">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes (Optionnel) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">
            Détails supplémentaires <span className="text-neutral-400 font-normal">(Optionnel)</span>
          </label>
          <textarea
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 h-24 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm"
            placeholder="Objectifs spécifiques, public cible..."
            value={manifest.identity.description}
            onChange={(e) => setIdentity({ description: e.target.value })}
          />
        </div>
      </div>
    </motion.div>
  );
};
