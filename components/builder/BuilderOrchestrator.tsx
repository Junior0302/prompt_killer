'use client';
import { useProjectStore } from '@/store/useProjectStore';
import { IdentityStep } from './steps/IdentityStep';
import { ArtDirectionStep } from './steps/ArtDirectionStep';
import { TechStep } from './steps/TechStep';
import { ResultsStep } from './steps/ResultsStep';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, ArrowLeft, Wand2 } from 'lucide-react';
import { useState } from 'react';

export const BuilderOrchestrator = () => {
  const { step, setStep, manifest, isGenerating, setGenerating, setGeneratedOutput } = useProjectStore();
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manifest }),
      });
      
      if (!response.ok) throw new Error('Generation failed');
      
      const data = await response.json();
      setGeneratedOutput(data);
      setStep(4);
    } catch (err) {
      setError('Échec de la génération des prompts. Veuillez réessayer.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const steps = [
    { num: 1, label: 'Identité' },
    { num: 2, label: 'Direction Art.' },
    { num: 3, label: 'Tech' },
    { num: 4, label: 'Résultats' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Progress */}
      <div className="mb-12 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-10" />
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-neutral-50 dark:bg-neutral-950 px-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step >= s.num 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500'
              }`}
            >
              {s.num}
            </div>
            <span className={`text-xs font-medium ${step >= s.num ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-600'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 1 && <IdentityStep key="step1" />}
          {step === 2 && <ArtDirectionStep key="step2" />}
          {step === 3 && <TechStep key="step3" />}
          {step === 4 && <ResultsStep key="step4" />}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between items-center pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1 || isGenerating}
          className="px-6 py-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium flex items-center gap-2"
          >
            Suivant <ArrowRight className="w-4 h-4" />
          </button>
        ) : step === 3 ? (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 font-bold flex items-center gap-2 shadow-lg shadow-purple-900/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Architecture en cours...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Générer le Manifeste
              </>
            )}
          </button>
        ) : (
          <button
            onClick={() => setStep(1)} // Reset logic could go here
            className="px-6 py-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            Nouveau Projet
          </button>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg text-center text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
