import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import React from 'react';

export default function Layout({ children }: any) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}