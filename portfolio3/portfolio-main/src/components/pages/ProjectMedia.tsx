import Image from 'next/image';

const fallbackImage: string =
    "/github-image-fallback.png";

interface ProjectMediaProps {
    media: {
        _type: string;
        image?: string;
        video?: string;
        alt?: string | null;
    };
    width: number;
    height: number;
}

export default async function ProjectMedia({media, width, height}: ProjectMediaProps) {
    if (media._type === "image") {
        return (
            <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-contain"
                width={width}
                height="0"
                alt={media.alt ?? "Fallback Image"}
                src={media.image ?? fallbackImage}
                quality={100}
            />
        );
    } else if (media._type === "file") {
        return (
            <video
                src={media.video}
                className="rounded-sm object-contain object-left-top aspect-auto duration-300"
                // alt={media.alt || ""}
                width={width}
                height={height}
                loop
                autoPlay
                muted
                playsInline
            />
        );
    }

}