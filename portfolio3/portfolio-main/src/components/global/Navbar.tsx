'use client';

import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()

    const data = [
        {
            title: "Home",
            href: "/",
        },
        // {
        //   title: "About",
        //   href: "/about",
        // },
        // {
        //     title: "Projects",
        //     href: "/projects",
        // },
        {
            title: "Blog",
            href: "/blog",
        },
    ];

    return (
        <UnmountStudio>
            <header
                className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Image src={Logo} width={50} height={50} alt="logo" />
                    </Link>

                    <nav className="md:block hidden">
                        <ul className="flex items-center gap-x-2">
                            {data.map((link, id) => (
                                <li key={id}>
                                    <Link
                                        href={link.href}
                                        className={`font-incognito text-base duration-300 px-4 py-2 rounded-lg
                    hover:text-zinc-900
                    dark:hover:text-primary-color
                    ${pathname === link.href ?
                                                "bg-zinc-200 dark:bg-zinc-700 " +
                                                "text-zinc-900 dark:text-primary-color"
                                                : "text-zinc-600 dark:text-white"
                                            }`}
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-x-4">
                        <Theme />
                        <MobileMenu />
                    </div>
                </div>
            </header>
        </UnmountStudio>
    );
}
