"use client";

import {BiLink, BiLogoFacebookSquare, BiLogoLinkedinSquare, BiLogoTwitter,} from "react-icons/bi";
import {IoIosCheckmark} from "react-icons/io";
import {useState} from "react";

type props = {
    title: string;
    slug: string;
    description: string;
};

export default function SharePost({title, slug, description}: props) {
    const [copied, setCopied] = useState(false);

    const blogUrl = `https://krishspatel.com/blog/${slug}`;
    const encodedBlogUrl = encodeURIComponent(blogUrl);

    const options = [
        {
            icon: BiLink,
            name: "Copy Link",
            shareUrl: blogUrl,
            isCopy: true,
        },
        {
            icon: BiLogoTwitter,
            name: "Twitter",
            shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
            )}&url=${encodedBlogUrl}`,
        },
        {
            icon: BiLogoLinkedinSquare,
            name: "LinkedIn",
            shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedBlogUrl}&title=${encodeURIComponent(
                title
            )}&summary=${encodeURIComponent(description)}`,
        },
        {
            icon: BiLogoFacebookSquare,
            name: "Facebook",
            shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedBlogUrl}`,
        },
        // {
        //   icon: BiLogoWhatsapp,
        //   name: "WhatsApp",
        //   shareUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        //     `${title}\n\n${blogUrl}`
        //   )}`,
        // },
    ];

    const handlePopup = (url: string, isCopy: boolean | undefined) => {
        if (isCopy) {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return;
        }
        window.open(
            url,
            "Social Share",
            "width=600,height=600,resizable=yes,scrollbars=yes,status=yes"
        );
    };

    return (
        <section className="border-b dark:border-zinc-800 border-zinc-200 pb-10">
            <h3 className="text-xl font-semibold tracking-tight mb-4">Share Post</h3>

            <div className="flex flex-wrap items-center gap-2 tracking-tight">
                {options.map((data, id) => (
                    <button
                        key={id}
                        onClick={() => handlePopup(data.shareUrl, data.isCopy)}
                        title={`Share to ${data.name}`}
                        aria-label={`Share to ${data.name}`}
                        className="w-12 h-12 p-2 grid place-content-center text-2xl dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md relative overflow-hidden"
                    >
                        {data.isCopy && copied ? (
                            <IoIosCheckmark aria-hidden="true" size={41}/>
                        ) : (
                            <data.icon aria-hidden="true"/>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}