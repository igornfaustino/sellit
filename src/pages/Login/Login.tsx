import React, { useState, useCallback, FormEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface AuthPayload {
  login: {
    token: string;
  };
}

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const [login] = useMutation<AuthPayload>(LOGIN, {
    onCompleted: ({ login: { token } }) => {
      localStorage.setItem('token', token);
      history.replace('/profile');
    },
    onError: e => console.log({ e })
  });

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      login({ variables: { email, password } });
    },
    [email, login, password]
  );
  return (
    <div className="container logon-container">
      <section className="form">
        <h1 className="logo">Sell It</h1>

        <form onSubmit={submit}>
          <h2>Faça seu login</h2>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Seu email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
