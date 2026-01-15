'use client';
import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

// Simple Switch Component inline for speed if I don't want to install full shadcn yet
const SimpleSwitch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={clsx(
      "w-11 h-6 rounded-full transition-colors relative",
      checked ? "bg-purple-600" : "bg-neutral-200 dark:bg-neutral-700"
    )}
  >
    <div
      className={clsx(
        "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm",
        checked ? "left-6" : "left-1"
      )}
    />
  </button>
);

const PERFORMANCE_TARGETS = [
    { value: 'mobile_first', label: 'Mobile First' },
    { value: 'desktop_hero', label: 'Héros Desktop' },
    { value: 'vr_ready', label: 'Prêt pour VR' },
];

export const TechStep = () => {
  const { manifest, setThreeD, setTech } = useProjectStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Tech & Spécifications 3D</h2>
        <p className="text-neutral-500 dark:text-neutral-400">Définissez les contraintes techniques et les exigences 3D.</p>
      </div>

      {/* 3D Toggle Section */}
      <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">Activer l'Expérience 3D</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Intégration WebGL / Three.js</p>
          </div>
          <SimpleSwitch
            checked={manifest.threeD.isEnabled}
            onCheckedChange={(c) => setThreeD({ isEnabled: c })}
          />
        </div>

        {manifest.threeD.isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800"
          >
            <div>
              <label htmlFor="style3d" className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Style 3D</label>
              <select
                id="style3d"
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 outline-none text-neutral-900 dark:text-white"
                value={manifest.threeD.style}
                onChange={(e) => setThreeD({ style: e.target.value as 'abstract_shapes' | 'realistic' | 'low-poly' | 'particles' })}
              >
                <option value="abstract_shapes">Formes Abstraites</option>
                <option value="realistic">Réaliste / Produit</option>
                <option value="low-poly">Low Poly (Rétro)</option>
                <option value="particles">Particules / Data Viz</option>
              </select>
            </div>

            <div>
              <h3 className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300">Cible de Performance</h3>
              <div className="grid grid-cols-3 gap-3">
                {PERFORMANCE_TARGETS.map((p) => (
                   <button
                   key={p.value}
                   onClick={() => setThreeD({ performanceConstraint: p.value as any })}
                   className={clsx(
                     "py-2 text-xs rounded-lg border capitalize transition-all",
                     manifest.threeD.performanceConstraint === p.value
                       ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-300"
                       : "bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-500"
                   )}
                 >
                   {p.label}
                 </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stack Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">Stack Technique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Framework</label>
                <input 
                    type="text" 
                    value={manifest.tech.framework}
                    onChange={(e) => setTech({ framework: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-sm text-neutral-900 dark:text-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Style (CSS)</label>
                <input 
                    type="text" 
                    value={manifest.tech.styling}
                    onChange={(e) => setTech({ styling: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 text-sm text-neutral-900 dark:text-white"
                />
            </div>
        </div>
      </div>
    </motion.div>
  );
};
