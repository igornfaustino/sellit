import React, { useState, useMemo } from 'react';
import { Header } from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import './styles.css';
import ListItem from '../../components/ListItem/ListItem';

interface Item {
  id: string;
  name: string;
  description: string;
  value: number;
}

const itemsList: Item[] = [
  {
    id: '1',
    name: 'pc',
    description: 'descrição louca do item',
    value: 100.0
  },
  {
    id: '2',
    name: 'pc',
    description: 'descrição louca do item',
    value: 100.0
  },
  {
    id: '3',
    name: 'pc',
    description: 'descrição louca do item',
    value: 100.0
  },
  {
    id: '4',
    name: 'pc',
    description: 'descrição louca do item',
    value: 100.0
  }
];

const Profile: React.FC = () => {
  const [items, setItems] = useState<Item[]>(itemsList);

  const renderItems = useMemo(() => items.map(item => <ListItem {...item} />), [
    items
  ]);

  return (
    <>
      <Header>
        <>
          <Link to="item" className="link">
            Cadastrar novo item
          </Link>
          <div className="link">Logout</div>
        </>
      </Header>
      <div className="container-profile">
        <h2>Items Cadastrados</h2>
        <ul>{renderItems}</ul>
      </div>
    </>
  );
};

export default Profile;
