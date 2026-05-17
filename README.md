# Ananthakrishna's Digital Garden

A personal portfolio and digital garden built with Next.js, MDX, and the Carbon Design System.

## Features
- **Carbon Design System** with custom Light/Dark theme toggle.
- **MDX support** for notes and blog posts (with KaTeX and Wikilinks).
- **GitHub Integration:** Fetches pinned repositories dynamically.
- **Gemini AI Integration:** Generates an 'About Me' summary at build time based on a resume.
- **Spotify Integration:** (Placeholder for Currently Listening widget).
- **Resume Parsing:** Placeholder for RenderCV markdown output.

## Setup Instructions

### Environment Variables
To enable the Gemini AI integration for the 'About Me' page, create a `.env.local` file (or add it to your GitHub Actions Secrets if deploying via GH Actions) and provide your API key:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

### Resume Generation
This project is set up to render a markdown version of your Resume. If you are using RenderCV, run it locally:
\`\`\`bash
rendercv render your_resume.yaml
\`\`\`
And place the generated output appropriately in the \`content\` folder.

### Running locally
\`\`\`bash
npm install
# npm run dev
\`\`\`

## Deployment
This project can be easily deployed to Vercel, Netlify, or via GitHub Pages using Next.js static exports. Ensure your Environment Variables are securely configured in your deployment platform.
