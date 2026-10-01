import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IMG, QUIZ } from "../data";
import { ActionButton, cx, DemoNote, Eyebrow, Icon, MaskLines, Modal, Reveal, SectionHead, scrollToId, useUI } from "../ui";

/* ================= interactive learning preview ================= */
function QuizArt({ kind, tone, solved }: { kind?: string; tone: string; solved: boolean }) {
  if (kind === "fraction")
    return (
      <svg viewBox="0 0 220 84" className="h-20 w-full" role="img" aria-label="Two bars divided into halves and quarters">
        <rect x="4" y="10" width="104" height="26" rx="6" fill={tone} opacity={solved ? 0.85 : 0.28} />
        <path d="M56 10v26" stroke="#fff" strokeWidth="2" opacity="0.7" />
        <rect x="112" y="10" width="104" height="26" rx="6" fill={tone} opacity="0.18" />
        {[1, 2, 3].map((i) => (
          <path key={i} d={`M${112 + i * 26} 10v26`} stroke="#fff" strokeWidth="2" opacity="0.6" />
        ))}
        <text x="4" y="58" className="num" fontSize="10" fill="#4a78ac">1/2</text>
        <text x="112" y="58" className="num" fontSize="10" fill="#4a78ac">1/4 each part</text>
        <motion.rect x="4" y="42" width="104" height="3" rx="1.5" fill={tone} initial={{ opacity: 0 }} animate={{ opacity: solved ? 1 : 0 }} />
      </svg>
    );
  if (kind === "books")
    return (
      <svg viewBox="0 0 220 84" className="h-20 w-full" role="img" aria-label="Stack of books">
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={26 + i * 8}
            y={58 - i * 18}
            width={140 - i * 12}
            height="14"
            rx="5"
            fill={i === 1 ? tone : "#c9dcf5"}
            initial={solved ? { x: 26 + i * 8 } : { x: 26 + i * 8 - 6 }}
            animate={{ x: 26 + i * 8, opacity: 0.9 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          />
        ))}
      </svg>
    );
  if (kind === "orbit")
    return (
      <svg viewBox="0 0 220 84" className="h-20 w-full" role="img" aria-label="Diagram of the Moon orbiting Earth">
        <circle cx="110" cy="42" r="30" fill="none" stroke={tone} strokeWidth="1.6" strokeDasharray="4 6" opacity="0.8" />
        <circle cx="110" cy="42" r="9" fill="#2b7cf5" opacity="0.85" />
        {[0, 90, 180, 270].map((a, i) => (
          <circle key={a} cx={110 + 30 * Math.cos((a * Math.PI) / 180)} cy={42 + 30 * Math.sin((a * Math.PI) / 180)} r="5" fill={i % 2 ? "#ffc658" : tone} opacity={solved ? 1 : 0.6} />
        ))}
        <circle cx="196" cy="42" r="7" fill="#ffb01f" opacity="0.9" />
      </svg>
    );
  if (kind === "sentence")
    return (
      <svg viewBox="0 0 220 84" className="h-20 w-full" role="img" aria-label="Lines of writing with a comma highlighted">
        <rect x="6" y="16" width="150" height="7" rx="3.5" fill="#c9dcf5" />
        <rect x="158" y="16" width="10" height="7" rx="3.5" fill={tone} />
        <rect x="6" y="36" width="196" height="7" rx="3.5" fill="#dce9fb" />
        <rect x="6" y="56" width="120" height="7" rx="3.5" fill="#eaf2ff" />
      </svg>
    );
  return (
    <svg viewBox="0 0 220 84" className="h-20 w-full" aria-hidden="true">
      <rect x="6" y="12" width="208" height="60" rx="10" fill={tone} opacity="0.12" />
    </svg>
  );
}

