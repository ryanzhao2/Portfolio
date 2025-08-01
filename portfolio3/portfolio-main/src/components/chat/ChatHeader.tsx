export default function ChatHeader() {
    return (
        <section className="flex w-full items-center justify-start gap-3">
            <div className="flex flex-col items-start">
                <p className="text-xs">Chat with</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm font-medium whitespace-nowrap">Krish Support</p>
                </div>
            </div>
        </section>
    );
}
