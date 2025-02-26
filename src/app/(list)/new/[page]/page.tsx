import { getPageData } from "../../../actions";
import { Select } from "../../components/Select";
import { ItemsList } from "../../components/ItemsList";

export default async function NewStoriesPage({
  params,
}: {
  params: {
    page: string;
  };
}) {
  if (Number(params.page) < 1 || isNaN(Number(params.page))) {
    throw new Error("Invalid page number");
  }

  const { items, isLastPage } = await getPageData(Number(params.page), "new");

  return (
    <>
      <div className="flex min-w-full items-center justify-between">
        <Select route="new" />
        <h1>Page: {params.page}</h1>
      </div>
      <ItemsList
        items={items}
        isLastPage={isLastPage}
        page={Number(params.page)}
        route="new"
      />
    </>
  );
}
