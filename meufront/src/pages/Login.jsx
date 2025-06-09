import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/Login.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await axios.post("https://ocorrencia-blush.vercel.app/", {
        email,
        senha,
      });

      const user = response.data;

      if (user.token) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/profile");
      } else {
        setErro("Login falhou: token não recebido");
      }
    } catch (err) {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image" />
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Entrar</button>
          </form>
          {erro && <p className="erro">{erro}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
