import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect("/new/1");
}
