"use server";

const API_URL = "https://hacker-news.firebaseio.com/v0/";

export type StoryRoute = "top" | "best" | "new";

const ITEMS_PER_PAGE = 15;

export async function getItemsList(route: StoryRoute) {
  const data: number[] = await fetch(
    API_URL + `${route}stories.json?print=pretty`,
  ).then((res: Response) => res.json() as Promise<number[]>);

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  text: string;
}

export async function getItem(id: number) {
  const item = await fetch(API_URL + `item/${id}.json?print=pretty`).then(
    (res: Response) => res.json() as Promise<Item>,
  );

  if (!item) {
    throw new Error("Failed to fetch item");
  }

  return item;
}

export async function getItemBatch(ids: number[]) {
  const items = await Promise.all(ids.map((id) => getItem(id)));
  return items;
}

export async function getPageData(page: number, route: StoryRoute) {
  if (page < 1) {
    throw new Error("Page must be greater than 1");
  }

  let isLastPage = false;

  const ids = await getItemsList(route);

  const items = await getItemBatch(
    ids.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page),
  );

  if (items.length < ITEMS_PER_PAGE) {
    isLastPage = true;
  }

  if (!items) {
    throw new Error("Failed to fetch items");
  }

  return { items, isLastPage } as const;
}

export interface FeedbackFormData {
  email: string;
  username: string;
  message: string;
}

export async function postFeedback(id: number, formData: FeedbackFormData) {
  console.log(`Form data received for ${id}`, formData);

  return "Form received";
}
