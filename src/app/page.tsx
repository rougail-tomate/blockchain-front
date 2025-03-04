import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-red-300">
      <ul>
        <li>
          <Link href="/marketplace">Marketplace</Link>
        </li>
        <li>
          <Link href="/auth">Se connecter</Link>
        </li>
        <li>
          <Link href="/assets">Mes assets</Link>
        </li>
      </ul>
    </div>
  );
}
