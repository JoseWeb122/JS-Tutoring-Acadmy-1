import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IMG, PROGRAMS, TUTORS, WHY } from "../data";
import { ActionButton, cx, DemoNote, Icon, Modal, Reveal, SectionHead, scrollToId } from "../ui";

/* ================= programs ================= */
export function Programs() {
  const [open, setOpen] = useState<string | null>(PROGRAMS[0].id);

  return (
    <section id="programs" className="relative overflow-hidden bg-white py-20 sm:py-28" aria-labelledby="programs-title">
      <div className="pointer-events-none absolute inset-0 grid-paper opacity-40" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          eyebrow="Programs"
          tone="#1160e8"
          lines={["Choose the Shape of", "the Support."]}
          lead="Six ways families work with the academy — from foundations that run all year to short cycles aimed at one stubborn skill. Explore any program to see how it runs."
        />

        <div className="mt-12 border-t border-ink-900/12">
          {PROGRAMS.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <Reveal key={p.id} delay={i * 0.05}>
                <div
                  className={cx(
                    "group relative border-b border-ink-900/12 transition-colors duration-500",
                    isOpen ? "bg-paper" : "hover:bg-paper/60"
                  )}
                >
                  <span
                    className={cx(
                      "absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-cobalt-500 to-sun-400 transition-transform duration-500",
                      isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    )}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-4 py-5 text-left sm:gap-6 sm:px-6 sm:py-6"
                  >
                    <span className="num shrink-0 text-[0.72rem] font-semibold text-ink-400">0{i + 1}</span>
                    <span
                      className={cx(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-all duration-500",
                        isOpen ? "bg-ink-900 text-white" : "bg-paper text-cobalt-600 group-hover:-translate-y-0.5"
                      )}
                    >
                      <Icon name={p.icon} size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-display text-[1.22rem] font-extrabold tracking-tight text-ink-900 sm:text-[1.5rem]">
                          {p.title}
                        </span>
                        <span className="rounded-full bg-cobalt-50 px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-cobalt-700">
                          {p.tag}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-[0.88rem] text-ink-500">{p.text}</span>
                    </span>
                    <span className="hidden shrink-0 items-center gap-2 text-[0.8rem] font-bold text-ink-700 md:flex">
                      {isOpen ? "Close" : "Explore Program"}
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }} className="text-ink-400">
                        <Icon name="ChevronDown" size={16} />
                      </motion.span>
                    </span>
                    <span className="shrink-0 text-ink-400 md:hidden">
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35 }} className="block">
                        <Icon name="ChevronDown" size={18} />
                      </motion.span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 0.7, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 px-4 pb-7 sm:grid-cols-[1.1fr_0.9fr] sm:px-6 sm:pl-[104px]">
                          <div>
                            <p className="max-w-xl text-[0.95rem] leading-relaxed text-ink-600">
                              {p.text} Sessions are planned around your student's current coursework, with short
                              checkpoints so the focus can shift when something else becomes urgent.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {p.subjects.map((s) => (
                                <span key={s} className="rounded-full border border-ink-900/12 bg-white px-3 py-1.5 text-[0.76rem] font-bold text-ink-700">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                              <ActionButton variant="primary" className="min-h-[42px] py-2" onClick={() => scrollToId("contact")} magnetic={false}>
                                Ask about this program
                              </ActionButton>
                              <ActionButton variant="ghost" icon={false} className="min-h-[42px] py-2" onClick={() => scrollToId("booking")} magnetic={false}>
                                Check session times
                              </ActionButton>
                            </div>
                          </div>
                          <dl className="space-y-3 rounded-2xl bg-white p-5 shadow-[0_20px_40px_-34px_rgba(10,30,60,.5)]">
                            {[
                              { k: "Suitable grades", v: p.grades },
                              { k: "Typical format", v: p.format },
                              { k: "Subjects", v: p.subjects.join(" · ") },
                            ].map((d) => (
                              <div key={d.k} className="flex flex-col gap-1 border-b border-dashed border-ink-900/12 pb-3 last:border-0 last:pb-0">
                                <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">{d.k}</dt>
                                <dd className="text-[0.9rem] font-bold text-ink-900">{d.v}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.82rem] text-ink-500">
            <Icon name="Sparkles" size={15} className="text-sun-500" />
            Pricing, availability and enrolment details are set by the academy — this concept deliberately shows no
            invented figures.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= tutors ================= */
const TUTOR_POS = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];

export function Tutors() {
  const [view, setView] = useState<number | null>(null);
  return (
    <section id="tutors" className="noise relative overflow-hidden bg-ink-900 py-20 text-white sm:py-28" aria-labelledby="tutors-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(17,96,232,.5),transparent_65%)]" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          dark
          eyebrow="Educators"
          tone="#ffc658"
          lines={["Meet the People", "Behind the Learning."]}
          lead="Tutoring is a relationship before it is a curriculum. Profiles below are illustrative demo content created for this concept — not statements about current staff."
          right={<DemoNote dark>Demo profiles</DemoNote>}
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {TUTORS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="w-[268px] shrink-0 snap-center sm:w-auto sm:shrink">
              <article className="card group h-full overflow-hidden rounded-[22px] border-white/12 bg-white/[0.04] shadow-none backdrop-blur-sm transition-all duration-500 hover:!bg-white/[0.08] hover:shadow-[0_40px_70px_-40px_rgba(0,0,0,.85)]">
                <div className="relative overflow-hidden">
                  <div
                    role="img"
                    aria-label={`Illustrative portrait placeholder for ${t.name}`}
                    className="aspect-[4/5] w-full transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.06]"
                    style={{
                      backgroundImage: `url(${IMG.tutors})`,
                      backgroundSize: "200% 200%",
                      backgroundPosition: TUTOR_POS[i],
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/14 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                    Demo
                  </span>
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="font-display text-[1.18rem] font-extrabold leading-tight">{t.name}</p>
                    <p className="text-[0.78rem] font-semibold text-sun-400">{t.subject}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="num text-[0.68rem] uppercase tracking-[0.12em] text-ink-400">{t.grades}</p>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-200/85">{t.bio}</p>
                  <div className="mt-3.5 h-px w-full origin-left scale-x-0 bg-white/15 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {t.traits.map((k) => (
                      <span key={k} className="rounded-full bg-white/[0.06] px-2 py-1 text-[0.68rem] font-semibold text-ink-200">
                        {k}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setView(i)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-white transition-colors hover:text-sun-400"
                  >
                    View Profile <Icon name="ArrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={view !== null} onClose={() => setView(null)} title="Tutor profile — demo">
        {view !== null && (
          <div>
            <div className="flex items-center gap-4">
              <span
                className="h-20 w-20 shrink-0 rounded-2xl"
                style={{
                  backgroundImage: `url(${IMG.tutors})`,
                  backgroundSize: "200% 200%",
                  backgroundPosition: TUTOR_POS[view],
                }}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-[1.4rem] font-extrabold">{TUTORS[view].name}</h3>
                <p className="text-[0.86rem] font-bold text-cobalt-600">{TUTORS[view].subject}</p>
                <p className="num text-[0.76rem] text-ink-400">{TUTORS[view].grades}</p>
              </div>
            </div>
            <p className="mt-5 text-[0.94rem] leading-relaxed text-ink-600">
              {TUTORS[view].bio} A live academy page would add verified qualifications, teaching focus, availability
              and the subjects taught — none of which is claimed in this prototype.
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {[
                { k: "Approach", v: "Explain → model → guided practice → independent try" },
                { k: "Session notes", v: "Shared with parents after each meeting" },
                { k: "Works with", v: TUTORS[view].grades },
                { k: "Focus areas", v: TUTORS[view].traits.join(", ") },
              ].map((d) => (
                <div key={d.k} className="rounded-2xl bg-paper px-4 py-3">
                  <p className="text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">{d.k}</p>
                  <p className="mt-0.5 text-[0.88rem] font-bold text-ink-900">{d.v}</p>
                </div>
              ))}
            </div>
            <ActionButton
              className="mt-6 w-full"
              magnetic={false}
              onClick={() => {
                setView(null);
                scrollToId("contact");
              }}
            >
              Request this teaching style
            </ActionButton>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ================= why — bento ================= */
const ICON_TONE = ["#1160e8", "#ffb01f", "#1fbd83", "#ff7a35", "#2b7cf5", "#7a3ba0"];

export function Why() {
  const reduce = useReducedMotion();
  return (
    <section id="why" className="relative overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="why-title">
      <div className="wrap relative">
        <SectionHead
          eyebrow="Why JS Tutoring Academy"
          tone="#1fbd83"
          lines={["Built Around", "the Student."]}
          lead="Six commitments that shape how the platform, the sessions and the parent experience are designed."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:pb-16">
          {WHY.map((w, i) => {
            const dark = i === 0;
            const offset = i % 3 === 1 ? "md:translate-y-10" : i % 3 === 2 ? "md:translate-y-20" : "";
            return (
              <Reveal key={w.title} delay={(i % 3) * 0.08} className={offset}>
                <article
                  className={cx(
                    "card card-lift group relative h-full overflow-hidden p-6",
                    dark && "border-transparent bg-ink-900 text-white shadow-[0_36px_70px_-40px_rgba(10,30,60,.75)]",
                    i === 5 && "sm:p-7"
                  )}
                >
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: ICON_TONE[i] }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ background: dark ? `${ICON_TONE[i]}33` : `${ICON_TONE[i]}16`, color: dark ? "#fff" : ICON_TONE[i] }}
                  >
                    <motion.span
                      animate={reduce ? undefined : { rotate: [0, 0, i % 2 ? -8 : 8, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 2.2 + i * 0.3, ease: "easeInOut" }}
                      className="block"
                    >
                      <Icon name={w.icon} size={22} />
                    </motion.span>
                  </span>
                  <h3 className={cx("relative mt-5 font-display text-[1.25rem] font-extrabold tracking-tight", dark && "text-[1.5rem] sm:text-[1.7rem]")}>
                    {w.title}
                  </h3>
                  <p className={cx("relative mt-2 text-[0.92rem] leading-relaxed", dark ? "text-ink-200/90" : "text-ink-600")}>{w.text}</p>
                  <span
                    className="relative mt-5 block h-[3px] w-10 origin-left rounded-full transition-transform duration-500 group-hover:scale-x-[2.6]"
                    style={{ background: ICON_TONE[i] }}
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
