import { type AppLocale, getMockDictionary } from "@/lib/i18n";

export type LessonType = "video" | "article" | "quiz";
export type LessonStatus = "completed" | "in-progress" | "locked";

export interface Lesson {
  content?: string;
  id: string;
  status: LessonStatus;
  title: string;
  type: LessonType;
}

export interface Module {
  id: string;
  lessons: Lesson[];
  title: string;
}

export interface Course {
  id: string;
  modules: Module[];
  title: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  variant: "assistant" | "user";
}

export function getMockCourse(locale: AppLocale): Course {
  const { course } = getMockDictionary(locale);

  return {
    id: course.id,
    title: course.title,
    modules: course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        status: lesson.status,
        content: lesson.content,
      })),
    })),
  };
}

export function getMockChatMessages(locale: AppLocale): ChatMessage[] {
  const { chatMessages } = getMockDictionary(locale);

  return chatMessages.map((message) => ({
    id: message.id,
    variant: message.variant,
    message: message.message,
    timestamp: message.timestamp,
  }));
}

export function getMockSidebarExtraModules(locale: AppLocale): string[] {
  const { sidebarExtraModules } = getMockDictionary(locale);
  return [...sidebarExtraModules];
}

export const mockCourse = getMockCourse("it");
export const mockChatMessages = getMockChatMessages("it");
export const mockSidebarExtraModules = getMockSidebarExtraModules("it");
