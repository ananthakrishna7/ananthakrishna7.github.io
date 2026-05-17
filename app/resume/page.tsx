'use client';

import { Grid, Column, Button } from '@/app/components/CarbonWrappers';
import { DocumentDownload } from '@carbon/icons-react';

export default function Resume() {
  return (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="cds--type-productive-heading-06">Resume</h1>
          <Button renderIcon={DocumentDownload} kind="primary" disabled>
            Download PDF (Placeholder)
          </Button>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--cds-layer)', borderRadius: '4px' }}>
          <h2 className="cds--type-productive-heading-05" style={{ marginBottom: '1rem' }}>Ananthakrishna</h2>
          <p style={{ marginBottom: '2rem' }}>Quantum Computing Student & Developer</p>

          <h3 className="cds--type-productive-heading-04" style={{ marginBottom: '0.5rem', marginTop: '1.5rem' }}>Education</h3>
          <hr style={{ borderColor: 'var(--cds-border-subtle)', marginBottom: '1rem' }} />
          <div>
            <h4 style={{ fontWeight: 'bold' }}>B.Tech in Computer Science (Quantum Computing)</h4>
            <p className="cds--type-helper-text-01">2021 - Present</p>
          </div>

          <h3 className="cds--type-productive-heading-04" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Experience</h3>
          <hr style={{ borderColor: 'var(--cds-border-subtle)', marginBottom: '1rem' }} />
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Software Developer Intern</h4>
            <p className="cds--type-helper-text-01">Tech Corp | Jun 2023 - Aug 2023</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Developed REST APIs using Node.js and Express.</li>
              <li>Collaborated with frontend teams to integrate React components.</li>
            </ul>
          </div>

          <h3 className="cds--type-productive-heading-04" style={{ marginBottom: '0.5rem', marginTop: '2rem' }}>Skills</h3>
          <hr style={{ borderColor: 'var(--cds-border-subtle)', marginBottom: '1rem' }} />
          <p>JavaScript, TypeScript, React, Next.js, Python, Qiskit, Carbon Design System</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <p className="cds--type-helper-text-01">
            Note: This page is ready to be populated by generating Markdown from your RenderCV YAML file.
            Run `rendercv render your_resume.yaml` locally, and place the generated markdown in the `content` folder.
          </p>
        </div>
      </Column>
    </Grid>
  );
}
