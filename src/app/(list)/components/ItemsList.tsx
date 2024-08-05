import Link from "next/link";
import { type Item, type StoryRoute } from "~/app/actions";

export function ItemsList({
  items,
  isLastPage,
  page,
  route,
}: {
  items: Item[];
  isLastPage: boolean;
  page: number;
  route: StoryRoute;
}) {
  return (
    <>
      <ul className="flex w-full flex-col gap-2">
        {items.map((item: Item) => (
          <Link href={`/story/${item.id}`} key={item.id}>
            <li className="rounded-md border p-2 shadow">
              <strong>{item.title}</strong>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex min-w-full justify-between">
        {Number(page) > 1 && (
          <Link className="mr-auto" href={`/${route}/${Number(page) - 1}`}>
            <button>&lt; Previous Page</button>
          </Link>
        )}
        {!isLastPage && (
          <Link className="ml-auto" href={`/${route}/${Number(page) + 1}`}>
            <button>Next Page &gt;</button>
          </Link>
        )}
      </div>
    </>
  );
}
