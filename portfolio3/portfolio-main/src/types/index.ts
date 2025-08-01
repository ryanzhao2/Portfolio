import {TableRow} from "@sanity/table";
import {PortableTextBlock} from "sanity";

export interface Table {
    rows?: TableRow[];
    title?: string;
}

export interface TableValueProps {
    table?: Table;
    caption?: string;
}

export interface QuizValueProps {
    _key: string;
    question: string;
    answer: string;
}

export type ProfileType = {
    _id: string;
    fullName: string;
    headline: string;
    profileImage: {
        image: string;
        lqip: string;
        alt: string;
    };
    shortBio: string;
    email: string;
    fullBio: PortableTextBlock[];
    location: string;
    og: string;
    usage: PortableTextBlock[];
};

export type JobType = {
    _id: string;
    name: string;
    jobTitle: string;
    logo: string;
    url: string;
    description: string;
    startDate: string;
    endDate: string;
};

export type ProjectType = {
    _id: string;
    name: string;
    slug: string;
    tagline: string;
    projectUrl: string;
    comingSoon: boolean;
    repository: string;
    logo: string;
    coverMedia: {
        _type: "image" | "file";
        image?: string;
        video?: string;
        alt?: string | null;
        width: number;
    }[];
    description: PortableTextBlock[];
};

export type PostType = {
    _id: string;
    _createdAt: string;
    _updatedAt?: string;
    title: string;
    slug: string;
    description: string;
    canonicalLink?: string;
    date?: string;
    coverImage: {
        image: string;
        lqip: string;
        alt: string | null;
    };
    tags: string[];
    author: {
        name: string;
        photo: {
            image: string;
            alt: string;
        };
        githubURL: string;
    };
    body: PortableTextBlock[];
    featured: boolean;
    isPublished: boolean;
};

export type HeroeType = {
    _id: string;
    _createdAt: string;
    name: string;
    url: string;
    met: boolean;
};
