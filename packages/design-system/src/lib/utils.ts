import { cn as primitiveCn } from "@workspace/ui/lib/utils";

const WHITESPACE_REGEX = /\s+/;

export function cn(...inputs: Parameters<typeof primitiveCn>) {
  return primitiveCn(...inputs);
}