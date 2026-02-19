import { cn as primitiveCn } from "@workspace/ui/lib/utils";

export function cn(...inputs: Parameters<typeof primitiveCn>) {
  return primitiveCn(...inputs);
}
