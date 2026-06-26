import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { routes } from './routes';

const PlaceholderPage = ({ name }: { name: string }) => (
  <div style={{ padding: '2rem' }}>
    <h2>{name}</h2>
    <p>Placeholder content for {name}.</p>
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>BizCred AI</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, flexWrap: 'wrap' }}>
          {routes.map(route => (
            <li key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <main style={{ flex: 1 }}>
      {children}
    </main>
    <footer style={{ padding: '1rem', borderTop: '1px solid #ccc', marginTop: 'auto', textAlign: 'center', fontSize: '0.8rem' }}>
      Educational planning only. This tool does not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Verify vendor requirements and reporting directly.
    </footer>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<PlaceholderPage name={route.name} />}
            />
          ))}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
