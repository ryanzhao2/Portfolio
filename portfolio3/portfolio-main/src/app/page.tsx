import { profileQuery } from "../lib/sanity.query";
import type { ProfileType } from "../types";
import Job from "../components/pages/Job";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import Image from 'next/image';
import { sanityFetch } from "../lib/sanity.client";
import ContributionGraph from "../components/pages/ContributionGraph";
import AnimatedGreetings from "../animation/Greeting";
import RefLink from "../components/shared/RefLink";
import { BiLinkExternal } from "react-icons/bi";
import DownloadButton from "../components/shared/DownloadButton";
import Skills from "../components/shared/Skills";
import GithubCalendarComponent from "../components/pages/GithubCalendarComponent";


export default async function Home() {
    const profiles: ProfileType[] = await sanityFetch({
        query: profileQuery,
        tags: ["profile"],
    });
    const profile = profiles[0];

    return (
        <>
            <AnimatedGreetings />
            <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
                <section
                    className="flex lg:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
                    {profile &&
                        <div key={profile._id} className="lg:max-w-2xl max-w-2xl">
                            <Slide>
                                <h1 className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[500px] min-w-full">
                                    {profile.headline}
                                </h1>
                                <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-lg xsm:max-w-md">
                                    {profile.shortBio}
                                </p>
                            </Slide>
                            <Slide delay={0.1}>
                                <Social type="social" />
                            </Slide>
                        </div>
                    }
                    {/* <Slide delay={0.14}>
            <HeroSvg />
          </Slide> */}
                    <aside
                        className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                        <Slide delay={0.14}>
                            <div className="sticky top-10">
                                <Image
                                    className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                                    src={profile.profileImage.image}
                                    width={400}
                                    height={400}
                                    quality={100}
                                    alt={profile.profileImage.alt}
                                    placeholder="blur"
                                    blurDataURL={profile.profileImage.lqip}
                                    priority
                                />
                                <div className="flex flex-col text-center gap-y-4">
                                    <div className="flex items-center gap-x-3">
                                        <RefLink
                                            href="/resume"
                                            className="flex items-center justify-center text-center gap-x-2 basis-[90%] dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                                        >
                                            View Resume <BiLinkExternal className="text-base" />
                                        </RefLink>
                                        <DownloadButton />
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    </aside>
                </section>
                <Skills />
                {/* TODO: Work experience */}
                <Job />
                <GithubCalendarComponent />
            </main>
        </>
    );
}
