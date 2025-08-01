import {Metadata} from "next";
import {BiDetail} from "react-icons/bi";
import Posts from "../../components/pages/Posts";
import Social from "../../components/shared/Social";
import {Slide} from "../../animation/Slide";
import PageHeading from "../../components/shared/PageHeading";

export const metadata: Metadata = {
    title: "Blog | Krish Patel",
    metadataBase: new URL("https://krishspatel.com/blog"),
    description: "Krish Patel – This is my developer blog where I talk about projects I’ve been working on and technologies I’m learning about.",
    openGraph: {
        title: "Blog | Krish Patel",
        url: "https://krishspatel.com/blog",
        description: "Krish Patel – This is my developer blog where I talk about projects I’ve been working on and technologies I’m learning about.",
        images: "https://krishspatel.com/logo.png",
    },
};

export default async function Blog() {
    return (
        <main className="max-w-7xl mx-auto md:px-16 px-6">
            <PageHeading
                title="Blog"
                description="Welcome to my developer blog! I’ll be using this page to talk about projects I’m working on and things I’ve learned or found interesting. Feel free to reach out if you have ideas or thoughts to share!"
            >
                <Social type="publication"/>
            </PageHeading>

            <Slide delay={0.1}>
                <div className="flex items-center gap-x-3 mb-8">
                    <BiDetail/>
                    <h2 className="text-xl font-semibold tracking-tight">Explore All</h2>
                </div>
                <Posts/>
            </Slide>
        </main>
    );
}
