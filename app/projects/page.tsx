import { Grid, Column, Tile } from '@/app/components/CarbonWrappers';

async function getPinnedRepos(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const repos = await res.json();
    return repos;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Projects() {
  const username = 'ananthakrishna7';
  const repos = await getPinnedRepos(username);

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
          <h1 className="cds--type-productive-heading-06">Coding & Projects</h1>
        </div>

        <p style={{ marginBottom: '2rem' }}>
          Here are some of my recent open-source projects on GitHub.
          <strong> I am always open to collaboration! </strong>
          Feel free to open an issue or submit a PR on any of these repositories.
        </p>

        <Grid style={{ marginLeft: '-1rem', marginRight: '-1rem' }}>
          {repos.length > 0 ? repos.map((repo: any) => (
            <Column sm={4} md={4} lg={8} key={repo.id} style={{ padding: '1rem' }}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <Tile style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <h3 className="cds--type-productive-heading-03" style={{ marginBottom: '0.5rem', color: 'var(--cds-link-primary)' }}>
                    {repo.name}
                  </h3>
                  <p style={{ flex: 1, marginBottom: '1rem', color: 'var(--cds-text-secondary)' }}>
                    {repo.description || "No description provided."}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                    {repo.language && <span>{repo.language}</span>}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                  </div>
                </Tile>
              </a>
            </Column>
          )) : (
            <p>Could not load repositories at this time.</p>
          )}
        </Grid>

        <h2 className="cds--type-productive-heading-05" style={{ marginTop: '4rem', marginBottom: '1.5rem' }}>Currently Listening (Spotify)</h2>
        <div style={{ padding: '2rem', backgroundColor: 'var(--cds-layer)', borderRadius: '4px', textAlign: 'center' }}>
          <p>
            <em>Spotify Integration Placeholder</em>
          </p>
          <p className="cds--type-helper-text-01" style={{ marginTop: '1rem' }}>
            To activate, set up a Spotify Developer App and provide `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` as environment variables.
          </p>
        </div>
      </Column>
    </Grid>
  );
}
