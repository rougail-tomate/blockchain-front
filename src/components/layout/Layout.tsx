import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import React from 'react';

export default function Layout({ children }: any) {
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}