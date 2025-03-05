import Link from "next/link";
import Image from "next/image";
import logo from '../../../public/blockchain-logo.svg';

export default function Navbar() {
  return (
    <nav className={"bg-background shadow-md"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center ">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={logo} alt="logo" className="h-12 w-12"/>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
                <div className="">
                  <Link href="/marketplace" className="text-white hover:text-light_green flex items-center align-middle gap-2 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span>Marketplace</span>
                  </Link>
                </div>

                <div className="">
                  <Link href="/create-rwa" className="text-white hover:text-light_green flex items-center gap-2 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Nouveau</span>
                  </Link>
                </div>

                <div className="">
                  <Link href="/assets" className="text-white hover:text-light_green flex items-center gap-2 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span>Mes assets</span>
                  </Link>
                </div>

                <div className="">
                  <Link href="/register" className="text-white hover:text-light_green flex items-center gap-2 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </Link>
                </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - can be expanded with a hamburger button */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile menu items would go here */}
        </div>
      </div>
    </nav>
  );
}