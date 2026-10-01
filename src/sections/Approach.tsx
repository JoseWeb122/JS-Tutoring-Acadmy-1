import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CHECKLIST, HOW_STEPS, IMG } from "../data";
import { ActionButton, cx, Eyebrow, Icon, MaskLines, Reveal, SectionHead, scrollToId } from "../ui";

/* ================= personalized learning ================= */
export function Personalized() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [42, -42]);
  const railScale = useTransform(scrollYProgress, [0.12, 0.86], [0, 1]);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="about" ref={ref} className="relative overflow-clip bg-paper py-20 sm:py-28" aria-labelledby="personalized-title">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,198,88,.35),transparent_68%)] blur-[60px]" aria-hidden="true" />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* sticky visual */}
        <div className="lg:sticky lg:top-28">
          <motion.div style={{ y: reduce ? 0 : imgY }} className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_40px_80px_-46px_rgba(10,30,60,.55)]">
              <img
                src={IMG.personalized}
                alt="A tutor leaning in beside a young student, explaining a worksheet together"
                className={cx("h-[380px] w-full object-cover sm:h-[460px] lg:h-[520px]", !reduce && "anim-kenburns")}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="glass-dark rounded-2xl px-4 py-3">
                  <p className="eyebrow text-ink-300">Session in progress</p>
                  <p className="mt-1 font-display text-[1.05rem] font-bold text-white">
                    “Say what you did first. Then we'll try the tricky part.”
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -18, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="card absolute -right-3 top-6 hidden w-[190px] p-4 sm:block lg:-right-8"
            >
              <p className="eyebrow text-ink-500">Learning plan</p>
              <p className="mt-2 font-display text-[1.02rem] font-bold leading-tight">Focus: fraction models</p>
              <div className="mt-3 space-y-2">
                {[
                  { l: "Warm-up", w: 100, c: "#1fbd83" },
                  { l: "Model together", w: 72, c: "#2b7cf5" },
                  { l: "Independent", w: 40, c: "#ffb01f" },
                ].map((r) => (
                  <div key={r.l}>
                    <div className="flex justify-between text-[0.68rem] font-semibold text-ink-500">
                      <span>{r.l}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-100">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: r.c }}
                        initial={reduce ? { width: `${r.w}%` } : { width: 0 }}
                        whileInView={{ width: `${r.w}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* checklist */}
        <div>
          <Eyebrow tone="#1fbd83">Personalized by design</Eyebrow>
          <MaskLines
            as="h2"
            id="personalized-title"
            className="display mt-4 text-[2.1rem] leading-[1.03] sm:text-[2.7rem] lg:text-[3.05rem]"
            lines={["Every Student", "Learns Differently."]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-600">
              JS Tutoring Academy is designed around the idea that learning shouldn't be one-size-fits-all. Students
              can receive focused support based on their subjects, goals, strengths, and areas where they need
              additional help.
            </p>
          </Reveal>

          <div className="relative mt-10 pl-8">
            <div className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-[2px] bg-ink-100" aria-hidden="true" />
            <motion.div
              className="absolute left-[13px] top-2 w-[2px] origin-top bg-gradient-to-b from-cobalt-500 via-mint-500 to-sun-500"
              style={{ scaleY: railScale, height: "calc(100% - 16px)" }}
              aria-hidden="true"
            />
            <ul className="space-y-2.5">
              {CHECKLIST.map((c, i) => (
                <motion.li
                  key={c.title}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, x: 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.11, ease: [0.22, 0.7, 0.25, 1] }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  className={cx(
                    "group relative flex items-start gap-3.5 rounded-2xl border p-4 transition-all duration-400",
                    hover === i
                      ? "-translate-y-0.5 border-cobalt-500/40 bg-white shadow-[0_22px_40px_-30px_rgba(17,96,232,.7)]"
                      : "border-transparent bg-white/60"
                  )}
                >
                  <span className="absolute -left-[26px] top-1/2 grid h-[26px] w-[26px] -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-mint-500 text-white shadow">
                    <Icon name="CircleCheckBig" size={14} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[1.08rem] font-bold tracking-tight text-ink-900">
                      {c.title}
                    </span>
                    <span className="mt-1 block text-[0.9rem] leading-relaxed text-ink-500">{c.text}</span>
                  </span>
                  <span className="num ml-auto shrink-0 pt-1 text-[0.7rem] text-ink-300">{String(i + 1).padStart(2, "0")}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <ActionButton variant="primary" onClick={() => scrollToId("contact")}>
              Tell us about your student
            </ActionButton>
            <ActionButton variant="ghost" icon={false} onClick={() => scrollToId("how")} magnetic={false}>
              How it works
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= how it works — pinned stack ================= */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const active = useTransform(scrollYProgress, (v) => Math.min(3, Math.floor(v * 4.0001)));
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(active, "change", (v) => setIdx(v));

  return (
    <section id="how" className="relative overflow-clip bg-ink-950 py-20 text-white sm:py-24" aria-labelledby="how-title">
      <div className="dot-field pointer-events-none absolute inset-0 opacity-[0.22]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(60%_60%_at_20%_0%,rgba(17,96,232,.5),transparent_70%)]" aria-hidden="true" />

      <div className="wrap relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            dark
            eyebrow="How it works"
            tone="#59a0ff"
            lines={["Four Steps,", "One Clear Plan."]}
            lead="No maze of forms. A short conversation, a matched plan, then real teaching — with progress noted as it happens."
          />
          <ol className="mt-8 space-y-1" aria-label="Process steps">
            {HOW_STEPS.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`step-${s.num}`);
                    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-white/[0.06]"
                  aria-current={idx === i}
                >
                  <span className="num text-[0.72rem] text-ink-400">{s.num}</span>
                  <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/12">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-sun-400"
                      initial={{ width: 0 }}
                      animate={{ width: idx >= i ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </span>
                  <span className={cx("text-[0.8rem] font-semibold transition-colors", idx === i ? "text-white" : "text-ink-400")}>
                    {s.title.split(" ").slice(0, 3).join(" ")}…
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <ActionButton variant="sun" onClick={() => scrollToId("booking")}>
              Schedule a Learning Session
            </ActionButton>
          </div>
        </div>

        <div ref={ref} className="relative">
          {HOW_STEPS.map((s, i) => (
            <div
              key={s.num}
              id={`step-${s.num}`}
              className="sticky"
              style={{ top: `calc(6.5rem + ${i * 16}px)`, marginBottom: i === HOW_STEPS.length - 1 ? 0 : "1.25rem" }}
            >
              <motion.article
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="card overflow-hidden border-white/12 bg-ink-900/92 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="font-display text-[3.4rem] font-extrabold leading-none tracking-tighter text-white/12 sm:text-[4.4rem]">
                    {s.num}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sun-400 text-ink-950">
                    <Icon name={["MessagesSquare", "Compass", "Laptop", "TrendingUp"][i]} size={20} />
                  </span>
                </div>
                <h3 className="display mt-4 text-[1.5rem] leading-tight sm:text-[1.95rem]">{s.title}</h3>
                <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-ink-200/85">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[0.78rem] font-semibold text-ink-100"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                {i === 0 && (
                  <div className="mt-6 grid gap-2 rounded-2xl bg-white/[0.05] p-4 sm:grid-cols-2">
                    {["Which subjects feel shaky?", "What is the class currently covering?", "What would confidence look like?"].map((q, qi) => (
                      <span key={q} className="flex items-center gap-2 text-[0.82rem] text-ink-200">
                        <span className="num text-sun-400">Q{qi + 1}</span> {q}
                      </span>
                    ))}
                  </div>
                )}
                {i === 3 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-4">
                    {[
                      { l: "Reading", v: 78, c: "#2b7cf5" },
                      { l: "Math", v: 84, c: "#59a0ff" },
                      { l: "Science", v: 72, c: "#1fbd83" },
                      { l: "English", v: 81, c: "#ffc658" },
                    ].map((b) => (
                      <div key={b.l}>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[0.72rem] font-semibold text-ink-300">{b.l}</span>
                          <span className="num text-[0.72rem] text-white/80">{b.v}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/12">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: b.c }}
                            initial={reduce ? { width: `${b.v}%` } : { width: 0 }}
                            whileInView={{ width: `${b.v}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                    <p className="sm:col-span-4 -mb-1 text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">
                      Illustrative dashboard values
                    </p>
                  </div>
                )}
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
