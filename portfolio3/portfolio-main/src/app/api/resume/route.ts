import {resumeQuery} from "../../../lib/sanity.query";
import {sanityFetch} from "../../../lib/sanity.client";
import {type NextRequest, NextResponse} from "next/server";

async function getResume() {
    return sanityFetch<{ url: string; filename: string; uploadedAt: string }>({
        query: resumeQuery,
        tags: ["resume"],
    });
}

// Note: These are next.js route handlers not api routes 
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const download = req.nextUrl.searchParams.get("download") === "true";
        const contentDisp = download ? "attachment" : "inline";

        const resume = await getResume();

        if (!resume || !resume.url || !resume.filename) {
            throw new Error("Failed to fetch resume from Sanity.");
        }

        const {url, filename} = resume;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch resume from Sanity.");
        }
        const arrayBuffer = await response.arrayBuffer();

        return new Response(arrayBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `${contentDisp}; filename="${filename}"`,
            },
        });
    } catch (error) {
        return new Response(null, {
            status: 404,
            statusText: "Failed to fetch resume from CMS.",
        });
    }
}