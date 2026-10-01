import heroClass from "./assets/img/hero-class.jpg";
import motionBand from "./assets/img/motion-band.jpg";
import personalized from "./assets/img/personalized.jpg";
import storyImg from "./assets/img/story.jpg";
import tutorsImg from "./assets/img/tutors.jpg";
import imgReading from "./assets/img/subject-reading.jpg";
import imgMath from "./assets/img/subject-math.jpg";
import imgSpelling from "./assets/img/subject-spelling.jpg";
import imgScience from "./assets/img/subject-science.jpg";
import imgEnglish from "./assets/img/subject-english.jpg";

export const IMG = {
  hero: heroClass,
  motionBand,
  personalized,
  story: storyImg,
  tutors: tutorsImg,
};

export type SubjectKey = "reading" | "math" | "spelling" | "science" | "english";

export type Subject = {
  id: SubjectKey;
  name: string;
  label: string;
  blurb: string;
  detail: string;
  image: string;
  alt: string;
  accent: string;
  soft: string;
  skills: string[];
  focus: { title: string; text: string }[];
  grades: string;
};

export const SUBJECTS: Subject[] = [
  {
    id: "reading",
    name: "Reading",
    label: "READING",
    blurb:
      "Strengthen comprehension, vocabulary, fluency, and confidence through engaging instruction.",
    detail:
      "Sessions move from decoding and fluency into deeper comprehension, so students don't just read words — they understand, question, and remember what they read.",
    image: imgReading,
    alt: "Young student reading an illustrated book in a bright, cosy reading nook",
    accent: "#1160e8",
    soft: "#e2edff",
    grades: "Kindergarten – Grade 8",
    skills: [
      "Phonics & word attack",
      "Fluency and pacing",
      "Comprehension strategies",
      "Vocabulary in context",
      "Summarising & text evidence",
      "Confidence reading aloud",
    ],
    focus: [
      { title: "Picture to paragraph", text: "Guided progression from shared reading to independent comprehension." },
      { title: "Talk about the text", text: "Students practise explaining ideas in their own words, out loud." },
      { title: "Books they choose", text: "Interest-based reading keeps practice feeling worth the effort." },
    ],
  },
  {
    id: "math",
    name: "Math",
    label: "MATH",
    blurb:
      "Build strong mathematical foundations through clear explanations, guided practice, and problem-solving.",
    detail:
      "Math is taught as a sequence of understandable ideas rather than memorised steps — with models, checks, and plenty of guided practice before independence.",
    image: imgMath,
    alt: "Student working out fractions on a small whiteboard with a blue marker",
    accent: "#0b4cbb",
    soft: "#dceaff",
    grades: "Kindergarten – Grade 12",
    skills: [
      "Number sense & place value",
      "Fractions, decimals, percents",
      "Fact fluency",
      "Multi-step problem solving",
      "Reasoning & explaining work",
      "Homework and test prep",
    ],
    focus: [
      { title: "Model first", text: "Visual and concrete models come before symbols and formulas." },
      { title: "Find the gap", text: "We pinpoint the missing prerequisite that makes a topic feel impossible." },
      { title: "Quiet mistakes", text: "Error patterns are reviewed together so they stop repeating." },
    ],
  },
  {
    id: "spelling",
    name: "Spelling",
    label: "SPELLING",
    blurb: "Develop stronger spelling patterns, vocabulary, and writing confidence.",
    detail:
      "Spelling is taught as a system of patterns and rules, so students have something reliable to reach for when a word isn't on this week's list.",
    image: imgSpelling,
    alt: "Wooden letter tiles spelling words on a desk beside a notebook and pencil",
    accent: "#ff7a35",
    soft: "#ffe6d5",
    grades: "Kindergarten – Grade 8",
    skills: [
      "Letter sounds & patterns",
      "Word families & roots",
      "Common rule exceptions",
      "Syllable splitting",
      "Proofreading habits",
      "Writing transfer",
    ],
    focus: [
      { title: "Patterns, not lists", text: "Students sort and compare words to see why spellings behave the way they do." },
      { title: "Say it, map it", text: "Sound-to-letter mapping strengthens both spelling and reading." },
      { title: "Into real writing", text: "New patterns get practised inside the student's own sentences." },
    ],
  },
  {
    id: "science",
    name: "Science",
    label: "SCIENCE",
    blurb: "Make science easier to understand through engaging explanations and real-world connections.",
    detail:
      "Vocabulary, processes, and evidence get unpacked slowly — with diagrams, everyday examples, and the kind of questioning that shows what a student truly understands.",
    image: imgScience,
    alt: "Student using a microscope beside a beaker and a seedling in a sunlit study space",
    accent: "#109c6a",
    soft: "#d6f6e9",
    grades: "Grade 3 – Grade 12",
    skills: [
      "Life & earth systems",
      "Physical science basics",
      "Scientific vocabulary",
      "Reading data & graphs",
      "Experiments and variables",
      "Written explanations",
    ],
    focus: [
      { title: "Concepts made visible", text: "Diagrams, models, and simple demos replace rote memorisation." },
      { title: "Why does it matter", text: "Each topic is anchored to something the student can observe at home." },
      { title: "Exam language", text: "Students learn how questions ask for evidence and reasoning." },
    ],
  },
  {
    id: "english",
    name: "English",
    label: "ENGLISH",
    blurb: "Strengthen grammar, writing, vocabulary, comprehension, and communication skills.",
    detail:
      "From clear sentences to structured paragraphs and essays, students learn to organise thinking and express it with precision — in writing and in speech.",
    image: imgEnglish,
    alt: "Teenager writing in a journal at a study table with a laptop open beside them",
    accent: "#7a3ba0",
    soft: "#efe1f8",
    grades: "Grade 2 – Grade 12",
    skills: [
      "Grammar & mechanics",
      "Sentence construction",
      "Paragraph & essay structure",
      "Vocabulary for writing",
      "Comprehension response",
      "Speaking & presentation",
    ],
    focus: [
      { title: "Draft out loud", text: "Students narrate an idea before writing it — structure becomes natural." },
      { title: "Edit in passes", text: "One pass for ideas, one for sentences, one for conventions." },
      { title: "Mentor texts", text: "Strong examples show what the target writing actually looks like." },
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Subjects", href: "#subjects" },
  { label: "How It Works", href: "#how" },
  { label: "For Parents", href: "#parents" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_ITEMS = [
  { icon: "GraduationCap", text: "K–12 Focused" },
  { icon: "Blocks", text: "5 Core Subjects" },
  { icon: "Compass", text: "Personalized Learning" },
  { icon: "HeartHandshake", text: "Student-Centered Approach" },
  { icon: "ShieldCheck", text: "Safe, Structured Sessions" },
  { icon: "TrendingUp", text: "Progress You Can See" },
  { icon: "Video", text: "Online & In-Person Formats" },
];

export const STAGES = [
  {
    id: "elementary",
    eyebrow: "Stage 01",
    title: "Elementary",
    grades: "Kindergarten – Grade 5",
    lead: "Early learners are still figuring out how school works. This stage is about making the basics feel solid and safe.",
    points: [
      "Reading readiness, phonics and daily fluency practice",
      "Number sense, place value and friendly word problems",
      "Spelling patterns, handwriting and first sentences",
      "Short, active sessions with lots of praise and repetition",
    ],
    tone: "#ffb01f",
  },
  {
    id: "middle",
    eyebrow: "Stage 02",
    title: "Middle School",
    grades: "Grade 6 – Grade 8",
    lead: "Workload jumps and subjects split apart. Students learn to keep up with more teachers while holding their confidence.",
    points: [
      "Fractions, ratios, pre-algebra and written explanation",
      "Science vocabulary, lab reports and study routines",
      "Paragraph structure, essays and grammar in context",
      "Planning support so homework stops running late",
    ],
    tone: "#2b7cf5",
  },
  {
    id: "high",
    eyebrow: "Stage 03",
    title: "High School",
    grades: "Grade 9 – Grade 12",
    lead: "Courses get demanding and stakes get real. Support becomes more strategic: gaps closed, skills sharpened, independence built.",
    points: [
      "Algebra through advanced math with exam strategy",
      "Biology, chemistry and physics concept support",
      "Analytical essays, research writing and presentation",
      "Time management, self-advocacy and independence",
    ],
    tone: "#1fbd83",
  },
];

export const CHECKLIST = [
  { title: "Identify learning needs", text: "A first conversation and light skills check show where support should start." },
  { title: "Choose the right subject", text: "We focus on the areas that will make the biggest difference first." },
  { title: "Build a personalized learning plan", text: "Clear targets, session rhythm and the materials your student will use." },
  { title: "Practice and reinforce skills", text: "Guided practice in session, then short, purposeful work between meetings." },
  { title: "Track progress", text: "Notes and skill checkpoints keep growth visible for students and parents." },
  { title: "Grow confidence", text: "Independence is the goal — students learn to trust their own thinking." },
];

export const HOW_STEPS = [
  {
    num: "01",
    title: "Tell Us What Your Student Needs",
    text: "Share the subjects, recent challenges and what success looks like for your family. A quick, friendly conversation — no formal paperwork marathon.",
    bullets: ["Subject & grade details", "What's feeling tricky right now", "Your student's interests"],
  },
  {
    num: "02",
    title: "Choose the Right Learning Support",
    text: "We match the program format and subject focus to your student's age, schedule and academic needs, then confirm the plan with you.",
    bullets: ["Program recommendation", "Session rhythm that fits home life", "Learning goals written clearly"],
  },
  {
    num: "03",
    title: "Learn With Personalized Instruction",
    text: "Sessions are focused, conversational and paced to the student. Concepts get re-taught in more than one way until they click.",
    bullets: ["Clear explanations first", "Guided practice together", "Short, useful between-session tasks"],
  },
  {
    num: "04",
    title: "Track Growth & Build Confidence",
    text: "Progress notes, skill checkpoints and honest check-ins show what has strengthened — and what comes next.",
    bullets: ["Visible progress notes", "Confidence in attempting hard work", "Regular parent updates"],
  },
];

export const PROGRAMS = [
  {
    id: "elementary-foundations",
    title: "Elementary Foundations",
    tag: "Foundations",
    text: "A steady build of the early skills everything else depends on: reading, number sense, spelling and curious thinking.",
    grades: "Kindergarten – Grade 5",
    subjects: ["Reading", "Math", "Spelling", "English"],
    format: "Weekly · 45–60 min",
    icon: "Blocks",
    featured: true,
  },
  {
    id: "middle-school",
    title: "Middle School Support",
    tag: "Core years",
    text: "Help for the years when subjects split and workload rises — with organisation and study habits built in.",
    grades: "Grade 6 – Grade 8",
    subjects: ["Math", "Science", "English", "Reading"],
    format: "Weekly · 60 min",
    icon: "Compass",
  },
  {
    id: "high-school",
    title: "High School Academic Support",
    tag: "Exam years",
    text: "Course-aligned tutoring, deeper concept work and exam strategy for students managing real academic pressure.",
    grades: "Grade 9 – Grade 12",
    subjects: ["Math", "Science", "English"],
    format: "Weekly or fortnightly · 60–90 min",
    icon: "GraduationCap",
  },
  {
    id: "subject-specific",
    title: "Subject-Specific Tutoring",
    tag: "Targeted",
    text: "One subject, one clear goal. Perfect when a single topic — fractions, comprehension, essay writing — needs focused attention.",
    grades: "Kindergarten – Grade 12",
    subjects: ["Reading", "Math", "Spelling", "Science", "English"],
    format: "Flexible blocks",
    icon: "Target",
  },
  {
    id: "homework-study",
    title: "Homework & Study Support",
    tag: "Routine",
    text: "A structured weekly session where assignments get understood — not just finished — and good habits take root.",
    grades: "Grade 3 – Grade 12",
    subjects: ["All core subjects"],
    format: "Weekly · 60 min",
    icon: "NotebookPen",
  },
  {
    id: "skill-building",
    title: "Skill Building",
    tag: "Confidence",
    text: "Short focused cycles on one transferable skill: reading fluency, mental math, spelling patterns or writing structure.",
    grades: "Grade 1 – Grade 10",
    subjects: ["Reading", "Math", "Spelling", "English"],
    format: "4–6 week cycles",
    icon: "Trophy",
  },
];

export const TUTORS = [
  {
    name: "Maya Whitfield",
    subject: "Reading & Spelling",
    grades: "Kindergarten – Grade 5",
    bio: "Focuses on early literacy, phonics confidence and making daily reading something students look forward to.",
    traits: ["Structured literacy", "Reading fluency", "Spelling patterns"],
  },
  {
    name: "Kevin Tan",
    subject: "Mathematics & Science",
    grades: "Grade 4 – Grade 8",
    bio: "Known for turning intimidating topics into a sequence of small, explainable steps students can argue about.",
    traits: ["Concept models", "Error analysis", "Curiosity first"],
  },
  {
    name: "Sofia Marín",
    subject: "English & Writing",
    grades: "Grade 6 – Grade 12",
    bio: "Builds writers who can organise a thinking process, revise honestly and say something clear on the page.",
    traits: ["Essay structure", "Grammar in context", "Voice"],
  },
  {
    name: "Jason Fields",
    subject: "High School Math",
    grades: "Grade 9 – Grade 12",
    bio: "Works with students on algebra through advanced courses, pairing concept depth with steady exam strategy.",
    traits: ["Algebra & beyond", "Exam technique", "Independence"],
  },
];

export const WHY = [
  {
    icon: "Compass",
    title: "Personalized Support",
    text: "Every plan starts from the individual student — their grade, subject gaps, interests and how they learn best.",
  },
  {
    icon: "GraduationCap",
    title: "K–12 Focus",
    text: "One academy spanning the full school journey, so support can adapt as courses and expectations change.",
  },
  {
    icon: "Blocks",
    title: "Multiple Core Subjects",
    text: "Reading, Math, Spelling, Science and English under one roof — because these skills feed each other.",
  },
  {
    icon: "CalendarCheck",
    title: "Flexible Learning",
    text: "Online or in-person formats, with session rhythms that fit around school, sport and family life.",
  },
  {
    icon: "TrendingUp",
    title: "Progress Visibility",
    text: "Skill checkpoints and session notes make growth visible to students and parents alike.",
  },
  {
    icon: "ShieldCheck",
    title: "Parent-Friendly Experience",
    text: "Clear communication, simple scheduling and updates written for busy parents, not jargon.",
  },
];

export const RESOURCES = [
  {
    title: "Study Tips That Actually Stick",
    cat: "Students",
    tags: ["Students"],
    read: "6 min read",
    kind: "Guide",
    text: "Six revision habits strong students use — and how to build them one week at a time.",
    tone: "#2b7cf5",
  },
  {
    title: "The Parent's Guide to Tutoring",
    cat: "Parents",
    tags: ["Parents"],
    read: "9 min read",
    kind: "Playbook",
    text: "How to decide what support your child needs, and how to make the first sessions count.",
    tone: "#1160e8",
  },
  {
    title: "At-Home Reading Routines",
    cat: "Reading",
    tags: ["Parents", "Reading"],
    read: "5 min read",
    kind: "Checklist",
    text: "Simple, gentle structures for fifteen minutes a night that build fluency and stamina.",
    tone: "#ff7a35",
  },
  {
    title: "Fraction Practice Set",
    cat: "Math",
    tags: ["Students", "Math"],
    read: "12 problems",
    kind: "Practice",
    text: "Visual fraction comparisons and word problems, with worked thinking for each step.",
    tone: "#0b4cbb",
  },
  {
    title: "Kitchen Science Activities",
    cat: "Science",
    tags: ["Students", "Science"],
    read: "8 activities",
    kind: "Activity",
    text: "Low-mess experiments that make variables, prediction and observation feel obvious.",
    tone: "#109c6a",
  },
  {
    title: "Spelling Pattern Cards",
    cat: "Spelling",
    tags: ["Students", "Reading"],
    read: "Printable",
    kind: "Template",
    text: "Word sorting cards for common patterns, designed to be said aloud, mapped and tested.",
    tone: "#ffb01f",
  },
  {
    title: "Sentence-to-Essay Toolkit",
    cat: "English",
    tags: ["Students", "English"],
    read: "7 min read",
    kind: "Toolkit",
    text: "Scaffolded frames for paragraphing, transitions and evidence — for reluctant and able writers.",
    tone: "#7a3ba0",
  },
  {
    title: "Talking to Your Child About School",
    cat: "Parents",
    tags: ["Parents"],
    read: "4 min read",
    kind: "Article",
    text: "Questions that get more than 'fine' as an answer, and how to spot real frustration early.",
    tone: "#1160e8",
  },
  {
    title: "Before-the-Test Checklist",
    cat: "Students",
    tags: ["Students", "Math", "Science"],
    read: "One page",
    kind: "Checklist",
    text: "A calm night-before and morning-of routine for students who freeze under pressure.",
    tone: "#1fbd83",
  },
];

export const RESOURCE_FILTERS = ["All", "Parents", "Students", "Reading", "Math", "Science", "English"];

export const FAQS = [
  {
    q: "What grades does JS Tutoring Academy support?",
    a: "Our programs are designed for K–12 students, from early reading readiness through high school course work. Support is adapted to the age and stage of each learner rather than delivered as one generic plan.",
  },
  {
    q: "What subjects do you offer?",
    a: "Five core areas: Reading, Mathematics, Spelling, Science and English. Families can focus on one subject or combine areas where they reinforce each other, such as reading and English.",
  },
  {
    q: "How does tutoring work?",
    a: "It begins with a conversation about your student's needs, followed by a recommended program, subject focus and session rhythm. Ongoing sessions combine explanation, guided practice and short between-session tasks, with progress noted along the way.",
  },
  {
    q: "Can parents schedule sessions online?",
    a: "Yes — the scheduling experience is designed for parents to request a session time in a few steps. This prototype demonstrates the flow; live availability would connect to the academy's real calendar.",
  },
  {
    q: "Can students receive personalized support?",
    a: "That is the starting point of the model. Sessions, practice and pacing are shaped around each student's strengths, current level and the specific skills they are working to build.",
  },
  {
    q: "How can parents track progress?",
    a: "The parent dashboard concept shows how progress could be presented: session overview, upcoming lesson, subject progress, recommended practice and tutor notes. Content shown here is demo data for the design.",
  },
  {
    q: "Do you offer online tutoring?",
    a: "Online sessions are part of the concept, alongside in-person formats. Families can choose the format that suits their home, schedule and learning style.",
  },
  {
    q: "Can students receive help with specific subjects?",
    a: "Yes. Subject-specific tutoring is available when one topic or skill is the priority — for example fractions, reading comprehension, spelling patterns or essay structure.",
  },
];

/* ---------------- interactive demo quiz ---------------- */
export type Question = {
  prompt: string;
  hint: string;
  options: string[];
  answer: number;
  why: string;
  visual?: "fraction" | "books" | "orbit" | "sentence";
};

export const QUIZ: Record<string, { label: string; accent: string; questions: Question[] }> = {
  math: {
    label: "Math",
    accent: "#0b4cbb",
    questions: [
      {
        prompt: "Which fraction is greater?",
        hint: "Compare the size of the parts, not just the numbers.",
        options: ["1/2", "1/4"],
        answer: 0,
        why: "Same whole, fewer parts means bigger parts — so 1/2 is greater than 1/4.",
        visual: "fraction",
      },
      {
        prompt: "3/5 + 1/5 = ?",
        hint: "The denominator stays the same when the parts match.",
        options: ["4/10", "4/5", "2/5"],
        answer: 1,
        why: "You are adding four fifths, so the denominator stays 5: 3/5 + 1/5 = 4/5.",
        visual: "fraction",
      },
    ],
  },
  reading: {
    label: "Reading",
    accent: "#1160e8",
    questions: [
      {
        prompt:
          "“The old lighthouse had not shone in years, yet gulls still circled its gallery at dusk.” What does this suggest?",
        hint: "Look for the detail that seems out of place.",
        options: ["The lighthouse still works", "The gulls follow an old habit", "Sailors are returning"],
        answer: 1,
        why: "The light is out but the gulls keep circling — a habit persisting after the reason for it has gone.",
        visual: "books",
      },
      {
        prompt: "Which clue best helps you find the main idea of a paragraph?",
        hint: "Think about where writers usually put it.",
        options: ["The longest sentence", "The first or last sentence", "Every proper noun"],
        answer: 1,
        why: "Writers often state the main idea up front or land on it at the end — skim those first.",
        visual: "books",
      },
    ],
  },
  science: {
    label: "Science",
    accent: "#109c6a",
    questions: [
      {
        prompt: "Why do we see phases of the Moon?",
        hint: "Think about light and position.",
        options: ["The Moon makes its own light", "Earth blocks sunlight", "We see different lit portions as it orbits"],
        answer: 2,
        why: "Half the Moon is always lit by the Sun; as it orbits, we see that lit half from different angles.",
        visual: "orbit",
      },
      {
        prompt: "In a fair test, how many variables do you change?",
        hint: "One thing at a time — that's the point.",
        options: ["None", "One", "All of them"],
        answer: 1,
        why: "Change one variable and keep the others controlled, so you know what caused the result.",
        visual: "orbit",
      },
    ],
  },
  english: {
    label: "English",
    accent: "#7a3ba0",
    questions: [
      {
        prompt: "Which sentence uses correct comma punctuation?",
        hint: "Look for the introductory clause.",
        options: ["After the rain stopped, we walked home.", "After the rain, stopped we walked home.", "After the rain stopped we, walked home."],
        answer: 0,
        why: "A comma after an introductory clause ('After the rain stopped') keeps the sentence readable.",
        visual: "sentence",
      },
      {
        prompt: "Which word is the strongest verb choice? ‘The wind ___ the branches.’",
        hint: "Choose the verb with the most image in it.",
        options: ["moved", "was near", "whipped", "did"],
        answer: 2,
        why: "‘Whipped’ gives speed, force and image in one word — that's precise writing.",
        visual: "sentence",
      },
    ],
  },
};

/* ---------------- parent + student dashboard demo data ---------------- */
export const DEMO_TREND = [
  { week: "Wk 1", Reading: 58, Math: 61, Science: 52, English: 57 },
  { week: "Wk 2", Reading: 63, Math: 66, Science: 58, English: 61 },
  { week: "Wk 3", Reading: 69, Math: 71, Science: 63, English: 68 },
  { week: "Wk 4", Reading: 74, Math: 78, Science: 68, English: 74 },
  { week: "Wk 5", Reading: 78, Math: 84, Science: 72, English: 81 },
];

export const DEMO_PROGRESS = [
  { subject: "Reading", value: 78, color: "#1160e8" },
  { subject: "Math", value: 84, color: "#0b4cbb" },
  { subject: "Science", value: 72, color: "#109c6a" },
  { subject: "English", value: 81, color: "#7a3ba0" },
];

export const STUDENT_WEEK = [
  { day: "Mon", minutes: 40 },
  { day: "Tue", minutes: 25 },
  { day: "Wed", minutes: 45 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 20 },
  { day: "Sat", minutes: 50 },
];

export const BOOKING = {
  subjects: SUBJECTS.map((s) => ({ id: s.id, name: s.name, accent: s.accent })),
  grades: [
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ],
  formats: [
    { id: "online", name: "Online 1-to-1", note: "Live video sessions with shared workspace", icon: "Video" },
    { id: "center", name: "At the Academy", note: "In-person session at the learning space", icon: "GraduationCap" },
    { id: "small", name: "Online Small Group", note: "2–3 students, one focused skill", icon: "Users" },
  ],
  times: ["Mon 4:30 PM", "Tue 5:00 PM", "Wed 4:00 PM", "Thu 6:15 PM", "Sat 10:00 AM"],
};
