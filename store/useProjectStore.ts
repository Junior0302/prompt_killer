import { create } from 'zustand';
import { ProjectManifest, initialManifest, ProjectIdentity, ArtDirection, ThreeDSpecs, TechStack } from '@/types';

interface ProjectState {
  manifest: ProjectManifest;
  step: number;
  isGenerating: boolean;
  generatedOutput: {
    aiPrompt: string;
    designerPrompt: string;
    developerPrompt: string;
    combinedPrompt: string;
  } | null;

  // Actions
  setIdentity: (identity: Partial<ProjectIdentity>) => void;
  setArtDirection: (artDirection: Partial<ArtDirection>) => void;
  setThreeD: (threeD: Partial<ThreeDSpecs>) => void;
  setTech: (tech: Partial<TechStack>) => void;
  setStep: (step: number) => void;
  setGenerating: (isGenerating: boolean) => void;
  setGeneratedOutput: (output: ProjectState['generatedOutput']) => void;
  reset: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  manifest: initialManifest,
  step: 1,
  isGenerating: false,
  generatedOutput: null,

  setIdentity: (identity) =>
    set((state) => ({
      manifest: { ...state.manifest, identity: { ...state.manifest.identity, ...identity } },
    })),

  setArtDirection: (artDirection) =>
    set((state) => ({
      manifest: { ...state.manifest, artDirection: { ...state.manifest.artDirection, ...artDirection } },
    })),

  setThreeD: (threeD) =>
    set((state) => ({
      manifest: { ...state.manifest, threeD: { ...state.manifest.threeD, ...threeD } },
    })),

  setTech: (tech) =>
    set((state) => ({
      manifest: { ...state.manifest, tech: { ...state.manifest.tech, ...tech } },
    })),

  setStep: (step) => set({ step }),
  setGenerating: (isGenerating) => set({ isGenerating }),
  setGeneratedOutput: (generatedOutput) => set({ generatedOutput }),
  reset: () => set({ manifest: initialManifest, step: 1, generatedOutput: null }),
}));
