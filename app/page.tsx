import { Grid, Column } from '@/app/components/CarbonWrappers';

export default function Home() {
  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to My Digital Garden</h1>
        <p>I am studying Quantum Computing, and this is where I share my notes, projects, and thoughts.</p>
      </Column>
    </Grid>
  );
}
