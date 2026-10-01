import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { IMG, NAV_LINKS, SUBJECTS, TRUST_ITEMS } from "../data";
import { ActionButton, cx, DemoNote, Icon, Modal, scrollToId, useUI } from "../ui";

/* ================= nav ================= */
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("top");
      }}
      className="group flex items-center gap-3"
      aria-label="JS Tutoring Academy — home"
    >
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[13px] bg-gradient-to-br from-cobalt-600 to-ink-900 shadow-[0_10px_22px_-12px_rgba(17,96,232,.9)]">
        <span className="font-display text-[1.02rem] font-extrabold tracking-tight text-white">JS</span>
        <span className="absolute -bottom-3 h-6 w-8 rotate-12 bg-sun-400/45 blur-[6px] transition-transform duration-500 group-hover:translate-x-6" />
      </span>
      <span className="leading-tight">
        <span className={cx("font-display block text-[1.02rem] font-extrabold tracking-[-0.03em]", light ? "text-white" : "text-ink-900")}>
          JS Tutoring
        </span>
        <span className={cx("eyebrow block text-[9px]", light ? "text-ink-300" : "text-ink-500")}>Academy</span>
      </span>
    </a>
  );
}

function LoginModal() {
  const { loginOpen, setLoginOpen } = useUI();
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (!loginOpen) setSent(false);
  }, [loginOpen]);

  return (
    <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Parent Portal — Concept Preview">
      <div className="pt-1">
        <p className="text-[0.95rem] leading-relaxed text-ink-600">
          This is a design prototype of the parent login for the JS Tutoring Academy platform. No account system is
          connected in this demo.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="login-email">
              Parent email
            </label>
            <input id="login-email" type="email" className="field" placeholder="you@family.com" data-autofocus />
          </div>
          <div>
            <label className="label" htmlFor="login-pass">
              Password
            </label>
            <input id="login-pass" type="password" className="field" placeholder="••••••••" />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-paper p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cobalt-50 text-cobalt-600">
            <Icon name="ShieldCheck" size={18} />
          </span>
          <p className="text-[0.8rem] leading-snug text-ink-500">
            In a live build, the portal would show session notes, progress, scheduling and tutor messages for your
            household only.
          </p>
        </div>
        <ActionButton
          className="mt-6 w-full"
          onClick={() => setSent(true)}
          icon={!sent}
          magnetic={false}
        >
          {sent ? "Demo preview — no data was sent" : "Sign in to dashboard"}
        </ActionButton>
        <button
          type="button"
          onClick={() => {
            setLoginOpen(false);
            scrollToId("booking");
          }}
          className="mt-4 w-full text-center text-[0.82rem] font-semibold text-ink-500 underline-offset-4 hover:text-cobalt-600 hover:underline"
        >
          New family? Request an intro call instead
        </button>
      </div>
    </Modal>
  );
}

export function Nav() {
  const scrolled = useScrolled();
  const { setLoginOpen } = useUI();
  const [open, setOpen] = useState(false);
  const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
  const active = useActiveSection(ids);
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  void progress;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDark = !scrolled && !open;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[90] transition-[background-color,box-shadow,border-color,padding] duration-500",
          scrolled
            ? "border-b border-ink-900/8 bg-white/78 py-2.5 shadow-[0_18px_40px_-34px_rgba(10,30,60,.6)] backdrop-blur-xl"
            : "border-b border-white/10 py-4"
        )}
      >
        <div className="wrap flex items-center justify-between gap-6">
          <Logo light={onDark} />

          <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  data-active={isActive}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(id);
                  }}
                  className={cx(
                    "link-underline text-[0.875rem] font-semibold transition-colors duration-300",
                    onDark ? "text-ink-100 hover:text-white" : "text-ink-700 hover:text-ink-900",
                    isActive && (onDark ? "text-white" : "text-cobalt-600")
                  )}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className={cx(
                "hidden rounded-full px-4 py-2.5 text-[0.85rem] font-bold transition-all duration-300 md:inline-flex",
                onDark ? "text-white hover:bg-white/12" : "text-ink-800 hover:bg-ink-100"
              )}
            >
              Parent Login
            </button>
            <ActionButton
              className={cx("hidden md:inline-flex", !scrolled && "btn-sun")}
              variant={scrolled ? "primary" : "sun"}
              onClick={() => scrollToId("contact")}
              magnetic={false}
            >
              Get Started
            </ActionButton>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cx(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors xl:hidden",
                onDark ? "border-white/25 text-white" : "border-ink-900/12 bg-white/70 text-ink-900"
              )}
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  className="absolute left-0 top-[2px] block h-[2px] w-5 rounded bg-current"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 top-[9px] block h-[2px] w-4 rounded bg-current"
                  animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                />
                <motion.span
                  className="absolute left-0 top-[16px] block h-[2px] w-5 rounded bg-current"
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
            </button>
          </div>
        </div>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-cobalt-500 via-cobalt-400 to-sun-400"
          style={{ scaleX: bar }}
          aria-hidden="true"
        />
      </header>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[95] bg-ink-950/70 backdrop-blur-[3px] xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              aria-label="Mobile"
              className="fixed right-0 top-0 z-[96] flex h-[100dvh] w-[min(400px,92vw)] flex-col overflow-y-auto bg-ink-900 px-6 pb-8 pt-24 xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 0.84, 0.3, 1] }}
            >
              <div className="dot-field pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <p className="eyebrow relative text-ink-300">Menu</p>
              <ul className="relative mt-5 space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.45 }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        window.setTimeout(() => scrollToId(l.href.replace("#", "")), 260);
                      }}
                      className="flex items-center justify-between border-b border-white/8 py-3.5 font-display text-[1.45rem] font-bold tracking-tight text-white/92 transition-colors hover:text-sun-400"
                    >
                      {l.label}
                      <Icon name="ArrowRight" size={17} className="text-ink-400" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="relative mt-7 flex flex-col gap-3">
                <ActionButton
                  variant="sun"
                  magnetic={false}
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => scrollToId("contact"), 240);
                  }}
                >
                  Get Started
                </ActionButton>
                <ActionButton
                  variant="onDark"
                  magnetic={false}
                  icon={false}
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => setLoginOpen(true), 300);
                  }}
                >
                  Parent Login
                </ActionButton>
              </div>
              <p className="relative mt-7 text-[0.8rem] leading-relaxed text-ink-300">
                Personalized support for growing minds — Reading, Math, Spelling, Science and English.
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <LoginModal />
    </>
  );
}

