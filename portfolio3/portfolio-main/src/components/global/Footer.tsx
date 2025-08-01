import Image from "next/image";
import sanityLogo from "../../../public/sanity.png";
import vercelLogo from "../../../public/vercel.svg";
import nextJSLogo from "../../../public/nextjs.svg";
import tailwindLogo from "../../../public/tailwind.png";
import UnmountStudio from "./Unmount";

export default function Footer() {
    return (
        <UnmountStudio>
            <footer
                className="border-t dark:border-zinc-800 border-zinc-100 mt-44 lg:min-h-[250px] min-h-full relative">
                <div
                    className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
                    <div className="flex md:flex-row flex-col items-center gap-x-2">
                        <h3 className="font-inter">Built with:</h3>
                        <ul className="flex items-center gap-x-2 text-sm dark:text-zinc-600 text-zinc-400 md:mt-0 mt-3">
                            <li>
                                <a
                                    href="https://nextjs.org"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                                >
                                    <Image
                                        src={nextJSLogo}
                                        width={20}
                                        height={20}
                                        alt="nextjs logo"
                                    />{" "}
                                    Next.js
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://tailwindcss.com"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                                >
                                    <Image
                                        src={tailwindLogo}
                                        width={20}
                                        height={20}
                                        alt="tailwind CSS logo"
                                    />{" "}
                                    Tailwind
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://sanity.io"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                                >
                                    <Image
                                        src={sanityLogo}
                                        width={20}
                                        height={20}
                                        alt="sanity logo"
                                    />{" "}
                                    Sanity
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vercel.com"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                                >
                                    <Image
                                        src={vercelLogo}
                                        width={20}
                                        height={20}
                                        alt="vercel logo"
                                    />{" "}
                                    Vercel
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
                        {/* <a
            >
              <BiLogoGithub />
              Stars <em className="text-primary-color not-italic">3,329</em>
            </a> */}

                        {/* <small className="text-zinc-500">
              Reserved
            </small> */}
                    </div>
                </div>
            </footer>
        </UnmountStudio>
    );
}
