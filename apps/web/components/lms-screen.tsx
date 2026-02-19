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
import { useRouter } from "next/navigation";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import {
  type AppLocale,
  getLmsDictionary,
  type LmsDictionary,
  resolveLocale,
} from "@/lib/i18n";
import {
  type ChatMessage,
  type Course,
  getMockChatMessages,
  getMockCourse,
  getMockSidebarExtraModules,
  type Lesson,
  type LessonStatus,
  type LessonType,
} from "@/lib/mock-data";

type LessonSectionKey = "video" | "theory" | "quiz";

interface LessonSectionMeta {
  idSuffix: string;
  label: string;
}

type LessonWithContext = Lesson & {
  moduleId: string;
  moduleTitle: string;
  sectionKey: LessonSectionKey;
  sectionLabel: string;
};

interface BuildSidebarOptions {
  defaultLessonGroupLabel: string;
  extraModules: string[];
  lessonGroupTitles: Record<string, string>;
  lessonSections: Record<LessonSectionKey, LessonSectionMeta>;
  welcomeLabel: string;
}

const LOCALE_OPTIONS: AppLocale[] = ["it", "en"];

function formatNowTime(locale: AppLocale) {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
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

function createLessonSections(
  dictionary: LmsDictionary
): Record<LessonSectionKey, LessonSectionMeta> {
  return {
    video: {
      idSuffix: "video",
      label: dictionary.sectionVideo,
    },
    theory: {
      idSuffix: "theory",
      label: dictionary.sectionTheory,
    },
    quiz: {
      idSuffix: "quiz",
      label: dictionary.sectionQuiz,
    },
  };
}

function createLessonGroupTitles(dictionary: LmsDictionary) {
  return {
    "m0-fundamentals": dictionary.lessonGroupIntro,
    "m1-excel": dictionary.lessonGroupBusiness,
  };
}

function buildSidebarItems(
  course: Course,
  options: BuildSidebarOptions
): DsTreeNode[] {
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
      options.lessonGroupTitles[module.id] ?? options.defaultLessonGroupLabel;

    const sectionNodes = Object.entries(options.lessonSections).reduce<
      DsTreeNode[]
    >((accumulator, [sectionKey, sectionConfig]) => {
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
    }, []);

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
      label: options.welcomeLabel,
      icon: <FolderIcon className="size-3.5" />,
      status: "in-progress",
    },
    ...coreNodes,
    ...options.extraModules.map((label, index) => ({
      id: `extra-module-${index + 1}`,
      label,
      icon: <FolderIcon className="size-3.5" />,
      status: "locked" as const,
    })),
  ];
}

function getLessonBody(
  lesson: LessonWithContext,
  dictionary: LmsDictionary
): string[] {
  const typeCopy: Record<LessonType, readonly [string, string]> = {
    video: dictionary.videoBody,
    article: dictionary.articleBody,
    quiz: dictionary.quizBody,
  };

  return [
    lesson.content ?? dictionary.missingContent,
    ...typeCopy[lesson.type],
  ];
}

interface LocaleSwitcherProps {
  currentLocale: AppLocale;
  onChange: (nextLocale: AppLocale) => void;
}

