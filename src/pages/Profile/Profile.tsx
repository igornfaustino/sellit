import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from '../../components/Header/Header';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import ListItem from '../../components/ListItem/ListItem';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_ITEMS = gql`
  {
    user {
      items {
        id
        name
        description
        value
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

interface Item {
  id: string;
  name: string;
  description: string;
  value: number;
}

interface Query {
  user: {
    items: Item[];
  };
}

const Profile: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery<Query>(GET_ITEMS);
  const [deleteItem] = useMutation(DELETE_ITEM, {
    onError: e => {
      console.log({ e });
      const items = data?.user.items;
      if (items) setItems(items);
    }
  });

  const renderItems = useMemo(
    () =>
      items.map(({ id, ...item }) => {
        const onDelete = (id: string) => () => {
          setItems(items.filter(item => item.id !== id));
          deleteItem({ variables: { id } });
        };
        return <ListItem key={id} {...item} onDelete={onDelete(id)} />;
      }),
    [deleteItem, items]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    history.replace('/');
  }, [history]);

  useEffect(() => {
    const items = data?.user.items;
    if (items) setItems(items);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    if (error.message === 'GraphQL error: Not authenticated')
      history.replace('/');
  }

  return (
    <>
      <Header>
        <>
          <Link to="item" className="link">
            Cadastrar novo item
          </Link>
          <div className="link" onClick={logout}>
            Logout
          </div>
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
