import {hookSecret} from "../../../lib/env.api";
import {revalidateTag} from "next/cache";
import {type NextRequest, NextResponse} from "next/server";
// import { parseBody } from "next-sanity/webhook";
import {isValidSignature, SIGNATURE_HEADER_NAME} from "@sanity/webhook";

// Note: These are next.js route handlers not api routes 
export async function POST(req: NextRequest) {
    if (!hookSecret) {
        return new Response("Missing hook secret", {status: 400});
    }
    try {
        // const { body, isValidSignature } = await parseBody<{
        //   _type: string;
        //   slug?: string | undefined;
        // }>(req, hookSecret);
        const signature = req.headers.get(SIGNATURE_HEADER_NAME);
        if (!signature) {
            return new Response("Missing Signature", {status: 400});
        }
        const body = await req.json();
        const isValid = isValidSignature(JSON.stringify(body), signature, hookSecret);

        if (!isValid) {
            return new Response("Invalid Signature", {status: 401});
        }

        if (!body?._type) {
            return new Response("Bad Request", {status: 400});
        }

        revalidateTag(body._type);
        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (error: any) {
        console.error(error);
        return new Response(error.message, {status: 500});
    }
}
