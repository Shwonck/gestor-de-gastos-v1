import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Despesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [novaDespesa, setNovaDespesa] = useState({ descricao: '', valor: '', data
  : '' });
  const [editandoDespesa, setEditandoDespesa] = useState(null);

  useEffect(() => {
    fetchDespesas();
  }, []);

  const fetchDespesas = async () => {
    const response = await api.get('/despesas');
    setDespesas(response.data);
  };

  const handleAddDespesa = async () => {
    if (editandoDespesa) {
      await api.put(`/despesas/${editandoDespesa.id}`, novaDespesa);
      setEditandoDespesa(null); // Resetar o estado de edição
    } else {
      await api.post('/despesas', novaDespesa);
    }
    fetchDespesas();
    setNovaDespesa({ descricao: '', valor: '', data
    : '' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/despesas/${id}`);
    fetchDespesas();
  };

  const handleEdit = (despesa) => {
    setNovaDespesa({ descricao: despesa.descricao, valor: despesa.valor, data
    : despesa.data
     });
    setEditandoDespesa(despesa);
  };

  return (
    <div>
      <h2 className="mb-4">Despesas</h2>

      {/* Formulário */}
      <div className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descrição"
              value={novaDespesa.descricao}
              onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Valor"
              value={novaDespesa.valor}
              onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder="Data da Despesa"
              value={novaDespesa.data
              }
              onChange={(e) => setNovaDespesa({ ...novaDespesa, data
              : e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddDespesa}>
              {editandoDespesa ? 'Salvar' : 'Adicionar'}
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
            <th>Data da Despesa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>R$ {despesa.valor}</td>
              <td>{despesa.data
              }</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(despesa)}>
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(despesa.id)}
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

export default Despesas;
