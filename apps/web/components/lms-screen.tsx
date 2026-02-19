"use client";

import {
  DsAvatar,
  DsBadge,
  DsButton,
  DsCard,
  DsChatBubble,
  DsChatInput,
  type DsChatInputSendPayload,
  DsInput,
  DsProgress,
  DsSidebar,
  type DsTreeItemStatus,
  type DsTreeNode,
} from "@workspace/design-system";
import {
  BellIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  MessageSquareIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { type CSSProperties, useMemo, useState } from "react";
import {
  type Course,
  type Lesson,
  type LessonStatus,
  type LessonType,
  mockChatMessages,
  mockCourse,
  mockSidebarExtraModules,
} from "@/lib/mock-data";

type LessonSectionKey = "video" | "theory" | "quiz";

type LessonWithContext = Lesson & {
  moduleId: string;
  moduleTitle: string;
  sectionKey: LessonSectionKey;
  sectionLabel: string;
};

const LESSON_GROUP_TITLES: Record<string, string> = {
  "m0-fundamentals": "Introduzione al mondo dei dati",
  "m1-excel": "Business intelligence",
};

const LESSON_SECTIONS: Record<
  LessonSectionKey,
  { idSuffix: string; label: string }
> = {
  video: {
    idSuffix: "video",
    label: "Video",
  },
  theory: {
    idSuffix: "theory",
    label: "Teoria",
  },
  quiz: {
    idSuffix: "quiz",
    label: "Quiz",
  },
};

function formatNowTime() {
  return new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function getSectionKey(type: LessonType): LessonSectionKey {
  if (type === "video") {
    return "video";
  }

  if (type === "quiz") {
    return "quiz";
  }

  return "theory";
}

function mapLessonStatusToTreeStatus(status: LessonStatus): DsTreeItemStatus {
  if (status === "completed") {
    return "completed";
  }

  if (status === "in-progress") {
    return "in-progress";
  }

  return "locked";
}

function getAggregateStatus(lessons: Lesson[]): DsTreeItemStatus {
  const statuses = lessons.map((lesson) => lesson.status);

  if (statuses.every((status) => status === "completed")) {
    return "completed";
  }

  if (statuses.some((status) => status === "in-progress")) {
    return "in-progress";
  }

  if (statuses.every((status) => status === "locked")) {
    return "locked";
  }

  return "new";
}

function buildSidebarItems(course: Course): DsTreeNode[] {
  const coreNodes = course.modules.map((module) => {
    const sectionLessons = module.lessons.reduce<
      Record<LessonSectionKey, Lesson[]>
    >(
      (accumulator, lesson) => {
        const sectionKey = getSectionKey(lesson.type);
        accumulator[sectionKey].push(lesson);
        return accumulator;
      },
      {
        video: [],
        theory: [],
        quiz: [],
      }
    );

    const moduleStatus = getAggregateStatus(module.lessons);
    const lessonGroupTitle =
      LESSON_GROUP_TITLES[module.id] ?? "Percorso didattico";

    const sectionNodes = Object.entries(LESSON_SECTIONS).reduce<DsTreeNode[]>(
      (accumulator, [sectionKey, sectionConfig]) => {
        const typedSectionKey = sectionKey as LessonSectionKey;
        const scopedLessons = sectionLessons[typedSectionKey];

        if (scopedLessons.length === 0) {
          return accumulator;
        }

        accumulator.push({
          id: `${module.id}-section-${sectionConfig.idSuffix}`,
          label: sectionConfig.label,
          icon: <BookOpenIcon className="size-3.5" />,
          status: getAggregateStatus(scopedLessons),
          children: scopedLessons.map((lesson) => ({
            id: lesson.id,
            label: lesson.title,
            icon: <FileTextIcon className="size-3.5" />,
            status: mapLessonStatusToTreeStatus(lesson.status),
          })),
        });

        return accumulator;
      },
      []
    );

    return {
      id: module.id,
      label: module.title,
      icon: <FolderIcon className="size-3.5" />,
      status: moduleStatus,
      children: [
        {
          id: `${module.id}-lesson-group`,
          label: lessonGroupTitle,
          icon: <BookOpenIcon className="size-3.5" />,
          status: moduleStatus,
          children: sectionNodes,
        },
      ],
    };
  });

  return [
    {
      id: "welcome-data-analyst",
      label: "Welcome: Data Analyst",
      icon: <FolderIcon className="size-3.5" />,
      status: "in-progress",
    },
    ...coreNodes,
    ...mockSidebarExtraModules.map((label, index) => ({
      id: `extra-module-${index + 1}`,
      label,
      icon: <FolderIcon className="size-3.5" />,
      status: "locked" as const,
    })),
  ];
}

function getLessonBody(lesson: LessonWithContext): string[] {
  const typeCopy: Record<LessonType, string[]> = {
    video: [
      "Guarda il contenuto e annota i passaggi operativi principali prima di proseguire.",
      "Concentrati su metriche, definizioni e metodo di lettura dei dati mostrati a video.",
    ],
    article: [
      "Leggi la sezione teorica con attenzione: definisce il framework di lavoro della prossima esercitazione.",
      "Evidenzia i termini tecnici che dovrai ritrovare nella dashboard durante il laboratorio.",
    ],
    quiz: [
      "Completa il quiz per verificare la comprensione della lezione e sbloccare il modulo successivo.",
      "Ripassa i concetti chiave se il punteggio risulta sotto la soglia minima richiesta.",
    ],
  };

  return [
    lesson.content ?? "Contenuto lezione non disponibile.",
    ...typeCopy[lesson.type],
  ];
}

export function LmsScreen() {
  const lessons = useMemo<LessonWithContext[]>(
    () =>
      mockCourse.modules.flatMap((module) =>
        module.lessons.map((lesson) => {
          const sectionKey = getSectionKey(lesson.type);

          return {
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title,
            sectionKey,
            sectionLabel: LESSON_SECTIONS[sectionKey].label,
          };
        })
      ),
    []
  );

  const [activeLessonId, setActiveLessonId] = useState(
    lessons.find((lesson) => lesson.status === "in-progress")?.id ??
      lessons[0]?.id ??
      ""
  );
  const [chatPanelOpen, setChatPanelOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState(mockChatMessages);

  const sidebarItems = useMemo(() => buildSidebarItems(mockCourse), []);

  const lessonById = useMemo(
    () =>
      lessons.reduce<Record<string, LessonWithContext>>(
        (accumulator, lesson) => {
          accumulator[lesson.id] = lesson;
          return accumulator;
        },
        {}
      ),
    [lessons]
  );

  const activeLesson =
    lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];

  const expandedItemIds = useMemo(() => {
    if (!activeLesson) {
      return [];
    }

    return [
      activeLesson.moduleId,
      `${activeLesson.moduleId}-lesson-group`,
      `${activeLesson.moduleId}-section-${LESSON_SECTIONS[activeLesson.sectionKey].idSuffix}`,
    ];
  }, [activeLesson]);

  if (!activeLesson) {
    return null;
  }

  const activeModule =
    mockCourse.modules.find((module) => module.id === activeLesson.moduleId) ??
    mockCourse.modules[0];

  const completedCount = lessons.filter(
    (lesson) => lesson.status === "completed"
  ).length;
  const inProgressCount = lessons.filter(
    (lesson) => lesson.status === "in-progress"
  ).length;
  const progressValue =
    lessons.length > 0
      ? ((completedCount + inProgressCount * 0.5) / lessons.length) * 100
      : 0;

  const activeIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLesson.id
  );
  const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : undefined;
  const nextLesson =
    activeIndex >= 0 && activeIndex < lessons.length - 1
      ? lessons[activeIndex + 1]
      : undefined;

  const lessonBody = getLessonBody(activeLesson);

  function handleSidebarSelect(item: DsTreeNode) {
    if (lessonById[item.id]) {
      setActiveLessonId(item.id);
    }
  }

  function handleChatSend(payload: DsChatInputSendPayload) {
    const normalizedMessage =
      payload.message.trim() ||
      (payload.attachments.length > 0
        ? `Attachment: ${payload.attachments.map((attachment) => attachment.name).join(", ")}`
        : "");

    if (!normalizedMessage) {
      return;
    }

    setChatMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `user-${Date.now()}`,
        variant: "user",
        message: normalizedMessage,
        timestamp: formatNowTime(),
      },
    ]);
  }

  return (
    <div className="h-svh overflow-hidden bg-[linear-gradient(180deg,#060919_0%,#070c1f_40%,#050716_100%)] text-epicode-foreground">
      <div className="flex h-full">
        <DsSidebar
          activeItemId={activeLesson.id}
          expandedItemIds={expandedItemIds}
          items={sidebarItems}
          onItemSelect={handleSidebarSelect}
          providerClassName="w-auto shrink-0"
          providerStyle={
            {
              "--sidebar-width": "18.4rem",
              "--sidebar-width-icon": "4rem",
            } as CSSProperties
          }
          title={mockCourse.title}
        />

        <div className="flex min-w-0 flex-1">
          <main className="flex h-full min-w-0 flex-1 overflow-y-auto bg-epicode-ink px-4 py-5 md:px-8">
            <div className="mx-8 flex w-full flex-1 flex-col gap-4">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full max-w-md bg-black">
                  <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-epicode-muted-foreground" />
                  <DsInput
                    aria-label="Search in course"
                    className="h-11 rounded-lg border-epicode-border/85 bg-epicode-ink/45 pr-14 pl-10 text-sm"
                    placeholder="Search in course"
                    type="search"
                  />
                  <span className="pointer-events-none absolute top-1/2 right-2 inline-flex h-6 -translate-y-1/2 items-center rounded-md border border-epicode-border/80 bg-epicode-ink px-2 font-medium text-[11px] text-epicode-muted-foreground">
                    ⌘K
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <DsButton
                      aria-label="Notifications"
                      className="h-9 w-9 px-0"
                      icon={<BellIcon className="size-4" />}
                      variant="ghost"
                    />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ff6b6b]" />
                  </div>
                  <DsButton
                    aria-label="User profile"
                    className="h-9 w-9 px-0"
                    icon={<UserIcon className="size-4" />}
                    variant="ghost"
                  />
                </div>
              </header>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-epicode-ink/35 px-3 py-2.500">
                <div className="min-w-0">
                  <p className="truncate font-medium text-epicode-foreground/95 text-sm">
                    {mockCourse.title} &gt;{" "}
                    {activeModule?.title ?? mockCourse.title} &gt;{" "}
                    {activeLesson.title}
                  </p>
                </div>

                <div className="w-full min-w-[180px] max-w-[240px]">
                  <DsProgress
                    label={`${Math.round(progressValue)}% complete`}
                    showPercentage={false}
                    size="sm"
                    tone="brand"
                    value={progressValue}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="mt-6 mb-2 font-display font-semibold text-[2.5rem] leading-none tracking-tight">
                  {activeLesson.title}
                </h1>
                <DsBadge status={activeLesson.status} />
              </div>

              <DsCard
                className="overflow-hidden border-0 bg-transparent shadow-none ring-0"
                contentClassName="space-y-4"
                variant="lesson"
              >
                <div className="relative overflow-hidden bg-[#141b43] p-6 md:p-10">
                  <div className="relative flex min-h-[340px] flex-col justify-between md:min-h-[470px]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-3 rounded-sm bg-transparent px-1 py-0.5 text-white" />
                      <div className="inline-flex h-9 items-center rounded-md border border-white/35 bg-white px-4 font-medium text-[13px] text-epicode-ink">
                        {activeLesson.title}
                      </div>
                    </div>

                    <h2 className="max-w-xl font-display font-semibold text-5xl text-white leading-[1.08] md:text-[3.25rem]">
                      Contenuto della lezione
                    </h2>
                  </div>
                </div>

                <article className="space-y-3 text-epicode-muted-foreground text-sm leading-7">
                  {lessonBody.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              </DsCard>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
                <DsButton
                  disabled={!previousLesson}
                  icon={<ChevronLeftIcon className="size-4" />}
                  onClick={() => {
                    if (previousLesson) {
                      setActiveLessonId(previousLesson.id);
                    }
                  }}
                  variant="secondary"
                >
                  Previous lesson
                </DsButton>

                <DsButton
                  disabled={!nextLesson}
                  icon={<ChevronRightIcon className="size-4" />}
                  iconPosition="end"
                  onClick={() => {
                    if (nextLesson) {
                      setActiveLessonId(nextLesson.id);
                    }
                  }}
                >
                  Next lesson
                </DsButton>
              </div>
            </div>
          </main>

          <aside
            className={[
              "sticky top-0 hidden h-full shrink-0 overflow-hidden border-epicode-sidebar-border/95 border-l bg-epicode-sidebar-bg transition-[width] duration-300 ease-out xl:flex xl:flex-col",
              chatPanelOpen ? "w-[286px]" : "w-10",
            ].join(" ")}
          >
            {chatPanelOpen ? (
              <>
                <header className="flex items-center justify-between border-epicode-sidebar-border/90 border-b px-3 py-3">
                  <div className="flex items-center gap-2 font-display font-semibold text-sm tracking-tight">
                    <MessageSquareIcon className="size-4 text-epicode-primary" />
                    <span>Comments</span>
                  </div>
                  <DsButton
                    aria-label="Collapse comments panel"
                    className="h-7 w-7 px-0"
                    icon={<ChevronRightIcon className="size-4" />}
                    onClick={() => setChatPanelOpen(false)}
                    variant="ghost"
                  />
                </header>

                <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
                  {chatMessages.map((chatMessage) => (
                    <DsChatBubble
                      avatar={
                        chatMessage.variant === "assistant" ? (
                          <DsAvatar
                            fallback="AI"
                            showStatus
                            size="sm"
                            status="online"
                          />
                        ) : (
                          <DsAvatar
                            fallback="ME"
                            showStatus={false}
                            size="sm"
                          />
                        )
                      }
                      key={chatMessage.id}
                      message={chatMessage.message}
                      timestamp={chatMessage.timestamp}
                      variant={chatMessage.variant}
                    />
                  ))}
                </div>

                <div className="border-epicode-sidebar-border/90 border-t p-3">
                  <DsChatInput
                    allowAttachments={false}
                    className="rounded-lg border-none bg-transparent p-3 shadow-none"
                    onSend={handleChatSend}
                    placeholder="Leave a comment..."
                    rows={6}
                    sendLabel="Submit"
                    size="sm"
                    textareaClassName="min-h-[148px] rounded-lg border-epicode-border/80 bg-epicode-ink/35"
                  />
                </div>
              </>
            ) : (
              <div className="flex h-full items-start justify-center pt-3">
                <DsButton
                  aria-label="Open comments panel"
                  className="h-7 w-7 px-0"
                  icon={<ChevronLeftIcon className="size-4" />}
                  onClick={() => setChatPanelOpen(true)}
                  variant="ghost"
                />
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
