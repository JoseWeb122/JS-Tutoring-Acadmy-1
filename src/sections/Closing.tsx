import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FAQS, RESOURCE_FILTERS, RESOURCES, SUBJECTS } from "../data";
import { ActionButton, cx, Eyebrow, Icon, MaskLines, Reveal, SectionHead, scrollToId, useUI } from "../ui";

/* ================= resources ================= */
function ResourceArt({ tone, kind }: { tone: string; kind: string }) {
  return (
    <div className="relative h-28 w-full overflow-hidden" style={{ background: `linear-gradient(135deg, ${tone}, ${tone}88 60%, #0a1e3c22)` }}>
      <svg viewBox="0 0 300 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="#fff" strokeOpacity="0.42" strokeWidth="1.4">
          {kind === "Practice" && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={40 + i * 54} cy={60} r={16 + (i % 3) * 5} />)}
          {kind === "Checklist" &&
            [0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="30" y={26 + i * 30} width="150" height="10" rx="5" />
                <circle cx="16" cy={31 + i * 30} r="7" />
              </g>
            ))}
          {kind === "Activity" && [0, 1, 2, 3].map((i) => <path key={i} d={`M${20 + i * 70} 100 q18 ${-40 - i * 10} 36 0`} />)}
          {kind === "Guide" && [0, 1, 2, 3, 4].map((i) => <rect key={i} x={24 + i * 54} y={34 + (i % 2) * 16} width="34" height="52" rx="6" />)}
          {kind === "Playbook" && <><path d="M20 96C70 40 130 40 180 78s90 20 110-14" /><circle cx="180" cy="78" r="5" fill="#fff" /></>}
          {kind === "Toolkit" && [0, 1, 2].map((i) => <rect key={i} x={26 + i * 92} y={30 + i * 12} width="70" height="46" rx="8" />)}
          {kind === "Template" && [0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={22 + (i % 3) * 92} y={22 + Math.floor(i / 3) * 44} width="76" height="32" rx="7" />)}
          {kind === "Article" && [0, 1, 2, 3].map((i) => <rect key={i} x="26" y={24 + i * 20} width={200 - i * 26} height="8" rx="4" />)}
          {!["Practice", "Checklist", "Activity", "Guide", "Playbook", "Toolkit", "Template", "Article"].includes(kind) && <rect x="26" y="34" width="180" height="12" rx="6" />}
        </g>
      </svg>
      <span className="absolute right-3 top-3 rounded-full bg-ink-950/28 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
        {kind}
      </span>
    </div>
  );
}

