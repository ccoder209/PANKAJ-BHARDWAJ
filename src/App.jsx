import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Star,
  Sparkles,
  ArrowRight,
  BookOpen,
  Share2,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

const TELEGRAM_LINK = "https://t.me/+erDP7BDVP-5jZTc1";
const AVATAR_URL = "https://i.ibb.co/YBLbrv5c/Screenshot-2026-06-24-032738.png";

const TICKER_CONFIG = [
  { key: "nifty", label: "NIFTY 50", value: 24856.57, changePct: 0.58 },
  { key: "banknifty", label: "BANK NIFTY", value: 51481.9, changePct: 0.75 },
  { key: "sensex", label: "SENSEX", value: 81600.77, changePct: 0.58 },
  { key: "finnifty", label: "FIN NIFTY", value: 23412.27, changePct: 0.48 },
  { key: "vix", label: "INDIA VIX", value: 13.24, changePct: -4.88 },
];

const JOIN_FEED = [
  { name: "Manoj B.", city: "Surat" },
  { name: "Deepak G.", city: "Indore" },
  { name: "Pooja M.", city: "Bengaluru" },
  { name: "Karthik N.", city: "Chennai" },
  { name: "Ritesh K.", city: "Pune" },
  { name: "Sneha P.", city: "Ahmedabad" },
  { name: "Arjun S.", city: "Delhi" },
  { name: "Neha T.", city: "Jaipur" },
  { name: "Vikram R.", city: "Lucknow" },
  { name: "Anjali D.", city: "Kolkata" },
];

const TIME_LABELS = [
  "just now",
  "20 seconds ago",
  "45 seconds ago",
  "1 minute ago",
  "2 minutes ago",
  "3 minutes ago",
];

const FEATURES = [
  {
    icon: "📊",
    title: "Daily Nifty & BankNifty Levels",
    body: "Pinpoint key intraday support, resistance & breakout zones before market opens.",
  },
  {
    icon: "🎓",
    title: "No Paid Tips – Purely Educational",
    body: "Learn real price-action setups, candlestick psychology & risk management.",
  },
  {
    icon: "⏳",
    title: "5+ Years of Market Experience",
    body: "Time-tested market wisdom refined across bull, bear, and sideways regimes.",
  },
  {
    icon: "👥",
    title: "50,000+ Subscribers Trust Us",
    body: "A vibrant community of full-time and part-time traders learning daily.",
  },
];

function useLiveTicker() {
  const [items, setItems] = useState(() =>
    TICKER_CONFIG.map((t) => ({ ...t, open: t.value / (1 + t.changePct / 100) }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) =>
        prev.map((t) => {
          const jitter = t.value * (Math.random() * 0.002 - 0.001); // +-0.1%
          const nextValue = Math.max(0.01, t.value + jitter);
          const nextPct = ((nextValue - t.open) / t.open) * 100;
          return { ...t, value: nextValue, changePct: nextPct };
        })
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return items;
}

function useBoundedCounter(base, min, max, intervalMs, step) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor(Math.random() * (step * 2 + 1)) - step;
        return Math.min(max, Math.max(min, c + delta));
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs, step]);
  return count;
}

function useIncrementingCounter(base, intervalMs, maxStep) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * maxStep) + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, maxStep]);
  return count;
}

