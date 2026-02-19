export const en = {
  mock: {
    chatMessages: [
      {
        id: "ai-1",
        message:
          "I can help with a recap of the Data 1 lesson or a quick mini-quiz.",
        timestamp: "10:41",
        variant: "assistant",
      },
      {
        id: "user-1",
        message: "Let's start with the core KPIs and key definitions.",
        timestamp: "10:42",
        variant: "user",
      },
      {
        id: "ai-2",
        message:
          "Great: focus on conversion rate, retention, churn, and week-over-week trends.",
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
              title: "1. Intro to data analysis (1)",
              type: "video",
              status: "completed",
              content:
                "Overview of metrics, datasets, and data-driven decision-making workflows.",
            },
            {
              id: "m0-lesson-intro-2",
              title: "2. Intro to data analysis (2)",
              type: "video",
              status: "completed",
              content:
                "Core KPIs, operational dashboards, and continuous monitoring.",
            },
            {
              id: "m0-lesson-analysis",
              title: "3. Data analysis",
              type: "video",
              status: "completed",
              content:
                "Exploratory analysis method, hypothesis definition, and result validation.",
            },
            {
              id: "m0-lesson-dati-1",
              title: "Data 1",
              type: "article",
              status: "in-progress",
              content:
                "Theory lesson on data structures, sources, and quality criteria.",
            },
          ],
        },
        {
          id: "m1-excel",
          title: "M1. Excel: February 9 - March 13",
          lessons: [
            {
              id: "m1-lesson-bi",
              title: "1. Business intelligence",
              type: "article",
              status: "completed",
              content:
                "KPIs, descriptive analysis, and insight interpretation for business support.",
            },
            {
              id: "m1-lesson-power-bi",
              title: "2. Power BI foundations",
              type: "video",
              status: "locked",
              content:
                "Introduction to BI tooling and operational dashboard organization.",
            },
            {
              id: "m1-lesson-quality-check",
              title: "3. Data quality checkpoint",
              type: "quiz",
              status: "locked",
              content:
                "Check on data quality controls, validation, and dataset cleaning.",
            },
            {
              id: "m1-lesson-reporting-quiz",
              title: "4. Reporting quiz",
              type: "quiz",
              status: "locked",
              content:
                "Final quiz on reporting, insights, and presenting outcomes.",
            },
          ],
        },
      ],
    },
    sidebarExtraModules: [
      "Professional roles & Open Data",
      "Business intelligence",
      "Excel",
      "Final exam",
      "M2: March 16 - April 17",
      "M3. April 20 - May 22",
      "M4. Google Looker Studio: May 23 - June 14",
      "M5. Power BI: June 15 - July 17",
      "Capstone Project & Career Training",
    ],
  },
  ui: {
    articleBody: [
      "Read the theory section carefully: it defines the framework for the next exercise.",
      "Highlight key terms you will later find inside the dashboard workshop.",
    ],
    attachmentPrefix: "Attachment",
    collapseCommentsPanel: "Collapse comments panel",
    commentsLabel: "Comments",
    contentHeading: "Lesson content",
    defaultLessonGroupLabel: "Learning path",
    expandCommentsPanel: "Open comments panel",
    lessonGroupBusiness: "Business intelligence",
    lessonGroupIntro: "Introduction to data",
    missingContent: "Lesson content is not available.",
    nextLesson: "Next lesson",
    notificationsAriaLabel: "Notifications",
    previousLesson: "Previous lesson",
    profileAriaLabel: "User profile",
    progressComplete: (value: number) => `${value}% complete`,
    quizBody: [
      "Complete the quiz to verify your understanding and unlock the next module.",
      "Review key concepts again if your score is below the required threshold.",
    ],
    searchPlaceholder: "Search in course",
    sectionQuiz: "Quiz",
    sectionTheory: "Theory",
    sectionVideo: "Video",
    sendLabel: "Submit",
    submitCommentPlaceholder: "Leave a comment...",
    videoBody: [
      "Watch the content and note the main operational steps before moving on.",
      "Focus on metrics, definitions, and the method used to read the data in the video.",
    ],
    welcomeDataAnalyst: "Welcome: Data Analyst",
  },
} as const;
