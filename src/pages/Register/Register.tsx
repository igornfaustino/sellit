import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="container">
      <section className="form">
        <h1 className="logo">Sell It</h1>

        <form>
          <h2>Faça seu Cadastro</h2>

          <input type="email" name="email" id="email" placeholder="Seu email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
          />
          <input type="text" name="name" id="name" placeholder="Seu nome" />
          <input
            type="text"
            name="whatsapp"
            id="whatsapp"
            placeholder="Seu whatsapp"
          />

          <button type="submit" className="button">
            Cadastrar
          </button>

          <Link to="/" className="back-link">
            Voltar para o login
          </Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
