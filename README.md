# Aether Prompt Studio

Application professionnelle de génération de prompts pour sites web 3D/Premium.

## 🚀 Démarrage Rapide

1.  **Installation des dépendances**
    ```bash
    npm install
    ```

2.  **Configuration de l'API Key**
    Créez un fichier `.env.local` à la racine :
    ```env
    OPENAI_API_KEY=sk-votre-cle-api-ici
    ```
    *(Sans clé, l'application fonctionnera en mode simulation avec des données mockées)*

3.  **Lancement**
    ```bash
    npm run dev
    ```
    Ouvrez [http://localhost:3000](http://localhost:3000).

## 🏗️ Architecture

*   **Frontend :** Next.js 14 (App Router), Tailwind CSS, Framer Motion.
*   **State :** Zustand (`store/useProjectStore.ts`).
*   **Logic :** API Route (`app/api/generate/route.ts`) contenant le "Prompt Engine".

## 🧩 Fonctionnalités

*   **Identity Step :** Capture du contexte métier.
*   **Art Direction :** Sélecteurs visuels (Vibe, Palette, Motion).
*   **Tech Specs :** Configuration 3D et performance.
*   **Moteur IA :** Génération de 3 prompts distincts (IA, Designer, Dev).
