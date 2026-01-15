import { BuilderOrchestrator } from "@/components/builder/BuilderOrchestrator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ProductShowcase } from "@/components/ui/ProductShowcase";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-24 relative overflow-x-hidden">
      
      {/* Header avec Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="flex flex-col items-center justify-center min-h-[90vh] w-full max-w-5xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center space-y-4 z-10 pt-20 md:pt-0">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-mono tracking-widest uppercase mb-4">
            v1.0.0 Bêta Publique
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-white/60">
            Aether Prompt Studio
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto text-lg">
            L'outil d'architecture professionnel pour sites web 3D haut de gamme.
            Transformez des idées vagues en spécifications prêtes pour la production.
          </p>
        </div>

        <BuilderOrchestrator />
        
        {/* Scroll Indicator */}
        <div className="animate-bounce pt-12 opacity-50">
          <ChevronDown className="w-6 h-6 text-neutral-400" />
        </div>
      </div>

      <ProductShowcase />

      <footer className="mt-24 pb-12 text-neutral-500 dark:text-neutral-600 text-sm">
        &copy; {new Date().getFullYear()} Aether Systems. Propulsé par OpenAI & Next.js 14.
      </footer>
    </main>
  );
}
