import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
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

  return (
    <div className="profile-container">
      <header className="header">
        <h1>Sistema de Ocorrência</h1>
      </header>

      <div className="main-content">
        <aside className="sidebar">
          <ul>
            <li className="active">Perfil</li>
            <li>Turmas</li>
            <li>Disciplinas</li>
            <li onClick={handleLogout} className="logout">Sair</li>
          </ul>
        </aside>

        <section className="profile-details">
          <h2>Informações do Usuário</h2>
          {user ? (
            <div className="user-info">
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          ) : (
            <p>Carregando informações do usuário...</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
