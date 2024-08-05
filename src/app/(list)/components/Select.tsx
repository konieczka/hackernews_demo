"use client";

import { type StoryRoute } from "~/app/actions";
import { useRouter } from "next/navigation";

const options = ["top", "new", "best"];

export function Select({ route }: { route: StoryRoute }) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`/${e.target.value}`);
  }

  return (
    <select
      defaultValue={route}
      onChange={handleChange}
      className="rounded-md border p-2 text-black"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}
