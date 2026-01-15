export type ProjectIdentity = {
  name: string;
  industry: string;
  projectType: string;
  description: string;
};

export type ArtDirection = {
  vibe: ('minimalist' | 'brutalist' | 'futuristic' | 'organic' | 'corporate' | 'luxury')[];
  colorPalette: 'monochrome' | 'vibrant' | 'pastel' | 'dark_mode_neon' | 'earth_tones' | 'custom';
  typography: 'serif' | 'sans-serif' | 'mono' | 'experimental';
  motionLevel: 'static' | 'subtle' | 'immersive' | 'aggressive';
};

export type ThreeDSpecs = {
  isEnabled: boolean;
  style: 'low-poly' | 'realistic' | 'abstract_shapes' | 'particles' | 'none';
  lighting: 'natural' | 'studio' | 'neon' | 'cinematic';
  performanceConstraint: 'mobile_first' | 'desktop_hero' | 'vr_ready';
};

export type TechStack = {
  framework: string;
  styling: string;
  threeLibrary: string;
};

export type ProjectManifest = {
  identity: ProjectIdentity;
  artDirection: ArtDirection;
  threeD: ThreeDSpecs;
  tech: TechStack;
  generatedAt?: Date;
};

export const initialManifest: ProjectManifest = {
  identity: {
    name: '',
    industry: '',
    projectType: '',
    description: '',
  },
  artDirection: {
    vibe: [],
    colorPalette: 'dark_mode_neon',
    typography: 'sans-serif',
    motionLevel: 'subtle',
  },
  threeD: {
    isEnabled: false,
    style: 'abstract_shapes',
    lighting: 'studio',
    performanceConstraint: 'desktop_hero',
  },
  tech: {
    framework: 'Next.js 14',
    styling: 'Tailwind CSS',
    threeLibrary: 'React Three Fiber',
  },
};
