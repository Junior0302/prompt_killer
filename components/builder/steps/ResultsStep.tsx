'use client';
import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

export const ResultsStep = () => {
  const { generatedOutput } = useProjectStore();
  const [activeTab, setActiveTab] = useState<'ai' | 'designer' | 'developer' | 'combined'>('combined');
  const [copied, setCopied] = useState(false);

  if (!generatedOutput) return null;

  const getContent = () => {
    if (activeTab === 'ai') return generatedOutput.aiPrompt;
    if (activeTab === 'designer') return generatedOutput.designerPrompt;
    if (activeTab === 'developer') return generatedOutput.developerPrompt;
    return generatedOutput.combinedPrompt || '';
  };

  let content = getContent();

  // Handle case where content is returned as an object (JSON) by the AI
  if (typeof content === 'object') {
    content = Object.entries(content)
      .map(([key, value]) => `**${key}**:\n${value}`)
      .join('\n\n');
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
          Prêt à Déployer
        </h2>
        <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1 border border-neutral-200 dark:border-neutral-800">
          {[
              { id: 'ai', label: 'IA' },
              { id: 'designer', label: 'Designer' },
              { id: 'developer', label: 'Développeur' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                "px-4 py-1.5 text-sm rounded-md capitalize transition-all",
                activeTab === tab.id
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              )}
            >
              Prompt {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl" />
        <div className="relative bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 min-h-[400px] font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[60vh] shadow-2xl text-neutral-800 dark:text-neutral-200">
           {content}
        </div>
        
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />}
        </button>
      </div>
    </motion.div>
  );
};
