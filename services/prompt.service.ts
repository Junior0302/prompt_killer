import { ProjectManifest } from '@/types';

export interface GeneratePromptResponse {
  aiPrompt: string;
  designerPrompt: string;
  developerPrompt: string;
  combinedPrompt: string;
}

export async function generatePrompts(manifest: ProjectManifest): Promise<GeneratePromptResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manifest }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Generation failed');
  }

  return response.json();
}
