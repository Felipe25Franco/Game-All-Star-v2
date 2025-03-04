import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/Principais/Login.css";

function Login() {
  // Estado para controle do formulário de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para controle do formulário de cadastro
  const [formData, setFormData] = useState({
    login: "", // email
    cpf: "",
    senha: "",
    senhaRepeticao: "",
    admin: 0, // admin como 0 por padrão
  });

  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lógica de Login
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      login: email,  // email do usuário
      senha: password,  // senha do usuário
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/usuarios/auth', loginData);

      // Verifique a resposta
      const { token } = response.data;
      console.log('Token:', token);

      // Armazena o token e redireciona para a página protegida
      localStorage.setItem('authToken', token);
      navigate('/createPersonagem');  // ou para a tela de personagens
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao autenticar. Tente novamente.');
    }
  };

  // Lógica de Cadastro
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.senhaRepeticao) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/usuarios", {
        login: formData.login,
        cpf: formData.cpf,
        senha: formData.senha,
        senhaRepeticao: formData.senhaRepeticao,
        admin: formData.admin, // campo admin (padrão 0)
      });

      if (response.status === 201 || response.status === 200) {
        alert("Cadastro realizado com sucesso!");
        setIsLoginForm(true);  // Após cadastro, volta para o login
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error.response || error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);  // Alterna entre Login e Cadastro
  };

  return (
    <div className="login-container">
      <div className="form-toggle">
        <button className={`toggle-button ${isLoginForm ? "active" : ""}`} onClick={toggleForm}>
          Login
        </button>
        <button className={`toggle-button ${!isLoginForm ? "active" : ""}`} onClick={toggleForm}>
          Cadastro
        </button>
      </div>

      {isLoginForm ? (
        <form className="form login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <label htmlFor="login-email">Email:</label>
          <input type="email" id="login-email" name="login" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="login-password">Senha:</label>
          <input type="password" id="login-password" name="senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit">Entrar</button>
        </form>
      ) : (
        <form className="form register-form" onSubmit={handleRegister}>
          <h2>Cadastro</h2>
          <label htmlFor="register-login">Email:</label>
          <input type="email" id="register-login" name="login" value={formData.login} onChange={handleChange} required />

          <label htmlFor="register-cpf">CPF:</label>
          <input type="text" id="register-cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />

          <label htmlFor="register-password">Senha:</label>
          <input type="password" id="register-password" name="senha" value={formData.senha} onChange={handleChange} required />

          <label htmlFor="register-confirm-password">Confirmar Senha:</label>
          <input type="password" id="register-confirm-password" name="senhaRepeticao" value={formData.senhaRepeticao} onChange={handleChange} required />

          <button type="submit">Cadastrar</button>
        </form>
      )}
    </div>
  );
}

export default Login;
