import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Atom,
  Blocks,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleCheckBig,
  Clock3,
  Compass,
  Feather,
  FlaskConical,
  Gauge,
  GraduationCap,
  Hand,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Menu,
  MessagesSquare,
  MousePointerClick,
  NotebookPen,
  PenLine,
  Play,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  Sigma,
  Sparkles,
  SpellCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Type,
  Users,
  Video,
  WandSparkles,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

const ICONS: Record<string, LucideIcon> = {
  ArrowRight,
  Atom,
  Blocks,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleCheckBig,
  Clock3,
  Compass,
  Feather,
  FlaskConical,
  Gauge,
  GraduationCap,
  Hand,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Menu,
  MessagesSquare,
  MousePointerClick,
  NotebookPen,
  PenLine,
  Play,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  Sigma,
  Sparkles,
  SpellCheck,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Type,
  Users,
  Video,
  WandSparkles,
  Wifi,
  X,
};

export const SUBJECT_ICON: Record<string, LucideIcon> = {
  reading: BookOpen,
  math: Sigma,
  spelling: SpellCheck,
  science: FlaskConical,
  english: PenLine,
};

export function Icon({
  name,
  className,
  size,
  style,
}: {
  name: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const C = ICONS[name] ?? Sparkles;
  return <C className={className} size={size} strokeWidth={1.75} style={style} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* global UI state: modals + booking prefill + demo highlights         */
/* ------------------------------------------------------------------ */
type UIState = {
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
  storyOpen: boolean;
  setStoryOpen: (v: boolean) => void;
  bookingSubject: string | null;
  openBooking: (subject?: string) => void;
  clearBookingSubject: () => void;
  activeSubject: string;
  setActiveSubject: (id: string) => void;
};

const UICtx = createContext<UIState | null>(null);

export function useUI() {
  const ctx = useContext(UICtx);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function UIProvider({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [bookingSubject, setBookingSubject] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<string>("reading");

  const openBooking = useCallback((subject?: string) => {
    if (subject) setBookingSubject(subject);
    scrollToId("booking");
  }, []);

  const clearBookingSubject = useCallback(() => setBookingSubject(null), []);

  const value = useMemo(
    () => ({
      loginOpen,
      setLoginOpen,
      storyOpen,
      setStoryOpen,
      bookingSubject,
      openBooking,
      clearBookingSubject,
      activeSubject,
      setActiveSubject,
    }),
    [loginOpen, storyOpen, bookingSubject, openBooking, clearBookingSubject, activeSubject]
  );

  return <UICtx.Provider value={value}>{children}</UICtx.Provider>;
}

/* ------------------------------------------------------------------ */
/* scroll reveal                                                       */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  once = true,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[As] as typeof motion.div;
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.7, 0.25, 1] }}
    >
      {children}
    </M>
  );
}

/** Line-mask reveal: each line slides up from behind its own clip box. */
export function MaskLines({
  lines,
  className,
  delay = 0,
  id,
  as: As = "h2",
}: {
  lines: (string | ReactNode)[];
  className?: string;
  delay?: number;
  id?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px 0px -50px 0px" });
  const reduce = useReducedMotion();

  return (
    <As ref={ref as never} id={id} className={cx("mask-line", className)}>
      {lines.map((line, i) => (
        <span key={i}>
          <span
            style={
              reduce
                ? { transform: "none" }
                : {
                    transform: inView ? "translateY(0)" : "translateY(150%)",
                    transition: `transform 0.9s cubic-bezier(.16,.84,.3,1) ${delay + i * 0.1}s`,
                  }
            }
          >
            {line}
          </span>
        </span>
      ))}
    </As>
  );
}

/* ------------------------------------------------------------------ */
/* magnetic CTA                                                        */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 190, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 190, damping: 15, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      className={cx("inline-block", className)}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function ActionButton({
  children,
  variant = "primary",
  onClick,
  href,
  className,
  icon = true,
  magnetic = true,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: "primary" | "sun" | "ghost" | "onDark";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
}) {
  const cls = cx(
    "btn",
    variant === "primary" && "btn-primary",
    variant === "sun" && "btn-sun",
    variant === "ghost" && "btn-ghost",
    variant === "onDark" && "btn-onDark",
    className
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />}
    </>
  );
  const Comp: React.ElementType = href ? "a" : "button";
  const btn = (
    <Comp
      className={cls}
      onClick={onClick}
      href={href}
      aria-label={ariaLabel}
      type={href ? undefined : "button"}
      {...(href ? {} : {})}
    >
      {inner}
    </Comp>
  );
  return magnetic ? (
    <Magnetic strength={0.22} className="align-middle">
      {btn}
    </Magnetic>
  ) : (
    btn
  );
}