function formatPrice(v) {
  return v.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TickerBar() {
  const items = useLiveTicker();
  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-3 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 shrink-0 font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline text-[11px] font-bold tracking-wider uppercase text-slate-400">
            Live Markets
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap text-[12px]">
          {items.map((t) => {
            const up = t.changePct >= 0;
            return (
              <div
                key={t.key}
                className="flex items-center gap-1.5 font-medium bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50"
              >
                <span className="font-bold text-slate-300 text-[11px]">{t.label}:</span>
                <span className="font-mono font-semibold text-white animate-pop" key={Math.round(t.value * 100)}>
                  {formatPrice(t.value)}
                </span>
                <span className={`flex items-center text-[11px] font-bold ${up ? "text-emerald-400" : "text-rose-400"}`}>
                  {up ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {up ? "+" : ""}
                  {t.changePct.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>NSE / BSE Real-time Feed</span>
        </div>
      </div>
    </div>
  );
}

function JoinToast() {
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % JOIN_FEED.length);
      setTick((t) => t + 1);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const person = JOIN_FEED[idx];
  const timeLabel = TIME_LABELS[tick % TIME_LABELS.length];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 pointer-events-none">
      <div
        key={idx}
        className="bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl shadow-blue-900/10 rounded-xl p-2.5 pr-3.5 flex items-center gap-2.5 text-xs pointer-events-auto animate-slide-in-left"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <UserCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <span>{person.name}</span>
            <span className="text-slate-400 font-normal">({person.city})</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-50" />
          </div>
          <div className="text-[11px] text-slate-500">
            Joined Telegram channel &bull;{" "}
            <span className="text-emerald-600 font-semibold">{timeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex text-amber-500 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function App() {
  const onlineCount = useBoundedCounter(5937, 5800, 6100, 3500, 15);
  const todayJoined = useIncrementingCounter(7594, 7000, 3);

  const shareChannel = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "PANKAJ BHARDWAJ - King of Nifty", url: TELEGRAM_LINK });
      } else {
        await navigator.clipboard.writeText(TELEGRAM_LINK);
      }
    } catch {
      /* user cancelled share — no-op */
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative pb-24 sm:pb-12">
      <TickerBar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[460px] flex flex-col items-center animate-fade-in-up">
          <div className="bg-blue-50/90 hover:bg-blue-100/90 transition-colors text-blue-800 font-semibold text-xs sm:text-[13px] px-5 py-2 rounded-full mb-6 flex items-center gap-2 border border-blue-200/60 shadow-xs cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
            </span>
            <span>
              <strong className="font-bold font-mono">{onlineCount.toLocaleString("en-IN")}</strong> traders online now
            </span>
          </div>

          <div className="relative mb-2">
            <div className="w-[124px] h-[124px] rounded-full p-1 bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 shadow-xl shadow-blue-500/20">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border-2 border-white relative">
                <img alt="PANKAJ BHARDWAJ" className="w-full h-full object-cover" src={AVATAR_URL} />
              </div>
            </div>
            <div
              className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 text-white rounded-full border-[3px] border-slate-50 flex items-center justify-center font-bold text-xs shadow-md shadow-blue-600/30"
              title="Verified Telegram Channel"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          <div className="text-center mb-1">
            <h1 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 flex items-center justify-center gap-1.5">
              <span>PANKAJ BHARDWAJ</span>
            </h1>
            <p className="text-blue-600 text-xs sm:text-[13.5px] font-bold mt-1 tracking-wide">
              🏆 India's No.1 Stock Market Channel
            </p>
          </div>

          <button className="flex items-center gap-1.5 mb-5 px-3 py-1 rounded-full bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/60 transition-all cursor-pointer group">
            <Stars />
            <span className="text-xs font-bold text-slate-800">4.9/5</span>
            <span className="text-[11px] text-slate-500 group-hover:text-blue-600 font-medium underline-offset-2 underline decoration-slate-300">
              (2,340 reviews)
            </span>
          </button>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[390px] relative overflow-hidden group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-extrabold text-[15.5px] sm:text-base py-3.5 px-6 rounded-2xl text-center shadow-lg animate-pulse-glow transition-all duration-200 flex items-center justify-center gap-2 mb-6 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-200 animate-spin" style={{ animationDuration: "4s" }} />
              <span>Join Free Telegram Channel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-200" />
            </span>
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shine-continuous" />
          </a>

          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[390px] mb-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 text-center shadow-xs">
              <div className="text-lg font-black text-blue-600 font-mono tracking-tight">50K+</div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <Users className="w-3 h-3 text-slate-400" />
                Members
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 text-center shadow-xs">
              <div className="text-lg font-black text-blue-600 font-mono tracking-tight">5+ Yrs</div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-slate-400" />
                Experience
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-3 text-center shadow-xs">
              <div className="text-lg font-black text-emerald-600 font-mono tracking-tight">95%</div>
              <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                <BarChart3 className="w-3 h-3 text-emerald-500" />
                Accuracy
              </div>
            </div>
          </div>

          <div className="text-center max-w-[390px] mb-5">
            <h2 className="text-base sm:text-[17px] font-extrabold text-slate-900 leading-snug">
              Get <span className="text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-2">FREE daily calls</span> for
              NIFTY, BANKNIFTY & SENSEX
            </h2>
            <p className="text-slate-500 text-xs sm:text-[13px] mt-1.5 leading-relaxed font-normal">
              Join thousands of traders getting free premium analysis daily
            </p>
          </div>

          <div className="w-full max-w-[390px] bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-orange-200/80 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-bold text-orange-900 mb-5 shadow-xs">
            <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-bounce" />
            <span>
              <strong>{todayJoined.toLocaleString("en-IN")}</strong> people joined today — Limited FREE access!
            </span>
          </div>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[390px] relative overflow-hidden group bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-black text-base sm:text-[17.5px] py-4 px-6 rounded-2xl text-center shadow-xl animate-pulse-glow transition-all duration-200 flex items-center justify-center gap-2 mb-5 cursor-pointer border border-blue-400/30"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-80" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              <span>Join Free Telegram Channel</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 duration-200" />
            </span>
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-shine-continuous" />
          </a>

          <div className="w-full max-w-[390px] grid grid-cols-2 gap-2 mb-6 text-xs">
            <button className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100/80 border border-slate-200 text-slate-700 font-bold transition-all shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Preview Levels</span>
            </button>
            <button
              onClick={shareChannel}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100/80 border border-slate-200 text-slate-700 font-bold transition-all shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Share Channel</span>
            </button>
          </div>

          <div className="w-full max-w-[390px] space-y-2.5 mb-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3.5 shadow-xs hover:border-blue-200 hover:-translate-y-0.5 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50/90 text-lg flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-bold text-slate-900 leading-tight">{f.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong className="text-blue-900 font-bold">Verified Channel</strong> &bull; Free Forever &bull; No Spam
            </span>
          </div>

          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[390px] bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-[15px] py-3.5 px-5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2 mb-2"
          >
            <span>Join Now — It's 100% FREE</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <div className="text-blue-600 text-xs font-bold mb-6 flex items-center gap-1">
            <span>⏰ Limited time free access</span>
          </div>

          <div className="w-full max-w-[390px] text-center pt-5 border-t border-slate-200/90 text-xs text-slate-500 space-y-2.5">
            <p className="italic text-slate-600 font-medium text-[12.5px]">
              "Aaj mehnat kar lo, kal naam apna khud banega."
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              Telegram Id {"{"} For Advertising {"}"} -{" "}
              <a
                href="https://t.me/Adskillagency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:underline"
              >
                @Adskillagency
              </a>
            </div>
            <div className="pt-2">
              <button className="text-[10px] text-slate-400 hover:text-slate-600 underline transition-colors">
                Educational Purpose &amp; SEBI Risk Disclaimer
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 shrink-0 border border-slate-200">
            <img alt="Pankaj Bhardwaj" className="w-full h-full object-cover" src={AVATAR_URL} />
          </div>
          <div>
            <div className="font-extrabold text-xs text-slate-900 leading-tight">Pankaj Bhardwaj</div>
            <div className="text-[10px] text-emerald-600 font-bold">&#9679; Free Daily Levels</div>
          </div>
        </div>
        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 max-w-[200px] relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl text-center shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-1">
            <span>Join Free Channel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shine-continuous" />
        </a>
      </div>

      <JoinToast />
    </div>
  );
}
