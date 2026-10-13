import { api } from "@/util/app";

type passageTypes = {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  translation?: string;
};

export const getPassage = async (data: passageTypes) => {
  const response = await api.post("/bible/getPassage", data);
  return response.data;
};
