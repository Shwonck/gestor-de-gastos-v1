import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Faturas = () => {
  const [faturas, setFaturas] = useState([]);
  const [novaFatura, setNovaFatura] = useState({ descricao: '', valor: '', dataVencimento: '' });
  const [editandoFatura, setEditandoFatura] = useState(null);

  useEffect(() => {
    fetchFaturas();
  }, []);

  const fetchFaturas = async () => {
    const response = await api.get('/faturas');
    setFaturas(response.data);
  };

  const handleAddFatura = async () => {
    if (editandoFatura) {
      await api.put(`/faturas/${editandoFatura.id}`, novaFatura);
      setEditandoFatura(null); // Resetar o estado de edição
    } else {
      await api.post('/faturas', novaFatura);
    }
    fetchFaturas();
    setNovaFatura({ descricao: '', valor: '', dataVencimento: '' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/faturas/${id}`);
    fetchFaturas();
  };

  const handleEdit = (fatura) => {
    setNovaFatura({ descricao: fatura.descricao, valor: fatura.valor, dataVencimento: fatura.dataVencimento });
    setEditandoFatura(fatura);
  };

  return (
    <div>
      <h2 className="mb-4">Faturas</h2>

      {/* Formulário */}
      <div className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição"
              value={novaFatura.descricao}
              onChange={(e) => setNovaFatura({ ...novaFatura, descricao: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Valor"
              value={novaFatura.valor}
              onChange={(e) => setNovaFatura({ ...novaFatura, valor: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="Data de Fatura"
              value={novaFatura.dataVencimento}
              onChange={(e) => setNovaFatura({ ...novaFatura, dataVencimento: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddFatura}>
              {editandoFatura ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data de Vencimento da Fatura</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {faturas.map((fatura) => (
            <tr key={fatura.id}>
              <td>{fatura.descricao}</td>
              <td>R$ {fatura.valor}</td>
              <td>{fatura.dataVencimento}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(fatura)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(fatura.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Faturas;
