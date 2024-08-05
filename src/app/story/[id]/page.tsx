import { getItem } from "~/app/actions";

export default async function StoryPage({
  params,
}: {
  params: { id: string };
}) {
  const storyData = await getItem(Number(params.id));

  return (
    <div>
      <a href={storyData.url}>
        <h1 className="text-5xl font-extrabold hover:underline">
          {storyData.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mb-6 ml-2 inline size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </h1>
      </a>
      <p>
        by <strong>{storyData.by}</strong>
      </p>
      <p>{new Date(storyData.time * 1000).toUTCString()}</p>
      <p>{storyData.score} points</p>
    </div>
  );
}
