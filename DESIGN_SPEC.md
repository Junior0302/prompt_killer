# 🏗️ ARCHITECTURE PRODUCT & TECH : AETHER PROMPT STUDIO

Ce document définit les spécifications complètes pour **Aether Prompt Studio**, une application SaaS premium de génération de prompts assistée par IA pour les projets web 3D/High-End.

---

## 1. VISION PRODUIT & UX

### 🎯 Proposition de Valeur
Transformer des intentions abstraites et des choix de direction artistique en spécifications techniques et créatives de haute précision, prêtes à être ingérées par des LLM ou utilisées par des équipes humaines.

### 🎨 Expérience Utilisateur (UX/UI)
*   **Style Visuel :** "Cyber-Professional". Fond sombre (Dark Mode), accentuations subtiles (gradients violets/bleus), glassmorphism pour les panneaux de contrôle, typographie monospace pour les données techniques, sans-serif géométrique (Inter/Geist) pour l'interface.
*   **Flow :** Linéaire mais navigable.
    1.  **Onboarding Rapide :** Nom du projet et contexte métier (Input libre).
    2.  **Direction Artistique (Le Cœur) :** Sélecteurs visuels (Moodboards, Palettes, styles 3D).
    3.  **Paramètres Techniques :** Stack, Performance, Contraintes.
    4.  **Moteur de Raffinement :** L'utilisateur voit l'IA "réfléchir" et structurer les données.
    5.  **Output :** Affichage en onglets (IA / Designer / Dev) avec copie en un clic.

---

## 2. ARCHITECTURE TECHNIQUE

### 🧱 Stack Technologique
*   **Frontend :** Next.js 14+ (App Router) pour le rendu serveur et la gestion des routes API.
*   **Langage :** TypeScript (Strict mode) pour garantir la robustesse du modèle de données.
*   **Styling :** Tailwind CSS + `shadcn/ui` (Radix UI) pour des composants accessibles et customisables. Framer Motion pour les micro-interactions (feedback utilisateur).
*   **State Management :** **Zustand**. Idéal pour gérer l'objet global `ProjectState` sans les problèmes de re-rendering excessif du Context API.
*   **AI Engine :** OpenAI API (model `gpt-4-turbo` ou `gpt-4o`) via `ai` SDK de Vercel (optional) ou fetch standard.
*   **Validation :** Zod pour la validation du schéma JSON avant l'envoi à l'IA.

### 📐 Architecture Logique
```mermaid
graph TD
    User[Utilisateur] --> UI[Interface Next.js]
    UI --> Store[Zustand Store (JSON State)]
    Store --> Validator[Zod Schema Validation]
    Validator --> API[Next.js API Route /generate]
    API --> Logic[Prompt Engine Middleware]
    Logic --> OpenAI[OpenAI GPT-4o]
    OpenAI --> API
    API --> UI
```

---

## 3. MODÈLE DE DONNÉES (DATA LAYER)

C'est la colonne vertébrale de l'application. Tout choix UI met à jour cet objet.

```typescript
// Types principaux
type ProjectIdentity = {
  name: string;
  industry: string; // ex: "Luxe", "SaaS", "Gaming"
  description: string; // Brief brut
};

type ArtDirection = {
  vibe: ('minimalist' | 'brutalist' | 'futuristic' | 'organic' | 'corporate')[];
  colorPalette: 'monochrome' | 'vibrant' | 'pastel' | 'dark_mode_neon' | 'earth_tones';
  typography: 'serif' | 'sans-serif' | 'mono' | 'experimental';
  motionLevel: 'static' | 'subtle' | 'immersive' | 'aggressive';
};

type ThreeDSpecs = {
  isEnabled: boolean;
  style: 'low-poly' | 'realistic' | 'abstract_shapes' | 'particles' | 'none';
  lighting: 'natural' | 'studio' | 'neon' | 'cinematic';
  performanceConstraint: 'mobile_first' | 'desktop_hero' | 'vr_ready';
};

type TechStack = {
  framework: string; // Next.js, Vue, etc.
  styling: string; // Tailwind, CSS Modules
  threeLibrary: string; // R3F, Three.js, Spline
};

// L'objet global
interface ProjectManifest {
  identity: ProjectIdentity;
  artDirection: ArtDirection;
  threeD: ThreeDSpecs;
  tech: TechStack;
  generatedAt: Date;
}
```

---

## 4. MOTEUR DE GÉNÉRATION DE PROMPT (PROMPT ENGINE)

Le moteur ne se contente pas de remplir des trous. Il agit comme un **Meta-Prompt**.

### ⚙️ Fonctionnement
1.  **Ingestion :** Réception du JSON `ProjectManifest`.
2.  **Analyse Conditionnelle (Pre-processing) :** Application de règles métier (voir section 5).
3.  **Construction du System Prompt :**
    *   *Role :* "Tu es le Lead Creative Technologist d'une agence web primée aux Awwwards."
    *   *Task :* "Analyse ce manifeste JSON. Déduis les non-dits. Génère 3 sorties distinctes."
    *   *Constraints :* "Ne sois jamais générique. Utilise un vocabulaire expert (ex: 'kerning', 'subsurface scattering', 'glassmorphism')."
4.  **Appel IA :** Envoi avec température faible (0.3 - 0.5) pour la précision structurelle, mais haute pour la créativité du contenu.

### 🧠 Logique Conditionnelle (Business Logic)
Ces règles sont injectées dynamiquement dans les instructions du système :

| Condition | Action du Moteur |
| :--- | :--- |
| `threeD.style == 'realistic'` AND `performance == 'mobile_first'` | **Alerte :** Ajouter une section "Optimisation" stricte (Baking textures, Low poly fallback). |
| `motionLevel == 'aggressive'` | **UX Warning :** Ajouter une contrainte "Respecter `prefers-reduced-motion`". |
| `artDirection.vibe == 'brutalist'` | **Style :** Forcer des recommandations de typographie large et de contrastes forts. |
| `industry == 'Banking'` AND `vibe == 'futuristic'` | **Nuance :** Modérer le futurisme pour garder la "Confiance/Trust". |

---

## 5. SORTIES GÉNÉRÉES

L'API renverra un objet JSON contenant trois blocs Markdown :

### 🧠 1. Le "Master AI Prompt"
*Pour générer le site via un outil comme v0, GPT-4 ou Midjourney (pour les images).*
*   **Structure :** Contexte > Rôle > Tâche > Spécifications détaillées étape par étape.
*   **Spécificité :** Très verbeux, précis sur les adjectifs.

### 🎨 2. Le "Brief Creative Director"
*Pour l'équipe humaine de design.*
*   **Contenu :** Moodboard textuel, psychologie des couleurs, intentions émotionnelles, références culturelles.
*   **Ton :** Inspirant, visionnaire.

### 💻 3. Le "Tech Spec Sheet"
*Pour les développeurs.*
*   **Contenu :** Architecture des composants, choix des librairies (ex: "Utiliser `drei` pour les contrôles caméra"), structure des états (Zustand), accessibilité.

---

## 6. RECOMMANDATIONS UX & NEXT STEPS

1.  **Preview Temps Réel :** Afficher un résumé "Live" du manifeste JSON sur le côté pendant que l'utilisateur remplit le formulaire.
2.  **Save & Resume :** Utiliser `localStorage` pour ne pas perdre le brief en cours.
3.  **Mode "Expert" :** Permettre à l'utilisateur d'éditer le JSON brut avant la génération s'il le souhaite.
