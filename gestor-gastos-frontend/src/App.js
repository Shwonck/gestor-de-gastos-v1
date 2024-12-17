import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Despesas from './components/Despesas';
import Faturas from './components/Faturas';
import Recebimentos from './components/Recebimentos';
import Intro from './components/Intro';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="d-flex">
          {/* Sidebar */}
          <nav className="bg-primary text-white p-4 vh-100" style={{ width: '250px' }}>
            <h4 className="mb-4">Orçamento Pessoal</h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/despesas">Despesas</Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/faturas">Faturas</Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link text-white" to="/recebimentos">Recebimentos</Link>
              </li>
            </ul>
          </nav>

          {/* Conteúdo Principal */}
          <div className="flex-fill p-4">
            {/* Adicionar a rota para a tela inicial */}
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/despesas" element={<Despesas />} />
              <Route path="/faturas" element={<Faturas />} />
              <Route path="/recebimentos" element={<Recebimentos />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
