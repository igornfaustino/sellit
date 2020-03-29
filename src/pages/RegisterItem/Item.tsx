import React, { useState, useCallback, FormEvent } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import './styles.css';
import { Link, useHistory } from 'react-router-dom';

const CREATE_ITEM = gql`
  mutation createItem($name: String!, $description: String!, $value: Float!) {
    createItem(name: $name, description: $description, value: $value) {
      id
    }
  }
`;

const RegisterItem: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const history = useHistory();

  const [createItem] = useMutation(CREATE_ITEM, {
    onCompleted: () => {
      history.push('/profile');
    },
    onError: e => console.log({ e })
  });

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      createItem({ variables: { name, description, value } });
    },
    [createItem, description, name, value]
  );

  return (
    <div className="container">
      <section className="form">
        <form onSubmit={submit}>
          <h2>Cadastrar novo item</h2>

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do item"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <textarea
            name="description"
            id="description"
            rows={10}
            placeholder="Descrição do item"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Valor do item"
            value={value}
            onChange={e => setValue(parseFloat(e.target.value))}
          />

          <button type="submit" className="button">
            Registrar Item
          </button>

          <Link to="/profile" className="back-link">
            Voltar
          </Link>
        </form>
      </section>
    </div>
  );
};

export default RegisterItem;
