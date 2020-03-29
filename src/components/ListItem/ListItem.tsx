import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

interface ItemProps {
  id: string;
  name: string;
  description: string;
  value: number;
}

const ListItem: React.FC<ItemProps> = ({ id, name, description, value }) => {
  return (
    <li key={id} className="list-item">
      <strong>Item</strong>
      <p>{name}</p>
      <strong>Descrição</strong>
      <p>{description}</p>
      <strong>Valor</strong>
      <p>R${value.toFixed(2)}</p>

      <button type="button">
        <FiTrash2 color="#a8a8b3" />
      </button>
    </li>
  );
};

export default ListItem;
