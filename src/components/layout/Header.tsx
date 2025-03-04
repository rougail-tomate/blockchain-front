import { JSX } from 'react';

type HeaderProps = {
    title: string;
    links: {
        href: string; 
        label: string 
    }[]; 
}

export default function Header(): JSX.Element {
  return (
    <div>this is the Header</div>
  );
}