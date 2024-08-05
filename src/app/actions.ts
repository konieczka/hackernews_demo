"use server";

const API_URL = "https://hacker-news.firebaseio.com/v0/";
const ITEMS_PER_PAGE = 15;

export type StoryRoute = "top" | "best" | "new";

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

export interface FeedbackFormData {
  email: string;
  username: string;
  message: string;
}

/**
 * Fetches a list of item IDs based on the story route.
 * @param route - The story route (top, best, new).
 * @returns A list of item IDs.
 */
export async function getItemsList(route: StoryRoute): Promise<number[]> {
  try {
    const response = await fetch(`${API_URL}${route}stories.json?print=pretty`);
    const data = (await response.json()) as number[];
    if (!data) throw new Error("Failed to fetch data");
    return data;
  } catch (error) {
    throw new Error(`Error fetching items list`);
  }
}

/**
 * Fetches an item by its ID.
 * @param id - The item ID.
 * @returns The item data.
 */
export async function getItem(id: number): Promise<Item> {
  try {
    const response = await fetch(`${API_URL}item/${id}.json?print=pretty`);
    const item = (await response.json()) as Item;
    if (!item) throw new Error("Failed to fetch item");
    return item;
  } catch (error) {
    throw new Error(`Error fetching item`);
  }
}

/**
 * Fetches a batch of items by their IDs.
 * @param ids - The list of item IDs.
 * @returns A list of items.
 */
export async function getItemBatch(ids: number[]): Promise<Item[]> {
  try {
    const items = await Promise.all(ids.map((id) => getItem(id)));
    return items;
  } catch (error) {
    throw new Error(`Error fetching item batch`);
  }
}

/**
 * Fetches the data for a specific page and story route.
 * @param page - The page number.
 * @param route - The story route (top, best, new).
 * @returns An object containing the items and a flag indicating if it's the last page.
 */
export async function getPageData(
  page: number,
  route: StoryRoute,
): Promise<{ items: Item[]; isLastPage: boolean }> {
  if (page < 1) {
    throw new Error("Page must be greater than 1");
  }

  const ids = await getItemsList(route);
  const items = await getItemBatch(
    ids.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page),
  );
  const isLastPage = items.length < ITEMS_PER_PAGE;

  if (!items) {
    throw new Error("Failed to fetch items");
  }

  return { items, isLastPage };
}

/**
 * Posts feedback data.
 * @param id - The feedback ID.
 * @param formData - The feedback form data.
 * @returns A confirmation message.
 */
export async function postFeedback(
  id: number,
  formData: FeedbackFormData,
): Promise<string> {
  console.log(`Form data received for story ${id}`, formData);
  return "received";
}
