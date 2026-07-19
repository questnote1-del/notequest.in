import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  className = "",
  priority = false,
  href = "/",
  height = 36,
}) {
  // Original trimmed logo is ~773x196 (~3.94:1)
  const width = Math.round(height * (773 / 196));

  return (
    <Link
      href={href}
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="NoteQuest home"
    >
      <Image
        src="/logo.png"
        alt="NoteQuest"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto"
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
