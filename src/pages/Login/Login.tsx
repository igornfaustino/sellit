import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import store from '../../assests/store.png';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <div className="logon-container">
      <section className="form">
        <h1 className="logo">Sell It</h1>

        <form>
          <h2>Faça seu login</h2>

          <input type="email" name="email" id="email" placeholder="Seu email" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
          />

          <button type="submit" className="button">
            Entrar <FiLogIn />
          </button>

          <Link to="/register" className="back-link">
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
};
