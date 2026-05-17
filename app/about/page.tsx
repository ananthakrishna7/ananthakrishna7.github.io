import { MachineLearningModel } from '@carbon/icons-react';
import { GoogleGenAI } from '@google/genai';
import { Grid, Column } from '@/app/components/CarbonWrappers';

async function getResumeSummary() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "This section is generated using Gemini to summarize my resume. To enable this feature, provide the 'GEMINI_API_KEY' environment variable. (Instructions in README).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      You are generating an 'About Me' summary for my portfolio website.
      Here is my resume information:
      - B.Tech in Computer Science (Quantum Computing), 2021-Present.
      - Software Developer Intern at Tech Corp (Jun-Aug 2023), developed REST APIs (Node.js/Express) and integrated React components.
      - Skills: JavaScript, TypeScript, React, Next.js, Python, Qiskit, Carbon Design System.

      Write a concise, professional 3-4 sentence paragraph summarizing my experience and goals. Make it sound human but highly technical.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please check the API configuration.";
  }
}

export default async function About() {
  let summary = await getResumeSummary();

  return (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <h1 className="cds--type-productive-heading-06" style={{ marginBottom: '2rem' }}>About Me</h1>

        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--cds-layer)',
          borderRadius: '4px',
          borderLeft: '4px solid var(--cds-support-info)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <MachineLearningModel size={24} style={{ color: 'var(--cds-support-info)' }} />
            <h2 className="cds--type-productive-heading-03">AI-Generated Summary</h2>
          </div>
          <p className="cds--type-body-long-01" style={{ lineHeight: '1.6' }}>
            {summary}
          </p>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h2 className="cds--type-productive-heading-04" style={{ marginBottom: '1rem' }}>The Journey</h2>
          <p className="cds--type-body-long-01" style={{ marginBottom: '1rem' }}>
            My interest in quantum computing stems from its potential to solve problems classical computers cannot.
            Coupled with my background in full-stack development, I aim to bridge the gap between complex quantum algorithms and usable software interfaces.
          </p>
          <p className="cds--type-body-long-01">
            This digital garden serves as a public notebook where I document my learnings, track my projects, and share insights on software engineering and quantum mechanics.
          </p>
        </div>
      </Column>
    </Grid>
  );
}
