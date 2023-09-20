import { atom } from "recoil";

export const currentPageNumAtom = atom<number>({
  key: "currentPageNumAtom",
  default: 1,
});

export const pageRangeAtom = atom<number>({
  key: "pageRangeAtom",
  default: 0,
});

export const viewMenuAtom = atom<string>({
  key: "viewMenuAtom",
  default: "ALL",
});

export const isLoginAtom = atom<boolean>({
  key: "isLoginAtom",
  default: false,
});

export const userIdAtom = atom<string>({
  key: "userIdAtom",
  default: "",
});
