export type LessonType = "video" | "article" | "quiz";
export type LessonStatus = "completed" | "in-progress" | "locked";

export type Lesson = {
  content?: string;
  id: string;
  status: LessonStatus;
  title: string;
  type: LessonType;
};

export type Module = {
  id: string;
  lessons: Lesson[];
  title: string;
};

export type Course = {
  id: string;
  modules: Module[];
  title: string;
};

export const mockCourse: Course = {
  id: "course-data-analytics-ai",
  title: "Data Analytics & AI",
  modules: [
    {
      id: "m0-fundamentals",
      title: "M0. Fundamentals",
      lessons: [
        {
          id: "m0-lesson-intro-1",
          title: "1. Intro all'analisi dei dati (1)",
          type: "video",
          status: "completed",
          content:
            "Panoramica su metrica, dataset e processi decisionali data-driven.",
        },
        {
          id: "m0-lesson-intro-2",
          title: "2. Intro all'analisi dei dati (2)",
          type: "video",
          status: "completed",
          content:
            "KPI principali, dashboard operative e monitoraggio continuo.",
        },
        {
          id: "m0-lesson-analysis",
          title: "3. Analisi dati",
          type: "video",
          status: "completed",
          content: "Metodo di analisi esplorativa, ipotesi e verifica dei risultati.",
        },
        {
          id: "m0-lesson-dati-1",
          title: "Dati 1",
          type: "article",
          status: "in-progress",
          content:
            "Lezione teorica su struttura dei dati, fonti e criteri di qualita.",
        },
      ],
    },
    {
      id: "m1-excel",
      title: "M1. Excel: febbraio 9 - marzo 13",
      lessons: [
        {
          id: "m1-lesson-bi",
          title: "1. Business intelligence",
          type: "article",
          status: "completed",
          content:
            "KPI, analisi descrittiva e lettura insight a supporto del business.",
        },
        {
          id: "m1-lesson-power-bi",
          title: "2. Power BI foundations",
          type: "video",
          status: "locked",
          content:
            "Introduzione al tooling BI e organizzazione delle dashboard operative.",
        },
        {
          id: "m1-lesson-quality-check",
          title: "3. Data quality checkpoint",
          type: "quiz",
          status: "locked",
          content: "Verifica su quality checks, validazione e pulizia dei dataset.",
        },
        {
          id: "m1-lesson-reporting-quiz",
          title: "4. Reporting quiz",
          type: "quiz",
          status: "locked",
          content: "Quiz finale su reporting, insight e presentazione dei risultati.",
        },
      ],
    },
  ],
};

export type ChatMessage = {
  id: string;
  message: string;
  timestamp: string;
  variant: "assistant" | "user";
};

export const mockChatMessages: ChatMessage[] = [
  {
    id: "ai-1",
    variant: "assistant",
    message:
      "Posso aiutarti con un recap della lezione Dati 1 oppure con un mini quiz.",
    timestamp: "10:41",
  },
  {
    id: "user-1",
    variant: "user",
    message: "Partiamo dai KPI principali e dalle definizioni chiave.",
    timestamp: "10:42",
  },
  {
    id: "ai-2",
    variant: "assistant",
    message:
      "Perfetto: focalizzati su conversion rate, retention, churn e trend settimana su settimana.",
    timestamp: "10:43",
  },
];

export const mockSidebarExtraModules = [
  "Figure professionali & Open Data",
  "Business intelligence",
  "Excel",
  "Esame finale",
  "M2: marzo 16 - aprile 17",
  "M3. aprile 20 - maggio 22",
  "M4. Google Looker Studio: maggio 23 - giugno 14",
  "M5. Power BI: giugno 15 - luglio 17",
  "Capstone Project & Career Training",
] as const;
