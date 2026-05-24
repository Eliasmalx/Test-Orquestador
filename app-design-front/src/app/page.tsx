// app/page.tsx
'use client';

import { useState } from 'react';

type AppDesignResponse = {
  runId: string;
  blueprint?: {
    projectName: string;
    summary: string;
    modules: Array<{
      name: string;
      responsibility: string;
      entities: string[];
      endpoints: string[];
    }>;
  };
  apiRoutes?: Array<{
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    path: string;
    description: string;
    module: string;
  }>;
  generatedFiles?: Array<{
    path: string;
    description: string;
    language: 'ts' | 'json' | 'md';
    content: string;
  }>;
};

export default function HomePage() {
  const [idea, setIdea] = useState('Una app para descubrir eventos en Madrid');
  const [targetUsers, setTargetUsers] = useState('jóvenes profesionales');
  const [platform, setPlatform] = useState('web');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AppDesignResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/app-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea, targetUsers, platform }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Error calling API');
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>App Design Front</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Idea de la app"
          rows={4}
          style={{ padding: 12 }}
        />

        <input
          value={targetUsers}
          onChange={(e) => setTargetUsers(e.target.value)}
          placeholder="Target users"
          style={{ padding: 12 }}
        />

        <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: 12 }}>
          <option value="web">web</option>
          <option value="mobile">mobile</option>
          <option value="desktop">desktop</option>
          <option value="api">api</option>
        </select>

        <button type="submit" disabled={loading} style={{ padding: 12 }}>
          {loading ? 'Generando...' : 'Generar diseño'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'crimson', marginBottom: 24 }}>
          {error}
        </div>
      )}

      {data?.blueprint && (
        <section style={{ marginBottom: 32 }}>
          <h2>Blueprint</h2>
          <p><strong>Project:</strong> {data.blueprint.projectName}</p>
          <p>{data.blueprint.summary}</p>

          <div style={{ display: 'grid', gap: 12 }}>
            {data.blueprint.modules.map((mod) => (
              <div key={mod.name} style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
                <h3>{mod.name}</h3>
                <p>{mod.responsibility}</p>
                <p><strong>Entities:</strong> {mod.entities.join(', ')}</p>
                <p><strong>Endpoints:</strong> {mod.endpoints.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.apiRoutes && (
        <section style={{ marginBottom: 32 }}>
          <h2>Routes</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th align="left">Method</th>
                <th align="left">Path</th>
                <th align="left">Module</th>
                <th align="left">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.apiRoutes.map((route) => (
                <tr key={`${route.method}-${route.path}`}>
                  <td>{route.method}</td>
                  <td>{route.path}</td>
                  <td>{route.module}</td>
                  <td>{route.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data?.generatedFiles && (
        <section>
          <h2>Generated files</h2>

          <div style={{ display: 'grid', gap: 16 }}>
            {data.generatedFiles.map((file) => (
              <div key={file.path} style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 12,
                    background: '#f5f5f5',
                  }}
                >
                  <div>
                    <strong>{file.path}</strong>
                    <div style={{ fontSize: 14 }}>{file.description}</div>
                  </div>

                  <button onClick={() => copyText(file.content)}>
                    Copiar
                  </button>
                </div>

                <pre
                  style={{
                    margin: 0,
                    padding: 16,
                    overflowX: 'auto',
                    background: '#111',
                    color: '#eee',
                    fontSize: 13,
                  }}
                >
                  <code>{file.content}</code>
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}