/* ------------------------------------------------------------------ */
/* section heading                                                     */
/* ------------------------------------------------------------------ */
export function Eyebrow({ children, tone = "#1160e8" }: { children: ReactNode; tone?: string }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2.5 text-ink-500">
      <span className="h-[7px] w-[7px] rotate-45 rounded-[2px]" style={{ background: tone }} />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  lines,
  lead,
  tone = "#1160e8",
  align = "left",
  right,
  dark = false,
}: {
  eyebrow: string;
  lines: (string | ReactNode)[];
  lead?: ReactNode;
  tone?: string;
  align?: "left" | "center";
  right?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-7 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center"
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto")}>
        <Reveal>
          <span
            className={cx("eyebrow inline-flex items-center gap-2.5", dark ? "text-ink-300" : "text-ink-500")}
            style={{ color: dark ? "#adcaea" : undefined }}
          >
            <span className="h-[7px] w-[7px] rotate-45 rounded-[2px]" style={{ background: tone }} />
            {eyebrow}
          </span>
        </Reveal>
        <MaskLines
          as="h2"
          delay={0.05}
          className={cx(
            "display mt-4 text-[2.15rem] leading-[1.02] sm:text-[2.9rem] lg:text-[3.4rem]",
            dark ? "text-white" : "text-ink-900"
          )}
          lines={lines}
        />
        {lead && (
          <Reveal delay={0.16}>
            <p className={cx("mt-5 text-[1.02rem] leading-relaxed", dark ? "text-ink-300" : "text-ink-600")}>
              {lead}
            </p>
          </Reveal>
        )}
      </div>
      {right && <Reveal delay={0.22}>{right}</Reveal>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* modal                                                               */
/* ------------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
  dark = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
  dark?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-[6px]" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: [0.16, 0.84, 0.3, 1] }}
            className={cx(
              "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[26px] shadow-[0_50px_90px_-30px_rgba(3,12,27,.7)] sm:rounded-[26px]",
              wide ? "max-w-4xl" : "max-w-lg",
              dark ? "bg-ink-900 text-white" : "bg-white text-ink-900"
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-7"
              style={{ borderColor: dark ? "rgba(173,202,234,.16)" : "rgba(16,44,83,.1)" }}
            >
              <div>
                <p className={cx("eyebrow", dark ? "text-ink-300" : "text-ink-500")}>{title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className={cx(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full transition",
                  dark ? "bg-white/10 hover:bg-white/20" : "bg-ink-100 hover:bg-ink-200"
                )}
              >
                <X size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-6 sm:px-7">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */
export function DemoNote({ dark = false, children = "Demo UI data" }: { dark?: boolean; children?: ReactNode }) {
  return (
    <span
      className={cx(
        "num inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]",
        dark ? "bg-white/10 text-ink-300" : "bg-ink-100 text-ink-500"
      )}
    >
      <span className={cx("h-1.5 w-1.5 rounded-full", dark ? "bg-sun-400" : "bg-mint-500")} />
      {children}
    </span>
  );
}

export function Pill({
  children,
  active,
  onClick,
  tone,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  tone?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "cursor-pointer rounded-full border px-3.5 py-2 text-[0.8rem] font-semibold transition-all duration-300",
        active
          ? "border-transparent text-white shadow-[0_10px_20px_-12px_rgba(10,30,60,.7)]"
          : "border-ink-900/12 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-ink-900/28",
        className
      )}
      style={active ? { background: tone ?? "#0a1e3c" } : undefined}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
      <div
        className="h-full rounded-full"
        style={{
          width: inView || reduce ? `${value}%` : "0%",
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          transition: reduce ? "none" : `width 1.15s cubic-bezier(.2,.8,.2,1) ${delay}s`,
        }}
      />
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { stiffness: 60, damping: 18 });
  const text = useTransform(sp, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const t = window.setTimeout(() => mv.set(to), 120);
    return () => window.clearTimeout(t);
  }, [inView, to, mv, reduce]);

  useMotionValueEvent(text, "change", (v) => {
    if (!reduce && ref.current) ref.current.textContent = v;
  });

  return (
    <span ref={ref} className="num">
      {reduce ? `${to}${suffix}` : "0"}
    </span>
  );
}

export { ICONS };