/* ================= hero ================= */
const FLOATERS = [
  { c: "π", x: "12%", y: "26%", s: "1.5rem", d: "0s", tone: "rgba(255,198,88,.5)" },
  { c: "√", x: "84%", y: "18%", s: "1.9rem", d: "1.4s", tone: "rgba(89,160,255,.45)" },
  { c: "+", x: "6%", y: "72%", s: "2.1rem", d: "2.6s", tone: "rgba(85,219,166,.4)" },
  { c: "×", x: "91%", y: "62%", s: "1.4rem", d: "0.8s", tone: "rgba(255,154,99,.45)" },
  { c: "÷", x: "46%", y: "8%", s: "1.3rem", d: "3.4s", tone: "rgba(173,202,234,.36)" },
  { c: "Aa", x: "70%", y: "85%", s: "1.2rem", d: "1.9s", tone: "rgba(255,240,205,.4)" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const bgX = useTransform(sx, (v) => v * 16);
  const bgY = useTransform(sy, (v) => v * 16);
  const fgX = useTransform(sx, (v) => -v * 26);
  const fgY = useTransform(sy, (v) => -v * 22);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, reduce ? 1 : 0.3]);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="noise relative isolate overflow-hidden bg-ink-950 pt-28 pb-16 text-white md:pt-32 lg:pb-24"
      onMouseMove={(e) => {
        if (reduce || !wrapRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        mx.set((e.clientX - r.width / 2) / r.width);
        my.set((e.clientY - r.height / 2) / r.height);
      }}
      aria-label="JS Tutoring Academy introduction"
    >
      {/* ambient layers */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ x: bgX, y: bgY }} aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_-10%,rgba(17,96,232,.55),transparent_62%),radial-gradient(70%_60%_at_8%_96%,rgba(255,122,53,.24),transparent_60%)]" />
        <div className="grid-paper absolute inset-0 opacity-[0.16]" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-mint-500/12 blur-[80px]" />
        <div className="absolute right-[16%] top-[12%] h-64 w-64 rounded-full bg-sun-400/14 blur-[90px]" />
        {FLOATERS.map((f) => (
          <span
            key={f.c}
            className="anim-float absolute select-none font-display font-bold"
            style={{ left: f.x, top: f.y, fontSize: f.s, color: f.tone, animationDelay: f.d }}
          >
            {f.c}
          </span>
        ))}
      </motion.div>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* copy */}
        <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10">
          <motion.span
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-wide text-ink-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-mint-400 opacity-90" />
              {!reduce && <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-mint-400" />}
            </span>
            Personalized support for growing minds
          </motion.span>

          <h1 className="display mt-6 text-[2.6rem] leading-[0.96] sm:text-[3.5rem] lg:text-[4.15rem]">
            {["Helping K–12 Students", "Learn With", "Confidence."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 1 } : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.11, ease: [0.16, 0.84, 0.3, 1] }}
                >
                  {i === 2 ? (
                    <span className="relative inline-block">
                      {line}
                      <svg
                        className="absolute -bottom-2 left-0 h-3 w-full text-sun-400"
                        viewBox="0 0 300 12"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M2 9C58 3 132 2 196 6c34 2 66 3 102-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.1, delay: 0.75, ease: "easeInOut" }}
                        />
                      </svg>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink-200/90"
          >
            Personalized tutoring in Reading, Math, Spelling, Science, and English — designed to help every student
            build stronger skills, understand difficult concepts, and enjoy learning.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ActionButton variant="sun" onClick={() => scrollToId("programs")}>
              Find the Right Program
            </ActionButton>
            <ActionButton variant="onDark" icon={false} onClick={() => scrollToId("subjects")}>
              Explore Subjects
            </ActionButton>
            <button
              type="button"
              onClick={() => scrollToId("parents")}
              className="group inline-flex items-center gap-2 px-1 text-[0.85rem] font-semibold text-ink-200/85 transition-colors hover:text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/22 transition-transform duration-300 group-hover:scale-110">
                <Icon name="Gauge" size={15} />
              </span>
              See the parent dashboard
            </button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  scrollToId("subjects");
                }}
                className="group flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-300 transition-colors hover:text-white"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                  style={{ background: s.accent }}
                />
                {s.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* visual */}
        <motion.div style={{ y: imgY, x: fgX, opacity: fade }} className="relative min-h-[420px] lg:min-h-[560px]">
          <motion.div
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 0.84, 0.3, 1] }}
            className="relative z-10 overflow-hidden rounded-[28px] border border-white/15 shadow-[0_50px_90px_-40px_rgba(0,0,0,.85)]"
          >
            <img
              src={IMG.hero}
              alt="Two students learning at a desk with a tutor joining live on a tablet screen"
              className="anim-kenburns h-[340px] w-full object-cover sm:h-[440px] lg:h-[520px]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
              <div>
                <p className="eyebrow text-ink-200/80">Live session</p>
                <p className="font-display text-[1.15rem] font-bold tracking-tight">Fractions, explained twice</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-white/12 px-2.5 py-1.5 text-[0.68rem] font-bold backdrop-blur">
                <Icon name="Wifi" size={13} /> Online
              </span>
            </div>
          </motion.div>

          {/* floating progress cards */}
          <motion.div
            style={{ x: fgX, y: fgY }}
            className="pointer-events-none absolute inset-0"
            aria-hidden="false"
          >
            <HeroCard className="left-1 top-2 sm:-left-6 lg:-left-12" delay={0.7} label="Math progress" value="+24%" tone="#59a0ff" bar={72} />
            <HeroCard
              className="right-1 top-[42%] sm:-right-4 lg:-right-8"
              delay={0.95}
              label="Reading level"
              value="Improved"
              tone="#55dba6"
              bar={58}
              icon="BookOpen"
            />
            <HeroCard
              className="bottom-12 right-1 max-sm:hidden sm:-bottom-3 sm:left-6 lg:-left-8"
              delay={1.2}
              label="Science"
              value="92%"
              tone="#ffc658"
              bar={92}
              icon="Atom"
            />
            <HeroCard
              className="-bottom-5 right-2 max-sm:hidden sm:right-4 lg:right-0"
              delay={1.4}
              label="English"
              value="On Track"
              tone="#ff9a63"
              bar={66}
              icon="PenLine"
            />
          </motion.div>

          <div className="pointer-events-none absolute -bottom-8 right-0 hidden lg:block">
            <DemoNote dark>Sample dashboard data</DemoNote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCard({
  className,
  label,
  value,
  tone,
  bar,
  icon,
  delay,
}: {
  className?: string;
  label: string;
  value: string;
  tone: string;
  bar: number;
  icon?: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 0.84, 0.3, 1] }}
      className={cx("absolute", className)}
    >
      <div className="anim-float-s" style={{ animationDelay: `${delay}s` }}>
        <div className="glass-dark flex w-[164px] items-center gap-3 rounded-[18px] px-3.5 py-3 shadow-[0_22px_40px_-22px_rgba(0,0,0,.9)]">
          {icon && (
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
              style={{ background: `${tone}22`, color: tone }}
            >
              <Icon name={icon} size={17} />
            </span>
          )}
          <div className="min-w-0">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-ink-300">{label}</p>
            <p className="font-display text-[1rem] font-bold leading-tight text-white">{value}</p>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/12">
              <motion.div
                className="h-full rounded-full"
                style={{ background: tone }}
                initial={reduce ? { width: `${bar}%` } : { width: 0 }}
                animate={{ width: `${bar}%` }}
                transition={{ duration: 1.1, delay: delay + 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= trust bar ================= */
export function TrustBar() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div className="relative z-20 border-y border-ink-900/8 bg-white">
      <div className="wrap flex items-stretch gap-6 py-3.5">
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Icon name="CircleCheckBig" size={16} className="text-mint-600" />
          <span className="eyebrow text-ink-500">What families come for</span>
        </div>
        <div className="marquee-mask relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-9">
            {items.map((t, i) => (
              <span key={`${t.text}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap text-[0.86rem] font-bold text-ink-700">
                <Icon name={t.icon} size={17} className="text-cobalt-600" />
                {t.text}
                <span className="ml-4 h-1 w-1 rounded-full bg-ink-300" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
