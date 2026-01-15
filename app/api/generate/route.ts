import { OpenAI } from 'openai';
import { ProjectManifest } from '@/types';
import { NextResponse } from 'next/server';

// FIX: Disable SSL verification for local development to avoid "UNABLE_TO_GET_ISSUER_CERT_LOCALLY" errors
// This is often required in corporate environments or when local CA certificates are missing.
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const manifest: ProjectManifest = body.manifest;

    if (!manifest) {
      return NextResponse.json({ error: 'Manifest is required' }, { status: 400 });
    }

    // --- PROMPT ENGINE LOGIC ---

    // 1. Conditional Logic / Business Rules
    const warnings = [];
    if (manifest.threeD.isEnabled && manifest.threeD.performanceConstraint === 'mobile_first') {
      warnings.push("CRITICAL: Mobile-first 3D requires extreme optimization (baking, low poly).");
    }
    if (manifest.artDirection.motionLevel === 'aggressive') {
      warnings.push("UX WARNING: Accessibility for motion sensitivity must be handled.");
    }

    // 2. System Prompt Construction
    const systemPrompt = `
      You are an Elite Creative Technologist and Product Architect at a world-class digital agency (Awwwards/FWA level).
      Your goal is to transform a structured project manifest (which might contain French or English terms) into three distinct, high-precision ENGLISH prompts.

      INPUT DATA:
      ${JSON.stringify(manifest, null, 2)}

      DETECTED CONSTRAINTS & WARNINGS:
      ${warnings.join('\n')}

      YOUR TASKS:
      1. Analyze the 'Art Direction', 'Identity' (especially 'projectType' and 'industry') to infer the mood, lighting, and texture details.
      2. If descriptions are vague (e.g., "sympa", "nice vibe"), upgrade them to professional design terminology (e.g., "Swiss International Style with glassmorphism accents").
      3. Generate three outputs in JSON format.
      4. IMPORTANT: ALL OUTPUT PROMPTS MUST BE IN ENGLISH for maximum compatibility with AI tools, even if the input was in French.

      OUTPUT FORMAT (JSON ONLY):
      {
        "aiPrompt": "Detailed prompt for an AI image generator or coding assistant (v0/Midjourney). Describe the hero section, layout, colors, lighting, and textures in extreme detail.",
        "designerPrompt": "A brief for a human UI/UX designer. Focus on emotions, typography, spacing, and user journey.",
        "developerPrompt": "Technical specifications. Component architecture, libraries (Three.js/R3F), state management patterns, and performance optimizations.",
        "combinedPrompt": "A mega-prompt acting as a complete execution plan for an autonomous agent. \nStructure:\n1. **Core Concept**: The high-level vision.\n2. **Design Phase**: Start with 'You are an expert UI/UX Designer'. Then list tasks (Moodboard, Wireframes, High-fidelity UI).\n3. **Development Phase**: Start with 'You are an expert Creative Developer'. Then list tasks (Setup, Logic/Backend, Frontend/3D components).\nMake it strictly sequential and actionable."
        }
      `;

    // 3. AI Call
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Or gpt-4o
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the professional specification prompts now." }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7, // Balance between creativity and structure
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
        throw new Error("No content generated");
    }

    const parsedContent = JSON.parse(content);

    return NextResponse.json(parsedContent);

  } catch (error: any) {
    console.error('Generation error:', error);
    // Fallback mock response for demo purposes if API key fails
    return NextResponse.json({
        aiPrompt: `Simulation: Unable to connect to OpenAI. Error: ${error.message || 'Unknown error'}. Please check your API key.\n\n[Mock] Create a high-end 3D website for...`,
        designerPrompt: "[Mock] Focus on clean lines and typography...",
        developerPrompt: "[Mock] Stack: Next.js, R3F...",
        combinedPrompt: "[Mock] Execution Plan:\n1. Concept\n2. Design Tasks\n3. Dev Tasks..."
    });
  }
}
