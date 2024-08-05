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
          <li key={item.id}>
            <Link
              href={`/story/${item.id}`}
              className="block rounded-md border p-2 shadow hover:text-sky-400"
            >
              <strong>{item.title}</strong>
              <small className="text-xs text-slate-400">
                &nbsp;by <b>{item.by}</b>
              </small>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex min-w-full justify-between">
        {Number(page) > 1 && (
          <Link
            className="mr-auto hover:text-sky-400"
            href={`/${route}/${Number(page) - 1}`}
          >
            <button>
              <b className="text-xl">&lt;</b> Previous Page
            </button>
          </Link>
        )}
        {!isLastPage && (
          <Link
            className="ml-auto hover:text-sky-400"
            href={`/${route}/${Number(page) + 1}`}
          >
            <button>
              Next Page <b className="text-xl">&gt;</b>
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
