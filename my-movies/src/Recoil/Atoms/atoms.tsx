import { atom } from "recoil";
import type { Alert } from "../../types/Alert";

export const alertState = atom<Alert | null>({
  key: "alertState",
  default: null,
});