import { useChatbot } from "./ChatProvider";
import { useChat } from "ai/react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./AccordionUI";

export default function Chat() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error,
    } = useChat();

    const { isVisible } = useChatbot();

    return (
        isVisible && (
            <Accordion type="single" collapsible className="relative z-40 flexs">
                <AccordionItem
                    value="item-1"
                    className="fixed bottom-8 right-8 md:w-[22rem] xs:w-80 rounded-md border bg-zinc-100 dark:bg-[#1C1C1F]"
                >
                    <AccordionTrigger className="border-b px-6">
                        <ChatHeader />
                    </AccordionTrigger>
                    <AccordionContent className="flex max-h-[32rem] min-h-[24rem] flex-col justify-between p-0">
                        <ChatMessages
                            messages={messages}
                            error={error}
                            isLoading={isLoading}
                        />
                        <ChatInput
                            input={input}
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            setMessages={setMessages}
                            isLoading={isLoading}
                            messages={messages}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        )
    );
}
