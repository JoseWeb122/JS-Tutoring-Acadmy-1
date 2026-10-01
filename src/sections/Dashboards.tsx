import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BOOKING, DEMO_PROGRESS, DEMO_TREND, STUDENT_WEEK, SUBJECTS } from "../data";
import { ActionButton, cx, Counter, DemoNote, Eyebrow, Icon, MaskLines, ProgressBar, Reveal, SectionHead, scrollToId, useUI } from "../ui";

/* ================= parent dashboard ================= */
function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-ink-900/10 bg-white/95 px-3 py-2 shadow-xl backdrop-blur">
      <p className="num text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">{label}</p>
      <ul className="mt-1 space-y-0.5">
        {payload.map((p: any) => (
          <li key={p.dataKey} className="flex items-center gap-2 text-[0.76rem] font-semibold text-ink-800">
            <span className="h-2 w-2 rounded-full" style={{ background: p.stroke }} />
            {p.dataKey} <span className="num text-ink-400">{p.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ParentDashboard() {
  return (
    <section id="parents" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="parents-title">
      <div className="grid-paper absolute inset-0 opacity-[0.45]" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          eyebrow="For parents"
          tone="#1160e8"
          lines={["More Confidence for Parents.", "More Confidence for Students."]}
          lead="A single place to see what is happening this week: the plan, the progress, the practice and the tutor's notes — written in plain language."
          right={<DemoNote>Demo dashboard data</DemoNote>}
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-[26px] border border-ink-900/12 bg-gradient-to-b from-paper to-white shadow-[0_50px_90px_-52px_rgba(10,30,60,.55)]">
            {/* app chrome */}
            <div className="flex items-center gap-4 border-b border-ink-900/10 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-flame-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-sun-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint-400" />
              </div>
              <p className="num hidden truncate text-[0.7rem] text-ink-400 sm:block">academy.js / family-portal / alex</p>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full bg-mint-100 px-2.5 py-1 text-[0.68rem] font-bold text-mint-600 sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-500" /> Week 5 of term
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-900 text-[0.7rem] font-bold text-white">JR</span>
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[0.86fr_1.14fr]">
              {/* left column */}
              <div className="space-y-4">
                <div className="card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow text-ink-500">Student overview</p>
                      <h3 className="display mt-1.5 text-[1.55rem]">Alex Rivera</h3>
                      <p className="text-[0.84rem] font-semibold text-ink-500">Grade 6 ·demo profile·</p>
                    </div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cobalt-50 font-display text-[1.05rem] font-extrabold text-cobalt-600">
                      AR
                    </span>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { k: "Sessions this month", v: "Demo" },
                      { k: "Current focus", v: "Fractions" },
                      { k: "Tutor", v: "K. Tan" },
                      { k: "Format", v: "Online" },
                    ].map((d) => (
                      <div key={d.k} className="rounded-xl bg-paper px-3 py-2.5">
                        <dt className="text-[0.66rem] uppercase tracking-[0.12em] text-ink-400">{d.k}</dt>
                        <dd className="mt-0.5 text-[0.92rem] font-bold text-ink-900">{d.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="card relative overflow-hidden p-5">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cobalt-100/70 blur-xl" aria-hidden="true" />
                  <p className="eyebrow text-ink-500">Upcoming session</p>
                  <p className="mt-2 font-display text-[1.22rem] font-bold">Math · Fractions & problem solving</p>
                  <p className="num mt-1.5 text-[0.82rem] text-ink-500">Thu · 4:30 PM · 60 min · Online</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => scrollToId("booking")}
                      className="btn btn-primary min-h-[40px] px-4 py-2 text-[0.82rem]"
                    >
                      <Icon name="CalendarCheck" size={15} /> Change time
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToId("contact")}
                      className="btn btn-ghost min-h-[40px] px-4 py-2 text-[0.82rem]"
                    >
                      Message tutor
                    </button>
                  </div>
                </div>

                <div className="card p-5">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-ink-500">Current subject mix</p>
                    <span className="num text-[0.68rem] text-ink-400">Plan W5</span>
                  </div>
                  <ul className="mt-4 space-y-3.5">
                    {DEMO_PROGRESS.map((p, i) => (
                      <li key={p.subject}>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[0.88rem] font-bold text-ink-800">{p.subject}</span>
                          <span className="num text-[0.8rem] font-semibold" style={{ color: p.color }}>
                            <Counter to={p.value} suffix="%" />
                          </span>
                        </div>
                        <div className="mt-1.5">
                          <ProgressBar value={p.value} color={p.color} delay={i * 0.12} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* right column */}
              <div className="space-y-4">
                <div className="card p-5 sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="eyebrow text-ink-500">Learning progress</p>
                      <h3 className="display mt-1 text-[1.3rem]">Skill confidence across the term</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Reading", "Math", "Science", "English"].map((k, i) => (
                        <span key={k} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-[0.7rem] font-bold text-ink-600">
                          <span className="h-2 w-2 rounded-full" style={{ background: DEMO_PROGRESS[i].color }} />
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 h-[228px] w-full sm:h-[262px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DEMO_TREND} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
                        <defs>
                          {DEMO_PROGRESS.map((p) => (
                            <linearGradient key={p.subject} id={`g-${p.subject}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={p.color} stopOpacity={0.34} />
                              <stop offset="100%" stopColor={p.color} stopOpacity={0.02} />
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid stroke="#0a1e3c" strokeOpacity={0.08} vertical={false} />
                        <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#4a78ac", fontWeight: 600 }} axisLine={false} tickLine={false} />
                        <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: "#4a78ac" }} axisLine={false} tickLine={false} width={44} />
                        <Tooltip content={<ChartTip />} cursor={{ stroke: "#2b7cf5", strokeDasharray: "4 4", strokeOpacity: 0.5 }} />
                        {DEMO_PROGRESS.map((p) => (
                          <Area
                            key={p.subject}
                            type="monotone"
                            dataKey={p.subject}
                            stroke={p.color}
                            strokeWidth={2.4}
                            fill={`url(#g-${p.subject})`}
                            dot={{ r: 2.6, strokeWidth: 0, fill: p.color }}
                            activeDot={{ r: 5 }}
                            animationDuration={1100}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-[0.72rem] text-ink-400">
                    <Icon name="MousePointerClick" size={13} /> Hover the chart — values are illustrative demo data
                    for this concept.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="card p-5">
                    <p className="eyebrow text-ink-500">Recommended practice</p>
                    <ul className="mt-3.5 space-y-2.5">
                      {[
                        { t: "Fraction strip matching", m: "10 min · Math" },
                        { t: "Read-aloud: 2 chapters", m: "15 min · Reading" },
                        { t: "Pattern sort: -ight words", m: "8 min · Spelling" },
                      ].map((r) => (
                        <li key={r.t} className="flex items-start gap-2.5 rounded-xl bg-paper px-3 py-2.5">
                          <Icon name="CircleCheck" size={15} className="mt-0.5 shrink-0 text-cobalt-600" />
                          <span>
                            <span className="block text-[0.86rem] font-bold text-ink-900">{r.t}</span>
                            <span className="num block text-[0.7rem] text-ink-400">{r.m}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card relative overflow-hidden bg-ink-900 p-5 text-white">
                    <div className="pointer-events-none absolute inset-0 opacity-25 dot-field" aria-hidden="true" />
                    <p className="eyebrow relative text-ink-300">Tutor notes</p>
                    <Icon name="Quote" size={22} className="relative mt-3 text-sun-400" />
                    <p className="relative mt-2 text-[0.95rem] leading-relaxed text-ink-100">
                      “Alex explained a strategy out loud without prompting today — that's new. We'll keep building
                      independence and start checking own work.”
                    </p>
                    <p className="num relative mt-4 text-[0.72rem] text-ink-400">K. Tan · after Session 09</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= student dashboard ================= */
function Ring({ value, size = 132 }: { value: number; size?: number }) {
  const reduce = useReducedMotion();
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`Weekly goal ${value} percent complete`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="10" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? { strokeDashoffset: c * (1 - value / 100) } : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffc658" />
            <stop offset="55%" stopColor="#55dba6" />
            <stop offset="100%" stopColor="#59a0ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="font-display text-[1.75rem] font-extrabold leading-none">
          <Counter to={value} suffix="%" />
        </p>
        <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-ink-300">Weekly goal</p>
      </div>
    </div>
  );
}

const BADGES = [
  { name: "Math Explorer", icon: "Compass", tone: "#59a0ff", note: "5 strategy swaps" },
  { name: "Reading Builder", icon: "BookOpen", tone: "#ffc658", note: "3 chapters solo" },
  { name: "Science Thinker", icon: "Atom", tone: "#55dba6", note: "Asked why twice" },
  { name: "Spelling Sprinter", icon: "SpellCheck", tone: "#ff9a63", note: "New pattern locked" },
];

export function StudentDashboard() {
  const [tab, setTab] = useState<"today" | "practice" | "badges">("today");
  return (
    <section id="student" className="noise relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="student-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(17,96,232,.42),transparent_65%),radial-gradient(50%_50%_at_0%_100%,rgba(31,189,131,.22),transparent_65%)]" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow tone="#55dba6">Student experience</Eyebrow>
            <MaskLines
              as="h2"
              id="student-title"
              className="display mt-4 text-[2.1rem] leading-[1.03] sm:text-[2.7rem]"
              lines={["A Student View That", "Feels Like Progress,", "Not Homework."]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-200/90">
                Students see exactly what they are working on, what is next, and how far they have come. Small wins
                are named in words that describe effort — not competition.
              </p>
            </Reveal>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Today's lesson", "Practice streak", "Achievement badges"].map((t, i) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab((["today", "practice", "badges"] as const)[i])}
                  className={cx(
                    "rounded-full border px-3.5 py-2 text-[0.78rem] font-bold transition-all duration-300",
                    tab === (["today", "practice", "badges"] as const)[i]
                      ? "border-transparent bg-white text-ink-900"
                      : "border-white/18 text-ink-200 hover:bg-white/10"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="glass-dark relative overflow-hidden rounded-[26px] p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-[1.5rem] font-extrabold leading-tight">Good afternoon, Alex!</p>
                  <p className="text-[0.88rem] text-ink-300">Ready to keep learning?</p>
                </div>
                <DemoNote dark>Demo app preview</DemoNote>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-3"
                    >
                      {tab === "today" && (
                        <>
                          <StudentCard
                            tag="Today's lesson"
                            title="Math · Fractions & Problem Solving"
                            meta="45 min · starts 4:30 PM"
                            tone="#59a0ff"
                            icon="Sigma"
                            cta="Open lesson"
                          />
                          <StudentCard
                            tag="Next lesson"
                            title="Science · The Solar System"
                            meta="Tomorrow · 4:00 PM"
                            tone="#55dba6"
                            icon="Atom"
                            cta="Preview"
                          />
                          <StudentCard
                            tag="Practice"
                            title="English Vocabulary Set 4"
                            meta="8 words · 10 min"
                            tone="#ffc658"
                            icon="Feather"
                            cta="Start practice"
                          />
                        </>
                      )}
                      {tab === "practice" && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                          <p className="eyebrow text-ink-300">This week's minutes</p>
                          <div className="mt-5 flex h-36 items-end gap-3">
                            {STUDENT_WEEK.map((d, i) => (
                              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                                <motion.div
                                  className="w-full rounded-t-lg bg-gradient-to-t from-cobalt-600 to-cobalt-400"
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${(d.minutes / 50) * 100}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
                                />
                                <span className="num text-[0.66rem] text-ink-400">{d.day}</span>
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-[0.8rem] text-ink-300">
                            Practice is short and on purpose — the goal is steadiness, not volume.
                          </p>
                        </div>
                      )}
                      {tab === "badges" && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          {BADGES.map((b) => (
                            <div key={b.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-transform duration-300 hover:-translate-y-1">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: `${b.tone}22`, color: b.tone }}>
                                <Icon name={b.icon} size={19} />
                              </span>
                              <span>
                                <span className="block font-display text-[0.98rem] font-bold">{b.name}</span>
                                <span className="block text-[0.74rem] text-ink-300">{b.note}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Ring value={72} />
                  <p className="text-center text-[0.78rem] leading-snug text-ink-300">
                    4 of 5 planned sessions complete this week
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <p className="text-[0.78rem] text-ink-400">
                  Streaks celebrate consistency. Nothing here is ranked against another student.
                </p>
                <ActionButton variant="sun" className="min-h-[38px] py-1.5 text-[0.8rem]" onClick={() => scrollToId("demo")} magnetic={false} icon={false}>
                  Try a sample question
                </ActionButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StudentCard({
  tag,
  title,
  meta,
  tone,
  icon,
  cta,
}: {
  tag: string;
  title: string;
  meta: string;
  tone: string;
  icon: string;
  cta: string;
}) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-400 hover:border-white/25 hover:bg-white/[0.07]">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110" style={{ background: `${tone}1f`, color: tone }}>
        <Icon name={icon} size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block text-ink-400">{tag}</span>
        <span className="mt-0.5 block truncate font-display text-[1.02rem] font-bold">{title}</span>
        <span className="num block text-[0.72rem] text-ink-400">{meta}</span>
      </span>
      <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[0.74rem] font-bold text-white transition-colors group-hover:bg-white/20 sm:inline-flex">
        {cta} <Icon name="ArrowRight" size={13} />
      </span>
    </div>
  );
}

/* ================= booking flow ================= */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

const STEPS = ["Subject", "Grade", "Format", "Date & Time", "Confirm"];

export function Booking() {
  const { bookingSubject, clearBookingSubject } = useUI();
  const [step, setStep] = useState(0);
  const [subject, setSubject] = useState<string>("math");
  const [grade, setGrade] = useState<string>("Grade 6");
  const [format, setFormat] = useState<string>("online");
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
  }, []);
  const cells = useMemo(() => {
    const first = new Date(today.y, today.m, 1);
    const lead = first.getDay();
    const daysIn = new Date(today.y, today.m + 1, 0).getDate();
    const out: (number | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= daysIn; d++) out.push(d);
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [today]);

  // react to a subject chosen elsewhere on the page (subject spotlight, hero chips)
  useEffect(() => {
    if (!bookingSubject) return;
    setSubject(bookingSubject);
    setStep(1);
    setDone(false);
    const t = window.setTimeout(clearBookingSubject, 500);
    return () => window.clearTimeout(t);
  }, [bookingSubject, clearBookingSubject]);

  const canNext = [true, true, true, day !== null && time !== null, true][step];

  const subjectName = SUBJECTS.find((s) => s.id === subject)?.name ?? "Math";
  const formatName = BOOKING.formats.find((f) => f.id === format)?.name ?? "";
  const dateLabel = day !== null ? `${MONTHS[today.m]} ${day}, ${today.y}` : "Pick a day";

  return (
    <section id="booking" className="relative overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="booking-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(55%_100%_at_70%_0%,rgba(255,176,31,.22),transparent)]" aria-hidden="true" />
      <div className="wrap relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div className="lg:pt-6">
          <Eyebrow tone="#ff7a35">Scheduling</Eyebrow>
          <MaskLines
            as="h2"
            id="booking-title"
            className="display mt-4 text-[2.1rem] leading-[1.03] sm:text-[2.6rem]"
            lines={["Schedule a", "Learning Session."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-ink-600">
              A five-step flow built for busy parents. Everything you choose here updates instantly — in a live build
              it would check the academy's real availability.
            </p>
            <ul className="mt-7 space-y-3">
              {["Pick the subject and grade band", "Choose online or in-person", "Select a day and time that fits", "Send the request for confirmation"].map((t, i) => (
                <li key={t} className="flex items-center gap-3 text-[0.92rem] font-semibold text-ink-700">
                  <span className="num grid h-6 w-6 place-items-center rounded-full bg-white text-[0.7rem] text-ink-500 shadow-sm">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[0.76rem] font-semibold text-ink-500 shadow-sm">
              <Icon name="Sparkles" size={14} className="text-sun-500" />
              Prototype flow — no request is submitted to a real calendar.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="card overflow-hidden">
            {/* stepper */}
            <div className="border-b border-ink-900/10 bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStep(i)}
                    className="group flex min-w-0 flex-1 flex-col items-start gap-1.5 text-left"
                    aria-current={i === step}
                  >
                    <span className="relative h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cobalt-600 to-cobalt-400"
                        initial={false}
                        animate={{ width: i <= step && !done ? "100%" : "0%" }}
                        transition={{ duration: 0.45 }}
                      />
                    </span>
                    <span className={cx("truncate text-[0.68rem] font-bold uppercase tracking-[0.1em] transition-colors", i === step ? "text-cobalt-600" : "text-ink-400")}>
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                    <motion.span
                      initial={{ scale: 0.6, rotate: -12 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 210, damping: 14 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint-100 text-mint-600"
                    >
                      <Icon name="CircleCheckBig" size={30} />
                    </motion.span>
                    <h3 className="display mt-5 text-[1.55rem]">Request drafted</h3>
                    <p className="mx-auto mt-3 max-w-md text-[0.94rem] leading-relaxed text-ink-600">
                      In this prototype nothing is sent. A live build would create a pending request for{" "}
                      <strong className="font-bold text-ink-900">{subjectName}</strong>, {grade}, {formatName},{" "}
                      {dateLabel} at {time ?? "—"} for the academy to confirm.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <ActionButton variant="primary" icon={false} onClick={() => setDone(false)} magnetic={false}>
                        Edit the request
                      </ActionButton>
                      <ActionButton variant="ghost" icon={false} onClick={() => scrollToId("contact")} magnetic={false}>
                        Send details by form
                      </ActionButton>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    {step === 0 && (
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {BOOKING.subjects.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSubject(s.id)}
                            aria-pressed={subject === s.id}
                            className={cx(
                              "flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300",
                              subject === s.id ? "-translate-y-0.5 border-transparent bg-ink-900 text-white shadow-lg" : "border-ink-900/12 bg-white hover:-translate-y-0.5 hover:border-ink-900/28"
                            )}
                          >
                            <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: subject === s.id ? `${s.accent}33` : s.accent + "14", color: subject === s.id ? "#fff" : s.accent }}>
                              <Icon name={{ reading: "BookOpen", math: "Sigma", spelling: "SpellCheck", science: "FlaskConical", english: "PenLine" }[s.id] ?? "Sparkles"} size={17} />
                            </span>
                            <span>
                              <span className="block text-[0.95rem] font-bold">{s.name}</span>
                              <span className={cx("block text-[0.74rem]", subject === s.id ? "text-ink-300" : "text-ink-500")}>
                                {SUBJECTS.find((x) => x.id === s.id)?.grades}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <p className="text-[0.86rem] font-semibold text-ink-500">Which grade is your student in?</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {BOOKING.grades.map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setGrade(g)}
                              aria-pressed={grade === g}
                              className={cx(
                                "rounded-full border px-3.5 py-2 text-[0.82rem] font-bold transition-all duration-300",
                                grade === g ? "border-cobalt-600 bg-cobalt-50 text-cobalt-700" : "border-ink-900/12 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-ink-900/30"
                              )}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="grid gap-2.5 sm:grid-cols-3">
                        {BOOKING.formats.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFormat(f.id)}
                            aria-pressed={format === f.id}
                            className={cx(
                              "rounded-2xl border p-4 text-left transition-all duration-300",
                              format === f.id ? "border-sun-500 bg-sun-100/60 shadow-[0_18px_30px_-24px_rgba(255,176,31,.9)]" : "border-ink-900/12 bg-white hover:-translate-y-0.5 hover:border-ink-900/28"
                            )}
                          >
                            <Icon name={f.icon} size={19} className="text-ink-700" />
                            <span className="mt-2.5 block font-display text-[1rem] font-bold">{f.name}</span>
                            <span className="mt-1 block text-[0.78rem] leading-snug text-ink-500">{f.note}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid gap-6 sm:grid-cols-[1.05fr_0.95fr]">
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-display text-[1.05rem] font-bold">
                              {MONTHS[today.m]} {today.y}
                            </p>
                            <span className="num text-[0.7rem] text-ink-400">Tap a day</span>
                          </div>
                          <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                            {DOW.map((d, i) => (
                              <span key={i} className="num pb-1 text-[0.66rem] font-bold text-ink-400">
                                {d}
                              </span>
                            ))}
                            {cells.map((c, i) => {
                              const past = c !== null && c < today.d;
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  disabled={c === null || past}
                                  onClick={() => setDay(c)}
                                  aria-label={c ? `${MONTHS[today.m]} ${c}` : undefined}
                                  aria-pressed={day === c}
                                  className={cx(
                                    "relative grid aspect-square place-items-center rounded-xl text-[0.82rem] font-semibold transition-all duration-250",
                                    c === null && "invisible",
                                    past && "cursor-not-allowed text-ink-300/70 line-through",
                                    c !== null && !past && day === c && "bg-ink-900 text-white shadow-lg",
                                    c !== null && !past && day !== c && "bg-paper text-ink-700 hover:bg-cobalt-50 hover:text-cobalt-700"
                                  )}
                                >
                                  {c ?? ""}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="font-display text-[1.05rem] font-bold">Available times</p>
                          <p className="text-[0.76rem] text-ink-500">Illustrative slots for this prototype</p>
                          <div className="mt-3 space-y-2">
                            {BOOKING.times.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setTime(t)}
                                aria-pressed={time === t}
                                className={cx(
                                  "flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-[0.86rem] font-bold transition-all duration-300",
                                  time === t ? "border-mint-500 bg-mint-100/70 text-mint-600" : "border-ink-900/12 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-ink-900/28"
                                )}
                              >
                                <span className="num">{t}</span>
                                <Icon name={time === t ? "CircleCheckBig" : "Clock3"} size={15} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <p className="eyebrow text-ink-500">Review your request</p>
                        <dl className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {[
                            { k: "Subject", v: subjectName },
                            { k: "Grade", v: grade },
                            { k: "Format", v: formatName },
                            { k: "Preferred time", v: `${dateLabel} · ${time ?? "select a time"}` },
                          ].map((d) => (
                            <div key={d.k} className="rounded-2xl bg-paper px-4 py-3">
                              <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-ink-400">{d.k}</dt>
                              <dd className="mt-0.5 text-[0.98rem] font-bold text-ink-900">{d.v}</dd>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-dashed border-ink-900/16 p-4">
                          <Icon name="Hand" size={17} className="mt-0.5 shrink-0 text-cobalt-600" />
                          <p className="text-[0.84rem] leading-relaxed text-ink-600">
                            Times shown are not confirmed until the academy replies. We'll check your student's
                            routine and only suggest a rhythm that can realistically be kept.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!done && (
                <div className="mt-7 flex items-center justify-between gap-3 border-t border-ink-900/10 pt-5">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1.5 text-[0.84rem] font-bold text-ink-600 transition-colors hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Icon name="ChevronLeft" size={16} /> Back
                  </button>
                  <p className="num hidden text-[0.72rem] text-ink-400 sm:block">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => canNext && setStep((s) => s + 1)}
                      disabled={!canNext}
                      className={cx("btn btn-primary", !canNext && "cursor-not-allowed opacity-40")}
                    >
                      Continue <Icon name="ChevronRight" size={16} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => setDone(true)} className="btn btn-sun">
                      Confirm request <Icon name="CircleCheckBig" size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