export function LearningDemo() {
  const subjects = Object.keys(QUIZ);
  const [subject, setSubject] = useState(subjects[0]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const reduce = useReducedMotion();

  const q = QUIZ[subject].questions[qi];
  const accent = QUIZ[subject].accent;
  const isRight = picked === q.answer;

  const reset = (s = subject, i = 0) => {
    setSubject(s);
    setQi(i);
    setPicked(null);
  };

  return (
    <section id="demo" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="demo-title">
      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-72 max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgba(43,124,245,.16),transparent)] blur-2xl" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          eyebrow="Try it here"
          tone="#ff7a35"
          lines={["See Learning", "in Action."]}
          lead="A miniature of what a session moment feels like: one clear question, one helpful nudge, and feedback that keeps students moving."
          right={<DemoNote>Sample questions</DemoNote>}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex flex-col gap-3">
            {subjects.map((s) => {
              const on = s === subject;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => reset(s)}
                  aria-pressed={on}
                  className={cx(
                    "group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-400",
                    on ? "border-transparent text-white shadow-[0_26px_46px_-30px_rgba(10,30,60,.8)]" : "border-ink-900/12 bg-white hover:-translate-y-0.5 hover:border-ink-900/28"
                  )}
                  style={on ? { background: QUIZ[s].accent } : undefined}
                >
                  <span className={cx("grid h-10 w-10 shrink-0 place-items-center rounded-xl", on ? "bg-white/18" : "bg-paper")} style={on ? undefined : { color: QUIZ[s].accent }}>
                    <Icon name={{ math: "Sigma", reading: "BookOpen", science: "FlaskConical", english: "PenLine" }[s] ?? "Sparkles"} size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[1.1rem] font-extrabold tracking-tight">{QUIZ[s].label}</span>
                    <span className={cx("block text-[0.78rem]", on ? "text-white/80" : "text-ink-500")}>
                      {QUIZ[s].questions.length} sample prompts
                    </span>
                  </span>
                  <Icon name="ChevronRight" size={17} className={cx("ml-auto shrink-0 transition-transform duration-300", on ? "translate-x-0" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} />
                </button>
              );
            })}
            <div className="mt-1 rounded-2xl bg-paper p-4">
              <p className="flex items-center justify-between text-[0.82rem] font-bold text-ink-700">
                Answers in this demo
                <span className="num rounded-full bg-white px-2.5 py-1 text-[0.78rem] text-cobalt-600 shadow-sm">
                  {correct} / {qi + (picked !== null ? 1 : 0)}
                </span>
              </p>
              <p className="mt-2 text-[0.78rem] leading-snug text-ink-500">
                Nothing is scored or stored — it is here so you can feel the interaction.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] border border-ink-900/10 bg-gradient-to-b from-white to-paper p-6 shadow-[0_40px_80px_-52px_rgba(10,30,60,.6)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <Eyebrow tone={accent}>
                {QUIZ[subject].label} · Question {qi + 1} of {QUIZ[subject].questions.length}
              </Eyebrow>
              <div className="flex gap-1.5">
                {QUIZ[subject].questions.map((_, i) => (
                  <span key={i} className={cx("h-1.5 w-6 rounded-full transition-colors", i <= qi ? "" : "bg-ink-100")} style={i <= qi ? { background: accent } : undefined} />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${subject}-${qi}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="display mt-5 text-[1.35rem] leading-snug sm:text-[1.7rem]">{q.prompt}</h3>
                <div className="mt-4 rounded-2xl bg-white p-3 shadow-[0_16px_34px_-30px_rgba(10,30,60,.7)]">
                  <QuizArt kind={q.visual} tone={accent} solved={picked !== null} />
                </div>

                <div className={cx("mt-5 grid gap-2.5", q.options.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                  {q.options.map((o, i) => {
                    const state = picked === null ? "idle" : i === q.answer ? "right" : i === picked ? "wrong" : "dim";
                    return (
                      <button
                        key={o}
                        type="button"
                        disabled={picked !== null}
                        onClick={() => {
                          setPicked(i);
                          if (i === q.answer) setCorrect((c) => c + 1);
                        }}
                        className={cx(
                          "relative overflow-hidden rounded-2xl border px-4 py-4 text-left font-display text-[1.05rem] font-bold transition-all duration-350",
                          state === "idle" && "border-ink-900/14 bg-white hover:-translate-y-1 hover:border-ink-900/34 hover:shadow-[0_18px_30px_-22px_rgba(10,30,60,.6)]",
                          state === "right" && "border-mint-500 bg-mint-100 text-mint-600",
                          state === "wrong" && "border-flame-500 bg-[#ffe9df] text-flame-500",
                          state === "dim" && "border-ink-900/10 bg-white/60 text-ink-400"
                        )}
                      >
                        {o}
                        {state === "right" && (
                          <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Icon name="CircleCheckBig" size={20} />
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 8, height: 0 }}
                      transition={{ duration: 0.45 }}
                      className="overflow-hidden"
                    >
                      <div className={cx("mt-5 flex flex-wrap items-center gap-4 rounded-2xl border p-4", isRight ? "border-mint-500/40 bg-mint-100/60" : "border-sun-500/40 bg-sun-100/60")}>
                        <span className={cx("grid h-11 w-11 shrink-0 place-items-center rounded-full text-white", isRight ? "bg-mint-500" : "bg-sun-500 text-ink-900")}>
                          <motion.span initial={reduce ? {} : { scale: 0.4, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 13 }}>
                            <Icon name={isRight ? "CircleCheckBig" : "Sparkles"} size={22} />
                          </motion.span>
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[1.15rem] font-extrabold">{isRight ? "Great thinking!" : "Let's try that again."}</p>
                          <p className="mt-0.5 text-[0.88rem] leading-relaxed text-ink-700">{q.why}</p>
                        </div>
                        <div className="flex gap-2">
                          {!isRight && (
                            <button type="button" onClick={() => setPicked(null)} className="btn btn-ghost min-h-[40px] px-3.5 py-2 text-[0.8rem]">
                              Try again
                            </button>
                          )}
                          {qi < QUIZ[subject].questions.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => {
                                setQi((n) => n + 1);
                                setPicked(null);
                              }}
                              className="btn btn-primary min-h-[40px] px-3.5 py-2 text-[0.8rem]"
                            >
                              Next question <Icon name="ArrowRight" size={15} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                const idx = subjects.indexOf(subject);
                                reset(subjects[(idx + 1) % subjects.length]);
                                setCorrect(0);
                              }}
                              className="btn btn-sun min-h-[40px] px-3.5 py-2 text-[0.8rem]"
                            >
                              Try {QUIZ[subjects[(subjects.indexOf(subject) + 1) % subjects.length]].label}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {picked === null && <p className="mt-5 text-[0.82rem] text-ink-500">Hint: {q.hint}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= AI assistant concept ================= */
type Msg = { from: "student" | "ai"; text: string };

const AI_SCRIPT: Record<string, string> = {
  "I don't understand fractions.":
    "Let's break it down step by step. A fraction is just a share of something whole. If a pizza is cut into 4 equal slices and you take 1, you have 1/4. Which part tells you how many slices there were in total?",
  "How do I remember spelling rules?":
    "Patterns beat memory. Try sorting words into families — like -ight (light, night, flight) — and say each one aloud. When a rule shows up in your own writing, it starts sticking.",
  "I freeze during tests.":
    "That is common, and it is a skill problem, not a smarts problem. Start every test with a 30-second scan, answer the easiest questions first, and write the formula before the numbers. Want to practise one together?",
  "Can you explain photosynthesis?":
    "Plants take sunlight, water and carbon dioxide and turn them into sugar for energy, releasing oxygen on the way. Think of it as the kitchen of a leaf. Which part should we slow down on — the inputs or why it matters?",
};

export function AIAssistant() {
  const [log, setLog] = useState<Msg[]>([
    { from: "student", text: "I don't understand fractions." },
    { from: "ai", text: "Let's break it down step by step." },
  ]);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [log, typing]);

  const ask = (text: string) => {
    setLog((l) => [...l, { from: "student", text }]);
    setTyping(true);
    window.setTimeout(
      () => {
        setLog((l) => [...l, { from: "ai", text: AI_SCRIPT[text] ?? "Good question — a live assistant would answer using your student's plan and session notes." }]);
        setTyping(false);
      },
      reduce ? 200 : 1100
    );
  };

  return (
    <section id="ai" className="noise relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="ai-title">
      <div
        className="anim-hue pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(17,96,232,.42),rgba(31,189,131,.22),rgba(255,176,31,.24),rgba(17,96,232,.4))] opacity-70"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:repeating-linear-gradient(115deg,#fff_0_1px,transparent_1px_58px)]" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow tone="#59a0ff">Platform concept</Eyebrow>
          <MaskLines
            as="h2"
            id="ai-title"
            className="display mt-4 text-[2.15rem] leading-[1.02] sm:text-[2.8rem] lg:text-[3.15rem]"
            lines={["Learning Support,", "Wherever They Are."]}
          />
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-200/90">
            A preview of how an always-available study helper could sit beside the academy's sessions: answering a
            stuck moment at 8pm, in the student's own words, and flagging the question for the tutor to pick up next
            time.
          </p>
          <ul className="mt-7 space-y-2.5">
            {[
              "Responds with the same method used in the lesson",
              "Encourages the next step instead of giving the answer",
              "Sends parents a plain-language summary of what was asked",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-[0.94rem] text-ink-100">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-500/22 text-mint-400">
                  <Icon name="CircleCheck" size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ActionButton variant="sun" onClick={() => scrollToId("contact")}>
              Ask about platform features
            </ActionButton>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 px-3.5 py-2 text-[0.76rem] font-semibold text-ink-200">
              <Icon name="Sparkles" size={14} className="text-sun-400" /> Visual concept only — no AI tutoring service is claimed
            </span>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="glass-dark relative overflow-hidden rounded-[26px] p-4 shadow-[0_50px_90px_-50px_rgba(0,0,0,.9)] sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cobalt-500 to-mint-500">
                  {!reduce && <span className="absolute inset-0 animate-ping rounded-xl bg-cobalt-400/30" />}
                  <Icon name="WandSparkles" size={17} className="relative text-white" />
                </span>
                <div>
                  <p className="font-display text-[0.98rem] font-bold leading-tight">Learning Assistant</p>
                  <p className="num text-[0.66rem] text-ink-400">concept preview · session context on</p>
                </div>
              </div>
              <DemoNote dark>Scripted demo</DemoNote>
            </div>

            <div ref={scroller} className="mt-4 max-h-[330px] space-y-3 overflow-y-auto pr-1">
              {log.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={cx("flex", m.from === "student" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cx(
                      "max-w-[86%] rounded-[18px] px-4 py-3 text-[0.9rem] leading-relaxed",
                      m.from === "student" ? "rounded-br-md bg-white/12 text-white" : "rounded-bl-md bg-gradient-to-br from-cobalt-600/85 to-cobalt-700/85 text-white"
                    )}
                  >
                    {m.from === "ai" && <p className="eyebrow mb-1 text-ink-200/70">Assistant</p>}
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2.5 w-fit">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 rounded-full bg-white/85" style={{ animation: "blink 1.1s infinite", animationDelay: `${d * 0.18}s` }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {Object.keys(AI_SCRIPT).slice(1).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => ask(k)}
                  disabled={typing}
                  className="rounded-full border border-white/16 bg-white/[0.05] px-3 py-1.5 text-[0.76rem] font-semibold text-ink-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 disabled:opacity-40"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= story / video ================= */
const STORY_CAPTIONS = [
  "Parent success story preview",
  "Student learning journey",
  "A concept film — placeholder content",
];

export function Story() {
  const { setStoryOpen } = useUI();
  const [cap, setCap] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setCap((c) => (c + 1) % STORY_CAPTIONS.length), 3400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="story" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="story-title">
      <div className="wrap relative">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow tone="#1160e8">The story</Eyebrow>
            <MaskLines
              as="h2"
              id="story-title"
              className="display mt-4 text-[2.15rem] leading-[1.02] sm:text-[2.9rem] lg:text-[3.3rem]"
              lines={["Every Small", "Breakthrough Matters."]}
            />
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-600 md:pb-2">
            The film area below is placeholder content for this concept. In production it would hold short,
            permissioned stories from real families.
          </p>
        </div>

        <Reveal delay={0.1}>
          <div className="group relative mt-10 overflow-hidden rounded-[28px] bg-ink-950 shadow-[0_50px_100px_-52px_rgba(10,30,60,.75)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={IMG.story}
                alt="A parent standing beside a teenager at a desk, both looking at a learning progress dashboard on a laptop"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05] anim-kenburns"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,19,42,.55),rgba(5,19,42,.2)_38%,rgba(5,19,42,.9))]" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 p-5 sm:p-8">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={cap}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="eyebrow text-sun-400"
                    >
                      {STORY_CAPTIONS[cap]}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-2 max-w-xl font-display text-[1.3rem] font-extrabold leading-tight text-white sm:text-[1.85rem]">
                    Three weeks in: the kitchen table, the workbook, and the moment it clicked.
                    <span className="mt-1.5 block text-[0.62em] font-semibold text-ink-300">
                      Demo scene — a slot for a real family story, filmed with permission
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStoryOpen(true)}
                  className="flex items-center gap-3 rounded-full bg-white/10 py-2 pl-2 pr-5 text-[0.88rem] font-bold text-white backdrop-blur transition-all duration-400 hover:bg-white/20"
                  aria-label="Open the concept film preview"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sun-400 text-ink-950">
                    <Icon name="Play" size={17} className="ml-0.5" />
                  </span>
                  Play preview
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <StoryModal />
    </section>
  );
}

function StoryModal() {
  const { storyOpen, setStoryOpen } = useUI();
  const [t, setT] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!storyOpen) {
      setT(0);
      return;
    }
    if (reduce) {
      setT(34);
      return;
    }
    const id = window.setInterval(() => setT((v) => (v + 1) % 100), 130);
    return () => window.clearInterval(id);
  }, [storyOpen, reduce]);

  const chapters = ["Opening: the 7pm homework battle", "Session 3: models before symbols", "Week 6: student explains it back"];

  return (
    <Modal open={storyOpen} onClose={() => setStoryOpen(false)} title="Concept film — demo area" wide dark>
      <div className="-mx-1">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={IMG.story} alt="" className="h-[240px] w-full object-cover sm:h-[380px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-[1.15rem] font-bold text-white sm:text-[1.4rem]">{chapters[Math.min(2, Math.floor(t / 34))]}</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-sun-400 transition-[width] duration-150 ease-linear" style={{ width: `${t}%` }} />
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="num text-[0.68rem] text-ink-300">00:{String(Math.floor((t / 100) * 59)).padStart(2, "0")} / 00:59</span>
              <span className="num text-[0.68rem] text-ink-300">Placeholder player · no media attached</span>
            </div>
          </div>
          <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/14 text-white backdrop-blur">
            <Icon name="Video" size={18} />
          </span>
        </div>
        <p className="mt-5 text-[0.92rem] leading-relaxed text-ink-200">
          This is the designated video slot for the concept build. Actual family stories, student footage and voice
         overs would be produced and permissioned before launch — nothing here represents a real testimonial.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <ActionButton variant="sun" className="min-h-[42px] py-2 text-[0.84rem]" onClick={() => scrollToId("contact")} magnetic={false}>
            Talk to the academy
          </ActionButton>
          <ActionButton variant="onDark" icon={false} className="min-h-[42px] py-2 text-[0.84rem]" onClick={() => setStoryOpen(false)} magnetic={false}>
            Close preview
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
}
