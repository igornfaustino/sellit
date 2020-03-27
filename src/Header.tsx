import React from 'react';

interface HeaderProps {
  children: String;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div>{children}</div>;
};
