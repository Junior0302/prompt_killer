'use client';

import { motion } from 'framer-motion';
import { Sparkles, Layers, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-8 h-8 text-blue-500" />,
    title: "Architecture Modulaire",
    description: "Une approche systémique qui décompose chaque projet en briques fondamentales : Identité, Direction Artistique, Tech et Spécifications 3D. Fini les briefs chaotiques."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    title: "Intelligence Créative",
    description: "Notre moteur IA ne se contente pas de remplir des cases. Il agit comme un Directeur Artistique Senior, enrichissant vos idées vagues avec un vocabulaire design précis et professionnel."
  },
  {
    icon: <Zap className="w-8 h-8 text-amber-500" />,
    title: "Génération Précise",
    description: "Des prompts structurés pour l'IA, les Designers et les Développeurs. Obtenez des spécifications techniques et créatives prêtes pour la production instantanément."
  },
  {
    icon: <Target className="w-8 h-8 text-emerald-500" />,
    title: "Positionnement Premium",
    description: "Conçu spécifiquement pour les agences digitales et les créateurs indépendants exigeants qui visent l'excellence dans le web 3D et les expériences immersives."
  }
];

export function ProductShowcase() {
  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-4 space-y-32">
      
      {/* Introduction text centered */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6"
      >
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-purple-800 to-neutral-900 dark:from-white dark:via-purple-200 dark:to-white">
          La Logique derrière Aether
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Aether Prompt Studio n'est pas un simple générateur de texte. C'est un{' '}
          <span className="font-semibold text-neutral-900 dark:text-white">orchestrateur de vision</span> qui traduit l'abstrait en concret.
        </p>
      </motion.div>

      {/* Feature Grid with staggered reveal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col gap-4 group"
          >
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm group-hover:shadow-md transition-all w-fit">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Final Statement */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-8 md:p-16 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 mix-blend-overlay" />
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl md:text-4xl font-bold">
            Conçu pour l'Élite du Web Design
          </h3>
          <p className="text-neutral-300 dark:text-neutral-600 max-w-xl mx-auto">
            Ne laissez plus jamais un brief mal défini ralentir votre créativité. 
            Standardisez l'excellence avec Aether.
          </p>
        </div>
      </motion.div>

    </section>
  );
}
