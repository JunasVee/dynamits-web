import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="h-16 w-full shadow-md flex items-center justify-between px-5 md:px-20 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            <Link href="/">
                <Image 
                    src="/assets/logo-dynamits.png" 
                    className="w-28" 
                    alt="Logo" 
                    width={150} 
                    height={100} 
                    priority 
                    loading="eager" 
                    placeholder="blur" 
                    blurDataURL="/assets/logo-dynamits.png" 
                />
            </Link>

            {/* Menu */}
            <ul className="hidden lg:flex gap-10">
                <li className="border-b-2 border-transparent transition-all duration-300 hover:border-black">
                    <Link href="/about">About us</Link>
                </li>
                <li className="border-b-2 border-transparent transition-all duration-300 hover:border-black">
                    <Link href="/services">Services</Link>
                </li>
                <li className="border-b-2 border-transparent transition-all duration-300 hover:border-black">
                    <Link href="/partnerships">Partnerships</Link>
                </li>
                <li className="border-b-2 border-transparent transition-all duration-300 hover:border-black">
                    <Link href="/track">Tracking</Link>
                </li>
            </ul>

            <div className="md:flex hidden items-center gap-5">
                <Link href="/contact">
                    <button className="h-10 bg-blue-500 p-2 rounded-md text-white transition-all ease-in hover:bg-blue-600">Contact us</button>
                </Link>
                <Link href="/login">
                    <p className="text-blue-500 font-semibold transition-colors ease-in-out hover:text-blue-600">Log in</p>
                </Link>
                <button className="lg:hidden">
                    <Menu />
                </button>
            </div>

            <div className="md:hidden">
                <button>
                    <Menu />
                </button>
            </div>
        </nav>
    );
}
