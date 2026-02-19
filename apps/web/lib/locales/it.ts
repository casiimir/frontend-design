export const it = {
  mock: {
    chatMessages: [
      {
        id: "ai-1",
        message:
          "Posso aiutarti con un recap della lezione Dati 1 oppure con un mini quiz.",
        timestamp: "10:41",
        variant: "assistant",
      },
      {
        id: "user-1",
        message: "Partiamo dai KPI principali e dalle definizioni chiave.",
        timestamp: "10:42",
        variant: "user",
      },
      {
        id: "ai-2",
        message:
          "Perfetto: focalizzati su conversion rate, retention, churn e trend settimana su settimana.",
        timestamp: "10:43",
        variant: "assistant",
      },
    ],
    course: {
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
              content:
                "Metodo di analisi esplorativa, ipotesi e verifica dei risultati.",
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
              content:
                "Verifica su quality checks, validazione e pulizia dei dataset.",
            },
            {
              id: "m1-lesson-reporting-quiz",
              title: "4. Reporting quiz",
              type: "quiz",
              status: "locked",
              content:
                "Quiz finale su reporting, insight e presentazione dei risultati.",
            },
          ],
        },
      ],
    },
    sidebarExtraModules: [
      "Figure professionali & Open Data",
      "Business intelligence",
      "Excel",
      "Esame finale",
      "M2: marzo 16 - aprile 17",
      "M3. aprile 20 - maggio 22",
      "M4. Google Looker Studio: maggio 23 - giugno 14",
      "M5. Power BI: giugno 15 - luglio 17",
      "Capstone Project & Career Training",
    ],
  },
  ui: {
    articleBody: [
      "Leggi la sezione teorica con attenzione: definisce il framework di lavoro della prossima esercitazione.",
      "Evidenzia i termini tecnici che dovrai ritrovare nella dashboard durante il laboratorio.",
    ],
    attachmentPrefix: "Allegato",
    collapseCommentsPanel: "Chiudi pannello commenti",
    commentsLabel: "Comments",
    contentHeading: "Contenuto della lezione",
    defaultLessonGroupLabel: "Percorso didattico",
    expandCommentsPanel: "Apri pannello commenti",
    lessonGroupBusiness: "Business intelligence",
    lessonGroupIntro: "Introduzione al mondo dei dati",
    missingContent: "Contenuto lezione non disponibile.",
    nextLesson: "Lezione successiva",
    notificationsAriaLabel: "Notifiche",
    previousLesson: "Lezione precedente",
    profileAriaLabel: "Profilo utente",
    progressComplete: (value: number) => `${value}% completato`,
    quizBody: [
      "Completa il quiz per verificare la comprensione della lezione e sbloccare il modulo successivo.",
      "Ripassa i concetti chiave se il punteggio risulta sotto la soglia minima richiesta.",
    ],
    searchPlaceholder: "Cerca nel corso",
    sectionQuiz: "Quiz",
    sectionTheory: "Teoria",
    sectionVideo: "Video",
    sendLabel: "Invia",
    submitCommentPlaceholder: "Lascia un commento...",
    videoBody: [
      "Guarda il contenuto e annota i passaggi operativi principali prima di proseguire.",
      "Concentrati su metriche, definizioni e metodo di lettura dei dati mostrati a video.",
    ],
    welcomeDataAnalyst: "Welcome: Data Analyst",
  },
} as const;
