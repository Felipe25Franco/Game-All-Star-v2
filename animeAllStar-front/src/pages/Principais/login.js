import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Principais/Login.css';

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Inicia com o formulário de login visível

  const navigate = useNavigate(); // Hook de navegação

   const handleLogin = (e) => {
     e.preventDefault();
     // Aqui, você pode adicionar a lógica de autenticação
     navigate('/createPersonagem'); // Redireciona para a página de personagem após o login
   };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // Alterna entre login e cadastro
  };

  return (
    <div className="login-container">
      <div className="form-toggle">
        <button
          className={`toggle-button ${isLoginForm ? 'active' : ''}`}
          onClick={toggleForm}
        >
          Login
        </button>
        <button
          className={`toggle-button ${!isLoginForm ? 'active' : ''}`}
          onClick={toggleForm}
        >
          Cadastro
        </button>
      </div>
      {isLoginForm ? (
        <form className="form login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <label htmlFor="login-email">Email:</label>
          <input type="email" id="login-email" name="email" required />

          <label htmlFor="login-password">Senha:</label>
          <input type="password" id="login-password" name="password" required />

          <button type="submit">Entrar</button>
        </form>
      ) : (
        <form className="form register-form">
          <h2>Cadastro</h2>
          <label htmlFor="register-email">CPF:</label>
          <input type="text" id="register-cpf" name="cpf" required />

          <label htmlFor="register-email">Email:</label>
          <input type="email" id="register-email" name="email" required />

          <label htmlFor="register-password">Senha:</label>
          <input type="password" id="register-password" name="password" required />

          <label htmlFor="register-confirm-password">Confirmar Senha:</label>
          <input type="password" id="register-confirm-password" name="confirm-password" required />

          <button type="submit">Cadastrar</button>
        </form>
      )}
    </div>
  );
}

export default Login;
