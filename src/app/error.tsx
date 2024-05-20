"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong: {error.message}</h2>
      <Link href={"/"}>go to home page</Link>
    </div>
  );
}
