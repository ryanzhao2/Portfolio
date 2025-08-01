"use client";

import { ThemeProvider } from "next-themes";
import { ChatProvider } from "./../components/chat/ChatProvider";
import Chat from "./../components/chat/Chat";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class">
      <ChatProvider>
        {children}
        <Chat />
      </ChatProvider>
    </ThemeProvider>
  );
}
