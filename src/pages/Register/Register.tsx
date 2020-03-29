import React, { useState, useCallback, FormEvent } from 'react';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SINGUP = gql`
  mutation singup(
    $name: String!
    $email: String!
    $whatsapp: String!
    $password: String!
  ) {
    singup(
      name: $name
      email: $email
      whatsapp: $whatsapp
      password: $password
    ) {
      token
    }
  }
`;

interface AuthPayload {
  singup: {
    token: string;
  };
}

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();

  const [singup] = useMutation<AuthPayload>(SINGUP, {
    onCompleted: ({ singup: { token } }) => {
      localStorage.setItem('token', token);
      history.replace('/profile');
    },
    onError: e => console.log({ e })
  });

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      singup({ variables: { email, password, whatsapp, name } });
    },
    [email, name, password, singup, whatsapp]
  );

  return (
    <div className="container">
      <section className="form">
        <h1 className="logo">Sell It</h1>

        <form onSubmit={submit}>
          <h2>Faça seu Cadastro</h2>

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
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            name="whatsapp"
            id="whatsapp"
            placeholder="Seu whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
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
