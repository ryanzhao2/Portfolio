import {cn} from "../../utils/class-merge"
import {Message} from "ai";
import {Bot} from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface ChatMessageProps {
    message: Message;
}

export default function ChatMessage({
                                        message: {role, content},
                                    }: ChatMessageProps) {
    const isBot = role === "assistant";

    return (
        <div
            className={cn(
                "mb-3 flex items-center",
                isBot ? "justify-start" : "justify-end",
            )}
        >
            {isBot && <Bot className="mr-2" size={30}/>}
            <div
                className={cn(
                    "rounded border px-3 py-2 max-w-64",
                    isBot ? "bg-background" : "bg-foreground text-background",
                )}
                style={{
                    width: isBot ? "85%" : "auto",
                }}
            >
                <Markdown
                    components={{
                        a: ({node, href, ...props}) => (
                            <Link legacyBehavior href={href ?? ""}>
                                <a className="underline underline-offset-2" {...props} />
                            </Link>
                        ),
                        p: ({node, ...props}) => (
                            <p className="mt-3 first:mt-0" {...props} />
                        ),
                        ul: ({node, ...props}) => (
                            <ul
                                className="mt-3 list-inside list-disc first:mt-0"
                                {...props}
                            />
                        ),
                    }}
                >
                    {content}
                </Markdown>
            </div>
        </div>
    );
}
