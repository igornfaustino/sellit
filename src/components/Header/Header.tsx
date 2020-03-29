import React from 'react';

import './styles.css';

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="header">
      <div className="branding">Sell It</div>
      <div className="items">{children}</div>
    </div>
  );
};
