import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("perfil");
  const [turmas, setTurmas] = useState([]);
  const [Ocorrências, setOcorrências] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("https://ocorrencia-blush.vercel.app/turmas");
      setTurmas(response.data);
      setView("turmas");
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    }
  };

  const fetchOcorrências = async () => {
    try {
      const response = await axios.get("https://ocorrencia-blush.vercel.app/disciplinas");
      setOcorrências(response.data);
      setView("Ocorrências");
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  };

  return (
    <div className="profile-page">
      <aside className="sidebar">
        <h2 className="logo">Sistema de Ocorrências</h2>
        <ul>
          <li onClick={() => setView("perfil")} className={view === "perfil" ? "active" : ""}>
            Perfil
          </li>
          <li onClick={fetchTurmas} className={view === "turmas" ? "active" : ""}>
            Turmas
          </li>
          <li onClick={fetchOcorrências} className={view === "Ocorrências" ? "active" : ""}>
            Ocorrências
          </li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </aside>

      <main className="main-content">
        {view === "perfil" && user && (
          <div className="section">
            <h2>Informações do Usuário</h2>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        )}

        {view === "turmas" && (
          <div className="section">
            <h2>Turmas Cadastradas</h2>
            {turmas.length > 0 ? (
              <ul>
                {turmas.map((turma) => (
                  <li key={turma.id}>
                    {turma.nome} - {turma.turno}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma turma encontrada.</p>
            )}
          </div>
        )}

        {view === "Ocorrências" && (
          <div className="section">
            <h2>Ocorrências</h2>
            {Ocorrências.length > 0 ? (
              <ul>
                {Ocorrências.map((Ocorrências) => (
                  <li key={Ocorrências.id}>{Ocorrências.nome}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma ocorrência encontrada.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
