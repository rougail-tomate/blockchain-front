import Navbar from "@/components/layout/Navbar";
import { useUserStore } from "@/providers/user-store.provider";

export default function Home() {
    const store = useUserStore((state) => state);
    console.log(store)
    return (
         <div className="bg-red-700">
            <Navbar />
            <p>hello world homepage</p>
        </div>
     )
}