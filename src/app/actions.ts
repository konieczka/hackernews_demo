"use server";

const API_URL = "https://hacker-news.firebaseio.com/v0/";

export async function getData() {
  const data: number[] = await fetch(
    API_URL + "topstories.json?print=pretty",
  ).then((res: Response) => res.json() as Promise<number[]>);

  if (!data) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

interface Item {
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
