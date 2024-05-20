"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn mx-auto w-full" disabled={pending}>
      {"invia"}
    </button>
  );
}