export function Resources() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter(
      (r) =>
        (filter === "All" || r.tags.includes(filter) || r.cat === filter) &&
        (!q || r.title.toLowerCase().includes(q) || r.text.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q))
    );
  }, [filter, query]);

  return (
    <section id="resources" className="relative overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="resources-title">
      <div className="wrap relative">
        <SectionHead
          eyebrow="Resource library"
          tone="#7a3ba0"
          lines={["Ideas to Take", "Home This Week."]}
          lead="Free, practical pieces for parents and students — guides, checklists and printable practice sets. Search or filter by who it's for."
        />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {RESOURCE_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cx(
                  "rounded-full border px-3.5 py-2 text-[0.8rem] font-bold transition-all duration-300",
                  filter === f
                    ? "border-transparent bg-ink-900 text-white shadow-[0_14px_26px_-16px_rgba(10,30,60,.8)]"
                    : "border-ink-900/12 bg-white text-ink-600 hover:-translate-y-0.5 hover:border-ink-900/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <label htmlFor="res-search" className="sr-only">Search resources</label>
            <Icon name="Search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              id="res-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search study, spelling, exam…"
              className="field pl-10"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <div className="mt-10 rounded-[22px] border border-dashed border-ink-900/16 bg-white p-10 text-center">
            <p className="font-display text-[1.2rem] font-bold">Nothing matches “{query}” yet.</p>
            <p className="mt-2 text-[0.9rem] text-ink-500">Try “reading”, “math”, “test” — or clear the filter.</p>
            <button type="button" onClick={() => { setQuery(""); setFilter("All"); }} className="btn btn-ghost mt-5">
              Reset the library
            </button>
          </div>
        ) : (
          <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((r) => (
                <motion.article
                  layout
                  key={r.title}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.7, 0.25, 1] }}
                  className="card card-lift group overflow-hidden p-0"
                >
                  <ResourceArt tone={r.tone} kind={r.kind} />
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em]" style={{ color: r.tone }}>
                      {r.cat}
                      <span className="h-1 w-1 rounded-full bg-ink-300" />
                      <span className="num text-ink-400">{r.read}</span>
                    </p>
                    <h3 className="mt-2 font-display text-[1.16rem] font-extrabold leading-snug tracking-tight">{r.title}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-600">{r.text}</p>
                    <button
                      type="button"
                      onClick={() => scrollToId("contact")}
                      className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-ink-800 transition-colors hover:text-cobalt-600"
                    >
                      Get the resource
                      <Icon name="ArrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ================= faq ================= */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-clip bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="wrap relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow tone="#1160e8">Questions parents ask</Eyebrow>
          <MaskLines
            as="h2"
            id="faq-title"
            className="display mt-4 text-[2.1rem] leading-[1.03] sm:text-[2.6rem]"
            lines={["Answers,", "Plainly Put."]}
          />
          <p className="mt-5 max-w-sm text-[0.96rem] leading-relaxed text-ink-600">
            These are concept answers written for the prototype. The academy's exact policies, timings and
            qualifications would replace them at launch.
          </p>
          <div className="mt-7 rounded-[22px] bg-ink-900 p-5 text-white">
            <p className="eyebrow text-ink-300">Still unsure?</p>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-100/90">
              Send one short message about your student. We'll point you to the right program — even if that's a
              different kind of support.
            </p>
            <ActionButton variant="sun" className="mt-4 min-h-[40px] py-2 text-[0.84rem]" onClick={() => scrollToId("contact")} magnetic={false}>
              Ask a question
            </ActionButton>
          </div>
        </div>

        <ul className="divide-y divide-ink-900/12 border-y border-ink-900/12">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-4 py-5 text-left"
                  >
                    <span className="num pt-1 text-[0.7rem] text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className={cx("flex-1 font-display text-[1.08rem] font-bold tracking-tight transition-colors sm:text-[1.25rem]", isOpen ? "text-cobalt-700" : "text-ink-900 group-hover:text-cobalt-600")}>
                      {f.q}
                    </span>
                    <span className={cx("relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400", isOpen ? "rotate-180 border-cobalt-600 bg-cobalt-600 text-white" : "border-ink-900/16 text-ink-600 group-hover:border-ink-900/40")}>
                      <Icon name="ChevronDown" size={15} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 0.7, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pl-[42px] pr-10 text-[0.95rem] leading-relaxed text-ink-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================= CTA ================= */
export function BigCta() {
  const reduce = useReducedMotion();
  const words = ["Reading", "Math", "Spelling", "Science", "English", "Confidence", "Foundations"];
  return (
    <section className="noise relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28" aria-labelledby="cta-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_120%,rgba(17,96,232,.6),transparent_65%),radial-gradient(45%_45%_at_10%_0%,rgba(255,176,31,.28),transparent_65%)]" aria-hidden="true" />
      {/* floating study objects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[
          { l: "∑", x: "8%", y: "22%", s: "3.4rem", d: "0s" },
          { l: "abc", x: "84%", y: "18%", s: "1.9rem", d: "1.1s" },
          { l: "π", x: "70%", y: "76%", s: "3rem", d: "2.2s" },
          { l: "H₂O", x: "16%", y: "74%", s: "1.7rem", d: "0.6s" },
          { l: "÷", x: "44%", y: "12%", s: "2.2rem", d: "1.7s" },
          { l: "√x", x: "30%", y: "86%", s: "2rem", d: "2.6s" },
        ].map((o) => (
          <span
            key={o.l}
            className={cx("absolute font-display font-bold text-white/12", !reduce && "anim-float")}
            style={{ left: o.x, top: o.y, fontSize: o.s, animationDelay: o.d }}
          >
            {o.l}
          </span>
        ))}
        <svg viewBox="0 0 1200 300" className="absolute inset-x-0 bottom-0 h-40 w-full opacity-20" aria-hidden="true">
          <motion.path
            d="M0 220C180 120 320 260 520 180s340 60 680-90"
            fill="none"
            stroke="#ffc658"
            strokeWidth="1.6"
            strokeDasharray="8 10"
            initial={reduce ? undefined : { strokeDashoffset: 400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="wrap relative">
        <div className="marquee-mask relative -mx-5 mb-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] sm:-mx-8">
          <div className="marquee-track flex w-max items-center gap-8">
            {[...words, ...words, ...words].map((w, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-[1.4rem] font-extrabold uppercase tracking-tight text-white/22 sm:text-[2rem]">
                {w}
                <span className="h-1.5 w-1.5 rotate-45 bg-sun-400/60" />
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="#ffc658">Start here</Eyebrow>
          <MaskLines
            as="h2"
            id="cta-title"
            className="display mt-5 text-[2.15rem] leading-[1.02] sm:text-[3rem] lg:text-[3.6rem]"
            lines={["Ready to Help Your Child", "Learn With Confidence?"]}
          />
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-200/90">
              Explore personalized academic support designed around the way your student learns.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ActionButton variant="sun" onClick={() => scrollToId("contact")}>
                Get Started
              </ActionButton>
              <ActionButton variant="onDark" icon={false} onClick={() => scrollToId("programs")}>
                Explore Programs
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= contact ================= */
export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    parent: "",
    email: "",
    phone: "",
    grade: "Grade 6",
    subject: "Math",
    goals: "",
    format: "Online 1-to-1",
    message: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="contact-title">
      <div className="grid-paper absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="wrap relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <Eyebrow tone="#ff7a35">Parent enquiry</Eyebrow>
          <MaskLines
            as="h2"
            id="contact-title"
            className="display mt-4 text-[2.1rem] leading-[1.03] sm:text-[2.7rem]"
            lines={["Tell Us About", "Your Student."]}
          />
          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink-600">
            One short form. It describes what your student is working on and what you would like support with — the
            rest can be a conversation.
          </p>

          <ol className="mt-9 space-y-5" role="list">
            {[
              { t: "You send this form", x: "Two minutes, no account needed.", i: "NotebookPen" },
              { t: "We read the request", x: "Someone reviews the subjects, grade and goals you shared.", i: "Search" },
              { t: "A reply with options", x: "Suggested program, format and realistic times — in this prototype this step is simulated.", i: "MessagesSquare" },
              { t: "First session planned", x: "A learning plan is drafted before the first meeting.", i: "CalendarCheck" },
            ].map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.07} className="relative flex gap-4">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-cobalt-600 shadow-sm">
                  <Icon name={s.i} size={18} />
                  {i < 3 && <span className="absolute left-1/2 top-full h-5 w-px -translate-x-1/2 bg-ink-200" aria-hidden="true" />}
                </span>
                <span>
                  <span className="block font-display text-[1.02rem] font-bold">{s.t}</span>
                  <span className="mt-0.5 block text-[0.88rem] leading-relaxed text-ink-500">{s.x}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.06}>
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="done" initial={prefersReduced() ? {} : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <motion.span
                    initial={{ scale: 0.4, rotate: -18 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 13 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint-100 text-mint-600"
                  >
                    <Icon name="CircleCheckBig" size={38} />
                  </motion.span>
                  <h3 className="display mt-6 text-[1.7rem]">Thank you, {form.parent || "friend"}.</h3>
                  <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600">
                    Your enquiry about <strong className="text-ink-900">{form.subject}</strong> for{" "}
                    <strong className="text-ink-900">{form.grade}</strong> has been prepared — this prototype does not
                    transmit data, so nothing was stored or sent.
                  </p>
                  <dl className="mx-auto mt-7 grid max-w-md gap-2 text-left sm:grid-cols-2">
                    {[
                      { k: "Preferred format", v: form.format },
                      { k: "Reply to", v: form.email || "—" },
                    ].map((d) => (
                      <div key={d.k} className="rounded-2xl bg-paper px-4 py-3">
                        <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-ink-400">{d.k}</dt>
                        <dd className="mt-0.5 truncate text-[0.9rem] font-bold text-ink-900">{d.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <ActionButton variant="primary" icon={false} onClick={() => setSent(false)} magnetic={false}>
                      Edit the enquiry
                    </ActionButton>
                    <ActionButton variant="ghost" icon={false} onClick={() => scrollToId("booking")} magnetic={false}>
                      Try the booking flow
                    </ActionButton>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="parent" label="Parent name" required>
                      <input id="parent" required value={form.parent} onChange={set("parent")} className="field" placeholder="Jordan Smith" autoComplete="name" />
                    </Field>
                    <Field id="email" label="Email" required>
                      <input id="email" type="email" required value={form.email} onChange={set("email")} className="field" placeholder="you@family.com" autoComplete="email" />
                    </Field>
                    <Field id="phone" label="Phone">
                      <input id="phone" type="tel" value={form.phone} onChange={set("phone")} className="field" placeholder="(000) 000-0000" autoComplete="tel" />
                    </Field>
                    <Field id="grade" label="Student grade">
                      <select id="grade" value={form.grade} onChange={set("grade")} className="field">
                        {["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="subject" label="Subject needed">
                      <select id="subject" value={form.subject} onChange={set("subject")} className="field">
                        {SUBJECTS.map((s) => (
                          <option key={s.id}>{s.name}</option>
                        ))}
                        <option>Multiple subjects</option>
                      </select>
                    </Field>
                    <Field id="format" label="Preferred learning format">
                      <select id="format" value={form.format} onChange={set("format")} className="field">
                        {["Online 1-to-1", "At the Academy", "Online Small Group", "Not sure yet"].map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field id="goals" label="Learning goals">
                    <input id="goals" value={form.goals} onChange={set("goals")} className="field" placeholder="e.g. stronger fraction understanding, calmer homework nights" />
                  </Field>
                  <Field id="message" label="Message">
                    <textarea id="message" rows={4} value={form.message} onChange={set("message")} className="field resize-y" placeholder="What is your student finding tricky right now? Anything that helps us understand them?" />
                  </Field>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-900/10 pt-5">
                    <p className="max-w-xs text-[0.76rem] leading-snug text-ink-500">
                      Demo form — no information leaves this page. Connect your preferred form service before launch.
                    </p>
                    <button type="submit" className="btn btn-primary min-w-[200px]">
                      Request Information <Icon name="ArrowRight" size={16} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cobalt-100/60 blur-2xl" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function prefersReduced() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label} {required && <span className="text-flame-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ================= footer ================= */
const SOCIALS = [
  {
    name: "Facebook",
    path: "M13.5 21v-7h2.4l.4-2.8h-2.8V9.5c0-.8.3-1.4 1.5-1.4h1.4V5.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8v2.8h2.2V21h3.3z",
  },
  {
    name: "Instagram",
    path: "M12 7.6A4.4 4.4 0 1 0 16.4 12 4.4 4.4 0 0 0 12 7.6zm0 7.2A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zM17 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM20 12a8 8 0 1 0-8 8 8 8 0 0 0 8-8zm-1.9 0a6.1 6.1 0 1 1-6.1-6.1 6.1 6.1 0 0 1 6.1 6.1z",
  },
  {
    name: "X",
    path: "M17.6 6h2.3l-5 5.7L21 18h-4.6l-3.6-4.2L8.7 18H6.4l5.3-6-5.4-6h4.7l3.3 3.9zM16.5 16.5h1.3L9.1 7.4H7.7z",
  },
  {
    name: "YouTube",
    path: "M20.6 8.6a2.5 2.5 0 0 0-1.8-1.8C17.3 6.5 12 6.5 12 6.5s-5.3 0-6.8.3a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 3.1 12a26 26 0 0 0 .3 3.4 2.5 2.5 0 0 0 1.8 1.8c1.5.3 6.8.3 6.8.3s5.3 0 6.8-.3a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .3-3.4 26 26 0 0 0-.3-3.4zM10.4 14.6V9.4l4.5 2.6z",
  },
];

export function Footer() {
  const { setLoginOpen } = useUI();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const links: { t: string; items: { l: string; a: string }[] }[] = [
    {
      t: "Academy",
      items: [
        { l: "About", a: "about" },
        { l: "Programs", a: "programs" },
        { l: "Subjects", a: "subjects" },
        { l: "Tutors", a: "tutors" },
      ],
    },
    {
      t: "Support",
      items: [
        { l: "How it works", a: "how" },
        { l: "For parents", a: "parents" },
        { l: "Resources", a: "resources" },
        { l: "FAQ", a: "faq" },
      ],
    },
    {
      t: "Get started",
      items: [
        { l: "Booking", a: "booking" },
        { l: "Contact", a: "contact" },
        { l: "Learning demo", a: "demo" },
        { l: "Learning path", a: "path" },
      ],
    },
  ];

  return (
    <footer className="noise relative overflow-hidden bg-ink-950 pt-16 text-white sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(17,96,232,.34),transparent_65%)]" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.25fr_1.75fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-gradient-to-br from-cobalt-600 to-ink-800 font-display text-[1.02rem] font-extrabold">
                JS
              </span>
              <span>
                <span className="font-display block text-[1.12rem] font-extrabold tracking-tight">JS Tutoring Academy</span>
                <span className="eyebrow block text-ink-400">K–12 academic support</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-ink-200/85">
              Helping K–12 students build stronger skills and greater confidence.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("top");
                  }}
                  aria-label={`${s.name} (placeholder link)`}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/14 text-ink-200 transition-all duration-300 hover:-translate-y-1 hover:border-sun-400/60 hover:text-sun-400"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-[repeat(3,minmax(0,1fr))_1.35fr]">
            {links.map((g) => (
              <nav key={g.t} aria-label={g.t}>
                <p className="eyebrow text-ink-400">{g.t}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((l) => (
                    <li key={l.l}>
                      <a
                        href={`#${l.a}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToId(l.a);
                        }}
                        className="group inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink-200/85 transition-colors hover:text-white"
                      >
                        {l.l}
                        <Icon name="ArrowRight" size={12} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <p className="eyebrow text-ink-400">Parent login</p>
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="btn btn-onDark mt-4 w-full"
              >
                Open the portal concept
              </button>
              <p className="eyebrow mt-7 text-ink-400">Newsletter</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setJoined(true);
                }}
                className="mt-4"
                aria-label="Newsletter signup"
              >
                <div className="flex gap-2">
                  <label htmlFor="nl" className="sr-only">Email address</label>
                  <input id="nl" type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setJoined(false); }} placeholder="Email for study ideas" className="field field-dark" />
                  <button type="submit" aria-label="Subscribe" className="btn btn-sun min-h-[46px] px-4 py-0">
                    <Icon name="ArrowRight" size={17} />
                  </button>
                </div>
                <AnimatePresence>
                  {joined && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2.5 flex items-center gap-2 text-[0.78rem] font-semibold text-mint-400">
                      <Icon name="CircleCheckBig" size={14} /> Noted — a real build would confirm your subscription here.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-ink-400">
            © {new Date().getFullYear()} JS Tutoring Academy. Concept website — content shown for demonstration.
          </p>
          <div className="flex flex-wrap gap-5 text-[0.78rem] font-semibold text-ink-300">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((l) => (
              <a
                key={l}
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("top");
                }}
                className="transition-colors hover:text-sun-400"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none select-none overflow-hidden px-4 pb-2 text-center font-display text-[19vw] font-extrabold leading-[0.72] tracking-[-0.05em] text-white/[0.045] sm:text-[15vw]"
        aria-hidden="true"
      >
        JS ACADEMY
      </div>
    </footer>
  );
}
