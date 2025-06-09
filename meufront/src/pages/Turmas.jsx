import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Turmas.css";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get("https://ocorrencia-blush.vercel.app/turmas");
        // Ajuste conforme o formato da resposta:
        setTurmas(response.data);
      } catch (error) {
        setErro("Erro ao carregar as turmas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTurmas();
  }, []);

  if (loading) return <p className="loading">Carregando turmas...</p>;
  if (erro) return <p className="erro">{erro}</p>;
  if (turmas.length === 0) return <p className="empty">Nenhuma turma encontrada.</p>;

  return (
    <div className="turmas-container">
      <h2>Turmas Cadastradas</h2>
      <ul className="turmas-list">
        {turmas.map((turma) => (
          <li key={turma.id} className="turma-item">
            {turma.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Turmas;
