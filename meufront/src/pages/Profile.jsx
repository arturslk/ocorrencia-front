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
      <header className="topbar">
        <div className="user-info">
          <div className="avatar" />
          <div className="welcome">
            <p>Bem-vindo(a)</p>
            <strong>{user?.nome}</strong>
          </div>
        </div>

        <h1 className="logo">Sistema de Ocorrencias</h1>

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <nav className="menu">
        <ul>
          <li onClick={() => setView("turmas")} className={view === "turmas" ? "active" : ""}>
            Turmas
          </li>
          <li onClick={fetchOcorrências} className={view === "Ocorrências" ? "active" : ""}>
            Ocorrencias
          </li>
          <li onClick={() => setView("sobre")} className={view === "sobre" ? "active" : ""}>
            Sobre
          </li>
        </ul>
      </nav>

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
                {Ocorrências.map((ocorrencia) => (
                  <li key={ocorrencia.id}>{ocorrencia.nome}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma ocorrência encontrada.</p>
            )}
          </div>
        )}

        {view === "sobre" && (
          <div className="section">
            <h2>Sobre</h2>
            <p>Este sistema foi desenvolvido para registrar ocorrências escolares.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
