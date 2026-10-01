import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { IMG, STAGES, SUBJECTS, type SubjectKey } from "../data";
import { ActionButton, cx, Eyebrow, Icon, MaskLines, Reveal, SectionHead, SUBJECT_ICON, scrollToId, useUI } from "../ui";

/* ============ cinematic motion band (animated “video” surface) ============ */
const SCENES = [
  "A student untangles a hard problem",
  "A tutor re-explains it a second way",
  "Books open beside a shared screen",
  "Fractions become visible, not memorised",
  "A science idea finally clicks",
  "A parent reads the progress note",
];

export function MotionBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40]);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setScene((s) => (s + 1) % SCENES.length), 3200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section ref={ref} className="noise relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32" aria-labelledby="band-title">
      <motion.div className="absolute inset-0" style={{ scale: reduce ? 1 : imgScale, y: imgY }} aria-hidden="true">
        <img
          src={IMG.motionBand}
          alt=""
          className={cx("h-full w-full object-cover", !reduce && "anim-kenburns")}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,#04101f_6%,rgba(5,19,42,.88)_42%,rgba(5,19,42,.35)_78%,rgba(5,19,42,.6))]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />

      {/* film strip */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] items-center xl:flex" aria-hidden="true">
        <div className="flex flex-col gap-2.5 opacity-70">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative h-24 w-40 overflow-hidden rounded-lg border border-white/15"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <img
                src={IMG.motionBand}
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: `${20 + i * 22}% ${30 + i * 12}%`, filter: `saturate(${1 + i * 0.1})` }}
                loading="lazy"
              />
              <span className="num absolute bottom-1 left-2 text-[9px] tracking-widest text-white/80">
                00:0{i + 2}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="wrap relative">
        <div className="max-w-2xl">
          <Eyebrow tone="#ffc658">A day of learning here</Eyebrow>
          <MaskLines
            as="h2"
            id="band-title"
            className="display mt-5 text-[2.3rem] leading-[1] sm:text-[3.2rem] lg:text-[3.8rem]"
            lines={["Learning Should", "Feel Personal."]}
          />
          <p className="mt-6 max-w-xl text-[1.03rem] leading-relaxed text-ink-200/90">
            Small steps, taught clearly, checked often. The same curriculum — paced to the student in front of you.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => scrollToId("story")}
              className="group flex items-center gap-3.5 text-left"
              aria-label="Play the concept story film"
            >
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-sun-400 text-ink-950 transition-transform duration-500 group-hover:scale-110">
                {!reduce && <span className="absolute inset-0 rounded-full" style={{ animation: "ring-pulse 2.6s ease-out infinite" }} />}
                <Icon name="Play" size={19} className="relative ml-0.5" />
              </span>
              <span>
                <span className="eyebrow block text-ink-300">Concept film</span>
                <span className="font-display text-[1.02rem] font-bold">Watch the learning story</span>
              </span>
            </button>

            <div className="glass-dark flex h-[54px] min-w-[300px] items-center gap-3 rounded-full px-4">
              <span className="h-2 w-2 shrink-0 rounded-full bg-flame-400" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene}
                  initial={{ opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -9 }}
                  transition={{ duration: 0.4 }}
                  className="truncate text-[0.85rem] font-semibold text-ink-100"
                >
                  {SCENES[scene]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ subjects ============ */
export function SubjectsSection() {
  const { activeSubject, setActiveSubject } = useUI();
  const active = SUBJECTS.find((s) => s.id === activeSubject) ?? SUBJECTS[0];
  const ActiveIcon = SUBJECT_ICON[active.id];

  const set = (id: SubjectKey) => setActiveSubject(id);

  return (
    <section id="subjects" className="relative bg-paper py-20 sm:py-28" aria-labelledby="subjects-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(43,124,245,.12),transparent)]" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          eyebrow="Five core subjects"
          tone="#1160e8"
          lines={["Build Stronger Skills,", "One Subject at a Time."]}
          lead="Choose a subject to see how we teach it — the focus areas, the session rhythm and what students leave able to do. Tap any card; everything below updates."
          right={
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <span className="text-[0.78rem] font-semibold text-ink-500">Currently viewing</span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[0.98rem] font-bold text-white"
                style={{ background: active.accent }}
              >
                <ActiveIcon size={16} strokeWidth={2} aria-hidden="true" /> {active.name}
              </span>
            </div>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SUBJECTS.map((s, i) => {
            const IconC = SUBJECT_ICON[s.id];
            const isActive = s.id === activeSubject;
            const span = i < 3 ? "lg:col-span-2" : "lg:col-span-3";
            return (
              <Reveal key={s.id} delay={i * 0.08} className={cx(span, i === 4 && "md:col-span-2")}>
                <button
                  type="button"
                  onClick={() => set(s.id as SubjectKey)}
                  aria-pressed={isActive}
                  className={cx(
                    "card card-lift group relative block w-full overflow-hidden p-0 text-left",
                    isActive && "shadow-[0_28px_60px_-30px_rgba(10,30,60,.55)]"
                  )}
                  style={isActive ? { borderColor: `${s.accent}66` } : undefined}
                >
                  <span className="relative block h-40 overflow-hidden sm:h-44">
                    <img
                      src={s.image}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.09]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-white shadow-lg backdrop-blur-sm" style={{ background: s.accent }}>
                      <IconC size={19} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-3 left-4 font-display text-[1.3rem] font-extrabold uppercase tracking-[-0.02em] text-white">
                      {s.label}
                    </span>
                    <span
                      className={cx(
                        "absolute bottom-0 left-0 h-[3px] bg-white transition-all duration-500",
                        isActive ? "w-full opacity-90" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60"
                      )}
                    />
                  </span>
                  <span className="block p-5">
                    <span className="block text-[0.9rem] leading-relaxed text-ink-600">{s.blurb}</span>
                    <span className="mt-4 flex flex-wrap items-center gap-1.5">
                      {s.skills.slice(0, 3).map((k) => (
                        <span key={k} className="rounded-full bg-paper-2 px-2.5 py-1 text-[0.68rem] font-semibold text-ink-600">
                          {k}
                        </span>
                      ))}
                    </span>
                    <span
                      className="mt-5 inline-flex items-center gap-2 text-[0.82rem] font-bold transition-colors"
                      style={{ color: isActive ? s.accent : "#275a94" }}
                    >
                      {isActive ? "Viewing this subject" : "Explore Subject"}
                      <Icon name="ArrowRight" size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* subject spotlight */}
        <div className="mt-6 overflow-hidden rounded-[26px] border border-ink-900/10 bg-white shadow-[0_30px_70px_-46px_rgba(10,30,60,.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 0.7, 0.25, 1] }}
              className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div>
                <Eyebrow tone={active.accent}>Subject spotlight · {active.grades}</Eyebrow>
                <h3 className="display mt-3 text-[1.9rem] leading-tight sm:text-[2.3rem]" style={{ color: active.accent }}>
                  {active.name} at JS Tutoring Academy
                </h3>
                <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-600">{active.detail}</p>
                <ul className="mt-6 space-y-3">
                  {active.focus.map((f, i) => (
                    <motion.li
                      key={f.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.09, duration: 0.5 }}
                      className="flex gap-3.5"
                    >
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: active.accent }}>
                        <Icon name="CircleCheck" size={14} />
                      </span>
                      <span>
                        <span className="block text-[0.92rem] font-bold text-ink-900">{f.title}</span>
                        <span className="block text-[0.88rem] leading-relaxed text-ink-500">{f.text}</span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ActionButton variant="primary" onClick={() => scrollToId("booking")} magnetic={false}>
                    Book a {active.name} session
                  </ActionButton>
                  <ActionButton variant="ghost" icon={false} onClick={() => scrollToId("contact")} magnetic={false}>
                    Ask about {active.name}
                  </ActionButton>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[22px] bg-ink-950 p-6">
                <div className="dot-field absolute inset-0 opacity-25" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-ink-300">Skills we build</p>
                    <span className="num text-[0.7rem] text-ink-400">05 / core areas</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {active.skills.map((k, i) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.45 }}
                        className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[0.86rem] font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                      >
                        {k}
                        <span className="num text-[0.68rem] text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============ K-12 learning path ============ */
function StageArt({ id, tone }: { id: string; tone: string }) {
  if (id === "elementary")
    return (
      <svg viewBox="0 0 160 96" className="h-24 w-full" role="img" aria-label="Illustration of stacked building blocks and a book">
        <rect x="14" y="58" width="26" height="26" rx="6" fill={tone} opacity="0.9" />
        <rect x="46" y="42" width="26" height="26" rx="6" fill={tone} opacity="0.55" />
        <rect x="78" y="58" width="26" height="26" rx="6" fill="#1160e8" opacity="0.75" />
        <path d="M118 84c10-6 20-6 30 0V64c-10-6-20-6-30 0z" fill="#2b7cf5" opacity="0.5" />
        <path d="M133 64v20" stroke="#0a1e3c" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="27" cy="71" r="3.4" fill="#fff" opacity="0.85" />
        <circle cx="59" cy="55" r="3.4" fill="#fff" opacity="0.85" />
      </svg>
    );
  if (id === "middle")
    return (
      <svg viewBox="0 0 160 96" className="h-24 w-full" role="img" aria-label="Illustration of a rising progress graph and a flask">
        <path d="M14 80h132" stroke="#0a1e3c" strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M14 60h132M14 40h132" stroke="#0a1e3c" strokeOpacity="0.09" strokeWidth="1.5" />
        <motion.path
          d="M18 74L52 58l26-14 26-20 28-8"
          fill="none"
          stroke={tone}
          strokeWidth="3.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
        <circle cx="146" cy="32" r="4.6" fill={tone} />
        <path d="M96 88h30l-8-22a9 9 0 1 0-14 0z" fill="#1fbd83" opacity="0.28" />
      </svg>
    );
  return (
    <svg viewBox="0 0 160 96" className="h-24 w-full" role="img" aria-label="Illustration of an atom orbit and written lines">
      <g transform="translate(46 48)">
        <ellipse rx="30" ry="12" fill="none" stroke={tone} strokeWidth="2" opacity="0.7" />
        <ellipse rx="30" ry="12" fill="none" stroke="#2b7cf5" strokeWidth="2" opacity="0.55" transform="rotate(60)" />
        <ellipse rx="30" ry="12" fill="none" stroke="#ffb01f" strokeWidth="2" opacity="0.5" transform="rotate(-60)" />
        <circle r="4.4" fill={tone} />
      </g>
      <rect x="94" y="26" width="52" height="5" rx="2.5" fill="#0a1e3c" opacity="0.2" />
      <rect x="94" y="40" width="40" height="5" rx="2.5" fill="#0a1e3c" opacity="0.16" />
      <rect x="94" y="54" width="48" height="5" rx="2.5" fill="#0a1e3c" opacity="0.12" />
      <rect x="94" y="68" width="30" height="5" rx="2.5" fill={tone} opacity="0.55" />
    </svg>
  );
}

export function LearningPath() {
  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: false, margin: "-40% 0px -30% 0px" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setActiveIdx(i);
          }
        });
      },
      { rootMargin: "-45% 0px -40% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="path" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="path-title">
      <div className="grid-paper absolute inset-0 opacity-[0.5]" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          eyebrow="The K–12 learning path"
          tone="#ff7a35"
          lines={["Support That Grows", "With Your Child."]}
          lead="What a Year 2 reader needs and what a Grade 11 science student needs are not the same conversation. The plan adapts with age, subject and academic need — the continuity stays with the family."
        />

        <div ref={lineRef} className="relative mt-14">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-6 top-0 h-full w-[2px] md:left-0 md:top-[54px] md:h-[2px] md:w-full" aria-hidden="true">
            <div className="h-full w-full bg-ink-100" />
            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-top-left bg-gradient-to-b from-sun-400 via-cobalt-500 to-mint-500 md:origin-left md:bg-gradient-to-r"
              initial={{ scaleY: 0, scaleX: 1 }}
              animate={
                lineInView
                  ? { scaleY: [0, 1], scaleX: [0, 1] }
                  : { scaleY: 0 }
              }
              transition={{ duration: 1.4, ease: "easeInOut" }}
              style={{ transformBox: "border-box" }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            {STAGES.map((s, i) => {
              const on = activeIdx === i;
              return (
                <div
                  key={s.id}
                  data-i={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="relative pl-16 md:pl-0"
                >
                  <span
                    className={cx(
                      "absolute left-2.5 top-2 grid h-8 w-8 place-items-center rounded-full border-4 border-white transition-all duration-500 md:relative md:top-0 md:mb-6",
                      on ? "scale-110" : ""
                    )}
                    style={{ background: on ? s.tone : "#e6eefa" }}
                  >
                    <span className={cx("num text-[0.72rem] font-bold", on ? "text-white" : "text-ink-400")}>0{i + 1}</span>
                  </span>

                  <motion.article
                    animate={on ? { y: 0, opacity: 1 } : { y: 6, opacity: 0.72 }}
                    transition={{ duration: 0.55 }}
                    className={cx(
                      "card h-full p-6 transition-shadow duration-500",
                      on && "shadow-[0_34px_70px_-40px_rgba(10,30,60,.6)]"
                    )}
                    style={on ? { borderColor: `${s.tone}66` } : undefined}
                  >
                    <div className="rounded-2xl bg-paper p-3">
                      <StageArt id={s.id} tone={s.tone} />
                    </div>
                    <p className="eyebrow mt-5" style={{ color: s.tone }}>
                      {s.eyebrow}
                    </p>
                    <h3 className="display mt-2 text-[1.7rem]">{s.title}</h3>
                    <p className="num mt-1 text-[0.76rem] font-semibold text-ink-400">{s.grades}</p>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-600">{s.lead}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-dashed border-ink-900/12 pt-4">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[0.86rem] leading-snug text-ink-700">
                          <Icon name="CircleCheckBig" size={15} className="mt-0.5 shrink-0" style={{ color: s.tone }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[22px] bg-ink-900 p-6 text-white sm:flex-row sm:items-center">
            <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-200">
              Because one academy follows the full journey, the plan can carry context forward — what worked in Grade
              4 informs how we teach Grade 9.
            </p>
            <ActionButton variant="sun" onClick={() => scrollToId("programs")} magnetic={false}>
              View programs by stage
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
