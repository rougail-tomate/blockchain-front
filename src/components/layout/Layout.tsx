import Headers from './Headers';
import Footer from './Footer';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <Headers />
      <div>{children}</div>
      <Footer />
    </div>
  );
}