function LocaleSwitcher({ currentLocale, onChange }: LocaleSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-epicode-border/70 bg-epicode-ink/45 p-1">
      {LOCALE_OPTIONS.map((localeOption) => {
        const isActiveLocale = localeOption === currentLocale;

        return (
          <button
            className={[
              "h-7 min-w-8 rounded px-2 font-semibold text-[11px] tracking-[0.08em] transition-colors",
              isActiveLocale
                ? "bg-epicode-primary text-white"
                : "text-epicode-muted-foreground hover:text-epicode-foreground",
            ].join(" ")}
            key={localeOption}
            onClick={() => onChange(localeOption)}
            type="button"
          >
            {localeOption.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

interface MainToolbarProps {
  currentLocale: AppLocale;
  dictionary: LmsDictionary;
  onLocaleChange: (nextLocale: AppLocale) => void;
}

function MainToolbar({
  currentLocale,
  dictionary,
  onLocaleChange,
}: MainToolbarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full max-w-md">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-epicode-muted-foreground" />
        <DsInput
          aria-label={dictionary.searchPlaceholder}
          className="h-11 rounded-lg border-epicode-border/85 bg-epicode-ink/45 pr-14 pl-10 text-sm"
          placeholder={dictionary.searchPlaceholder}
          type="search"
        />
        <span className="pointer-events-none absolute top-1/2 right-2 inline-flex h-6 -translate-y-1/2 items-center rounded-md border border-epicode-border/80 bg-epicode-ink px-2 font-medium text-[11px] text-epicode-muted-foreground">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <LocaleSwitcher
          currentLocale={currentLocale}
          onChange={onLocaleChange}
        />
        <div className="relative">
          <DsButton
            aria-label={dictionary.notificationsAriaLabel}
            className="h-9 w-9 px-0"
            icon={<BellIcon className="size-4" />}
            variant="ghost"
          />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ff6b6b]" />
        </div>
        <DsButton
          aria-label={dictionary.profileAriaLabel}
          className="h-9 w-9 px-0"
          icon={<UserIcon className="size-4" />}
          variant="ghost"
        />
      </div>
    </header>
  );
}

interface LessonMetaProps {
  activeLessonStatus: LessonStatus;
  breadcrumb: string;
  heading: string;
  lessonBody: string[];
  lessonTitle: string;
  progressLabel: string;
  progressValue: number;
}

function LessonMeta({
  activeLessonStatus,
  breadcrumb,
  heading,
  lessonBody,
  lessonTitle,
  progressLabel,
  progressValue,
}: LessonMetaProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-epicode-ink/35 px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate font-medium text-epicode-foreground/95 text-sm">
            {breadcrumb}
          </p>
        </div>

        <div className="w-full min-w-[180px] max-w-[240px]">
          <DsProgress
            label={progressLabel}
            showPercentage={false}
            size="sm"
            tone="brand"
            value={progressValue}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="mt-6 mb-2 font-display font-semibold text-[2.5rem] leading-none tracking-tight">
          {lessonTitle}
        </h1>
        <DsBadge status={activeLessonStatus} />
      </div>

      <DsCard
        className="overflow-hidden border-0 bg-transparent shadow-none ring-0"
        contentClassName="space-y-4"
        variant="lesson"
      >
        <div className="relative overflow-hidden bg-[#141b43] p-6 md:p-10">
          <div className="relative flex min-h-[240px] flex-col justify-between md:min-h-[370px]">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-3 rounded-sm bg-transparent px-1 py-0.5 text-white" />
              <div className="inline-flex h-9 items-center rounded-md border border-white/35 bg-white px-4 font-medium text-[13px] text-epicode-ink">
                {lessonTitle}
              </div>
            </div>

            <h2 className="max-w-xl font-display font-semibold text-5xl text-white leading-[1.08] md:text-[3.25rem]">
              {heading}
            </h2>
          </div>
        </div>

        <article className="space-y-3 text-epicode-muted-foreground text-sm leading-7">
          {lessonBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </DsCard>
    </>
  );
}

interface LessonNavigationProps {
  nextLabel: string;
  onNext: () => void;
  onPrevious: () => void;
  previousLabel: string;
  showNext: boolean;
  showPrevious: boolean;
}

function LessonNavigation({
  nextLabel,
  onNext,
  onPrevious,
  previousLabel,
  showNext,
  showPrevious,
}: LessonNavigationProps) {
  return (
    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
      <DsButton
        disabled={!showPrevious}
        icon={<ChevronLeftIcon className="size-4" />}
        onClick={onPrevious}
        variant="secondary"
      >
        {previousLabel}
      </DsButton>

      <DsButton
        disabled={!showNext}
        icon={<ChevronRightIcon className="size-4" />}
        iconPosition="end"
        onClick={onNext}
      >
        {nextLabel}
      </DsButton>
    </div>
  );
}

interface ChatSidebarPanelProps {
  chatMessages: ChatMessage[];
  chatPanelOpen: boolean;
  dictionary: LmsDictionary;
  onCollapse: () => void;
  onExpand: () => void;
  onSend: (payload: DsChatInputSendPayload) => void;
}

function ChatSidebarPanel({
  chatMessages,
  chatPanelOpen,
  dictionary,
  onCollapse,
  onExpand,
  onSend,
}: ChatSidebarPanelProps) {
  return (
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
              <span>{dictionary.commentsLabel}</span>
            </div>
            <DsButton
              aria-label={dictionary.collapseCommentsPanel}
              className="h-7 w-7 px-0"
              icon={<ChevronRightIcon className="size-4" />}
              onClick={onCollapse}
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
                    <DsAvatar fallback="ME" showStatus={false} size="sm" />
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
              onSend={onSend}
              placeholder={dictionary.submitCommentPlaceholder}
              rows={6}
              sendLabel={dictionary.sendLabel}
              size="sm"
              textareaClassName="min-h-[148px] rounded-lg border-epicode-border/80 bg-epicode-ink/35"
            />
          </div>
        </>
      ) : (
        <div className="flex h-full items-start justify-center pt-3">
          <DsButton
            aria-label={dictionary.expandCommentsPanel}
            className="h-7 w-7 px-0"
            icon={<ChevronLeftIcon className="size-4" />}
            onClick={onExpand}
            variant="ghost"
          />
        </div>
      )}
    </aside>
  );
}

export function LmsScreen({ locale: rawLocale = "it" }: { locale?: string }) {
  const router = useRouter();
  const locale = resolveLocale(rawLocale);
  const dictionary = getLmsDictionary(locale);
  const course = useMemo(() => getMockCourse(locale), [locale]);
  const sidebarExtraModules = useMemo(
    () => getMockSidebarExtraModules(locale),
    [locale]
  );
  const localizedChatMessages = useMemo(
    () => getMockChatMessages(locale),
    [locale]
  );

  const lessonSections = useMemo(
    () => createLessonSections(dictionary),
    [dictionary]
  );

  const lessonGroupTitles = useMemo(
    () => createLessonGroupTitles(dictionary),
    [dictionary]
  );

  const lessons = useMemo<LessonWithContext[]>(
    () =>
      course.modules.flatMap((module) =>
        module.lessons.map((lesson) => {
          const sectionKey = getSectionKey(lesson.type);

          return {
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title,
            sectionKey,
            sectionLabel: lessonSections[sectionKey].label,
          };
        })
      ),
    [course.modules, lessonSections]
  );

  const [activeLessonId, setActiveLessonId] = useState(
    lessons.find((lesson) => lesson.status === "in-progress")?.id ??
      lessons[0]?.id ??
      ""
  );
  const [chatPanelOpen, setChatPanelOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState(localizedChatMessages);

  useEffect(() => {
    setChatMessages(localizedChatMessages);
  }, [localizedChatMessages]);

  const sidebarItems = useMemo(
    () =>
      buildSidebarItems(course, {
        defaultLessonGroupLabel: dictionary.defaultLessonGroupLabel,
        extraModules: sidebarExtraModules,
        lessonGroupTitles,
        lessonSections,
        welcomeLabel: dictionary.welcomeDataAnalyst,
      }),
    [
      course,
      dictionary.defaultLessonGroupLabel,
      dictionary.welcomeDataAnalyst,
      lessonGroupTitles,
      lessonSections,
      sidebarExtraModules,
    ]
  );

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
      `${activeLesson.moduleId}-section-${lessonSections[activeLesson.sectionKey].idSuffix}`,
    ];
  }, [activeLesson, lessonSections]);

  if (!activeLesson) {
    return null;
  }

  const activeModule =
    course.modules.find((module) => module.id === activeLesson.moduleId) ??
    course.modules[0];

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

  const lessonBody = getLessonBody(activeLesson, dictionary);
  const breadcrumb = `${course.title} > ${activeModule?.title ?? course.title} > ${activeLesson.title}`;
  const progressLabel = dictionary.progressComplete(Math.round(progressValue));

  function handleSidebarSelect(item: DsTreeNode) {
    if (lessonById[item.id]) {
      setActiveLessonId(item.id);
    }
  }

  function handleChatSend(payload: DsChatInputSendPayload) {
    const normalizedMessage =
      payload.message.trim() ||
      (payload.attachments.length > 0
        ? `${dictionary.attachmentPrefix}: ${payload.attachments.map((attachment) => attachment.name).join(", ")}`
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
        timestamp: formatNowTime(locale),
      },
    ]);
  }

  function handleLocaleChange(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      return;
    }

    const search = new URLSearchParams(window.location.search);
    search.set("lang", nextLocale);
    const query = search.toString();
    const nextUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    router.replace(nextUrl);
  }

  function goToPreviousLesson() {
    if (previousLesson) {
      setActiveLessonId(previousLesson.id);
    }
  }

  function goToNextLesson() {
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
    }
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
          title={course.title}
        />

        <div className="flex min-w-0 flex-1">
          <main className="flex h-full min-w-0 flex-1 overflow-y-auto bg-epicode-ink px-4 py-5 md:px-8 md:py-2">
            <div className="mx-4 flex w-full flex-1 flex-col gap-4">
              <MainToolbar
                currentLocale={locale}
                dictionary={dictionary}
                onLocaleChange={handleLocaleChange}
              />

              <LessonMeta
                activeLessonStatus={activeLesson.status}
                breadcrumb={breadcrumb}
                heading={dictionary.contentHeading}
                lessonBody={lessonBody}
                lessonTitle={activeLesson.title}
                progressLabel={progressLabel}
                progressValue={progressValue}
              />

              <LessonNavigation
                nextLabel={dictionary.nextLesson}
                onNext={goToNextLesson}
                onPrevious={goToPreviousLesson}
                previousLabel={dictionary.previousLesson}
                showNext={!!nextLesson}
                showPrevious={!!previousLesson}
              />
            </div>
          </main>

          <ChatSidebarPanel
            chatMessages={chatMessages}
            chatPanelOpen={chatPanelOpen}
            dictionary={dictionary}
            onCollapse={() => setChatPanelOpen(false)}
            onExpand={() => setChatPanelOpen(true)}
            onSend={handleChatSend}
          />
        </div>
      </div>
    </div>
  );
}
