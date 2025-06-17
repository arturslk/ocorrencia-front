import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../pages/Cadastrar.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Cadastrar() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const response = await axios.post("https://ocorrencia-blush.vercel.app/usuario", {
        nome,
        sobrenome,
        email,
        senha,
        disciplina_id: disciplinaId,
      });

      if (response.status === 201 || response.status === 200) {
        setSucesso("Cadastro realizado com sucesso! Você será redirecionado para o login...");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setErro("Erro ao cadastrar, tente novamente.");
      }
    } catch (error) {
      setErro("Erro ao cadastrar, verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="cadastrar-container">
      <div className="cadastrar-card">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Disciplina ID"
              value={disciplinaId}
              onChange={(e) => setDisciplinaId(e.target.value)}
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>

        {erro && <p className="erro">{erro}</p>}
        {sucesso && <p className="sucesso">{sucesso}</p>}

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Já tem conta?{" "}
          <Link className="entrar" to="/" style={{ color: "#007bff", textDecoration: "none" }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastrar;
