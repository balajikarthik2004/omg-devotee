import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Mic, ArrowLeft, Sparkles } from "lucide-react";
import { temples } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "AI Temple Assistant — OMG Smart Temple" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "ai"; text: string; card?: any };

function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const quick = [
    "Best time to visit Palani today?",
    "Is Meenakshi crowded now?",
    "Which temple has least crowd today?",
    "Pooja timings for Kapaleeshwarar",
    "Tiruvannamalai crowd status",
    "Murugan temples in Coimbatore",
  ];

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = generateReply(text);
      setMessages(m => [...m, reply]);
      setTyping(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col h-[100dvh] lg:h-screen">
      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="lg:hidden w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center"><ArrowLeft className="w-6 h-6" /></Link>
        <div className="w-10 h-10 rounded-full gradient-saffron flex items-center justify-center text-white font-serif text-xl">ॐ</div>
        <div className="flex-1 min-w-0">
          <div className="font-serif font-semibold flex items-center gap-1.5">OMG AI Temple Assistant</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-status-low"/> Online · Powered by AI</div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 pb-32 lg:pb-4 bg-background">
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-10">
            <div className="w-20 h-20 mx-auto rounded-full gradient-saffron flex items-center justify-center text-white font-serif text-4xl">ॐ</div>
            <h2 className="font-serif text-3xl font-semibold mt-4">Vanakkam! 🙏</h2>
            <p className="text-muted-foreground mt-1">I'm your personal temple guide. Ask me anything:</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {quick.map(q => (
                <button key={q} onClick={() => send(q)} className="text-base rounded-full bg-white border border-border px-3.5 py-2 hover:border-saffron/40">{q}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"} fade-in`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-base ${m.role==="user"?"bg-user-bg rounded-br-md":"bg-ai-bg rounded-bl-md"}`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.card}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-ai-bg rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-saffron typing-dot"/>
                  <span className="w-2 h-2 rounded-full bg-saffron typing-dot" style={{ animationDelay: "0.15s" }}/>
                  <span className="w-2 h-2 rounded-full bg-saffron typing-dot" style={{ animationDelay: "0.3s" }}/>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="fixed lg:sticky bottom-16 lg:bottom-0 inset-x-0 bg-white border-t border-border p-3 lg:p-4 z-30">
        <div className="max-w-2xl mx-auto flex items-center gap-2 bg-secondary rounded-full border border-border/80 shadow-sm px-4 py-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send(input)} placeholder="Ask about any temple..." className="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-white/70" />
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"><Mic className="w-5 h-5" /></button>
          <button onClick={() => send(input)} className="w-10 h-10 rounded-full gradient-saffron text-white flex items-center justify-center hover:scale-105 transition-transform"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}

function generateReply(q: string): Msg {
  const lower = q.toLowerCase();
  const t = temples.find(x => lower.includes(x.name.split(" ")[0].toLowerCase()) || lower.includes(x.slug.split("-")[0]));

  if (lower.includes("least crowd") || lower.includes("which temple")) {
    const sorted = [...temples].sort((a,b) => a.crowdPct - b.crowdPct).slice(0,3);
    return {
      role: "ai",
      text: "🙏 Here are the temples with the least crowd right now:",
      card: <div className="mt-3 space-y-2">{sorted.map(t => (
        <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm bg-cover bg-center overflow-hidden border border-border/50 relative" style={{ backgroundImage: `url(${t.image})`, backgroundColor: t.color }}>
            {!t.image && <span className="font-serif text-base drop-shadow-md">ॐ</span>}
          </div>
          <div className="flex-1 min-w-0"><div className="font-serif text-base font-semibold truncate">{t.name}</div><div className="text-sm text-muted-foreground">{t.district} · {t.waitMin}m wait</div></div>
          <CrowdBadge status={t.crowdStatus} />
        </Link>
      ))}</div>
    };
  }

  if (t && (lower.includes("crowd") || lower.includes("status") || lower.includes("wait"))) {
    return {
      role: "ai",
      text: `🙏 Here's the live status for ${t.name}:`,
      card: (
        <div className="mt-3 bg-white rounded-xl border border-border p-3 space-y-1.5">
          <div className="font-serif font-semibold text-base">{t.name}</div>
          <div className="flex items-center gap-2 text-base"><CrowdBadge status={t.crowdStatus} /> right now</div>
          <div className="text-base">⏱ Wait: {t.waitMin} min</div>
          <div className="text-base text-saffron">🤖 Best time: 3 – 5 PM</div>
          <Link to="/temple/$slug" params={{ slug: t.slug }} className="text-base text-saffron font-medium">View temple details →</Link>
        </div>
      )
    };
  }

  if (t && (lower.includes("time") || lower.includes("best") || lower.includes("when"))) {
    return {
      role: "ai",
      text: `✨ Best times to visit ${t.name} today:\n🌅 Early morning 6:00–7:30 AM — Very peaceful\n🌇 Afternoon 3:00–5:30 PM — Recommended ⭐\n🌙 Evening 7:00–8:30 PM — Moderate crowd\n\nAvoid 9:00–11:30 AM. It's a ${t.specialDay} special day — early morning will be extra auspicious. 🙏`
    };
  }

  if (t && lower.includes("parking")) {
    return {
      role: "ai",
      text: `🚗 Parking at ${t.name}:\n• Lot A: ${t.parking.lotA}% full\n• Lot B: ${t.parking.lotB}% full\n• Overflow: ${t.parking.overflow}% — available\n\nTip: Park at Lot B or the overflow lot after 3 PM.`
    };
  }

  if (t && (lower.includes("pooja") || lower.includes("timing") || lower.includes("schedule"))) {
    return {
      role: "ai",
      text: `🪔 Today's pooja schedule for ${t.name}:`,
      card: <div className="mt-3 bg-white rounded-xl border border-border p-3 space-y-1 text-base">{t.poojas.map(p => <div key={p} className="flex justify-between border-b border-border last:border-0 py-1"><span>{p.split(" ").slice(2).join(" ")}</span><span className="text-muted-foreground">{p.split(" ").slice(0,2).join(" ")}</span></div>)}</div>
    };
  }

  if (lower.includes("murugan")) {
    const m = temples.filter(t => t.deity.toLowerCase().includes("murugan"));
    return {
      role: "ai",
      text: "🕉 Murugan temples I track across Tamil Nadu:",
      card: <div className="mt-3 space-y-2">{m.map(t => (
        <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm bg-cover bg-center overflow-hidden border border-border/50 relative" style={{ backgroundImage: `url(${t.image})`, backgroundColor: t.color }}>
            {!t.image && <span className="font-serif text-base drop-shadow-md">ॐ</span>}
          </div>
          <div className="flex-1 min-w-0"><div className="font-serif text-base font-semibold truncate">{t.name}</div><div className="text-sm text-muted-foreground">{t.district}</div></div>
          <CrowdBadge status={t.crowdStatus} />
        </Link>
      ))}</div>
    };
  }

  return { role: "ai", text: "🙏 I can help with live crowd status, best times to visit, parking, pooja timings, and temple recommendations across Tamil Nadu. Try asking about a specific temple like Palani, Meenakshi, or Srirangam." };
}
