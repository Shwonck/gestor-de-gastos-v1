import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Recebimentos = () => {
  const [recebimentos, setRecebimentos] = useState([]);
  const [novoRecebimento, setNovoRecebimento] = useState({ descricao: '', valor: '', data
  : '' });
  const [editandoRecebimento, setEditandoRecebimento] = useState(null);

  useEffect(() => {
    fetchRecebimentos();
  }, []);

  const fetchRecebimentos = async () => {
    const response = await api.get('/recebimentos');
    setRecebimentos(response.data);
  };

  const handleAddRecebimento = async () => {
    if (editandoRecebimento) {
      await api.put(`/recebimentos/${editandoRecebimento.id}`, novoRecebimento);
      setEditandoRecebimento(null); // Resetar o estado de edição
    } else {
      await api.post('/recebimentos', novoRecebimento);
    }
    fetchRecebimentos();
    setNovoRecebimento({ descricao: '', valor: '', data
    : '' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/recebimentos/${id}`);
    fetchRecebimentos();
  };

  const handleEdit = (recebimento) => {
    setNovoRecebimento({ descricao: recebimento.descricao, valor: recebimento.valor, data
    : recebimento.data
     });
    setEditandoRecebimento(recebimento);
  };

  return (
    <div>
      <h2 className="mb-4">Recebimentos</h2>

      {/* Formulário */}
      <div className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição"
              value={novoRecebimento.descricao}
              onChange={(e) => setNovoRecebimento({ ...novoRecebimento, descricao: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Valor"
              value={novoRecebimento.valor}
              onChange={(e) => setNovoRecebimento({ ...novoRecebimento, valor: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="Data de Recebimento"
              value={novoRecebimento.data
              }
              onChange={(e) => setNovoRecebimento({ ...novoRecebimento, data
              : e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddRecebimento}>
              {editandoRecebimento ? 'Salvar' : 'Adicionar'}
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
            <th>Data do Recebimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recebimentos.map((recebimento) => (
            <tr key={recebimento.id}>
              <td>{recebimento.descricao}</td>
              <td>R$ {recebimento.valor}</td>
              <td>{recebimento.data
              }</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(recebimento)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(recebimento.id)}
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

export default Recebimentos;
