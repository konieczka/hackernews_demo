import Link from "next/link";
import { getPageData, type Item } from "../../actions";

export default async function HomePage({
  params,
}: {
  params: {
    page: string;
  };
}) {
  if (Number(params.page) < 1 || isNaN(Number(params.page))) {
    throw new Error("Invalid page number");
  }

  const { items, isLastPage } = await getPageData(Number(params.page), "top");

  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          HackerNews
        </h1>
        <h2>Top stories, page {params.page}</h2>
        <ul className="flex w-full flex-col gap-2">
          {items.map((item: Item) => (
            <li className="rounded-md border p-2 shadow" key={item.id}>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
        <div className="flex min-w-full justify-between px-8">
          {Number(params.page) > 1 && (
            <Link className="mr-auto" href={`/top/${Number(params.page) - 1}`}>
              <button>&lt; Previous Page</button>
            </Link>
          )}
          {!isLastPage && (
            <Link className="ml-auto" href={`/top/${Number(params.page) + 1}`}>
              <button>Next Page &gt;</button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
