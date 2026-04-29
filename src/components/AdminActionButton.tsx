"use client";

import { useFormStatus } from "react-dom";

type AdminActionButtonProps = {
  children: React.ReactNode;
  pendingLabel: string;
  variant?: "primary" | "secondary";
};

export function AdminActionButton({
  children,
  pendingLabel,
  variant = "secondary",
}: AdminActionButtonProps) {
  const { pending } = useFormStatus();
  const styles =
    variant === "primary"
      ? "bg-red-600 text-white disabled:bg-red-400"
      : "border border-zinc-300 bg-white text-zinc-800 disabled:bg-zinc-100";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`h-full w-full rounded-md px-3 py-2.5 text-sm font-semibold disabled:cursor-wait ${styles}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
