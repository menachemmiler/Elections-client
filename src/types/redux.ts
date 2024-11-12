import { ICandidate } from "./candidates";
import { IUser } from "./user";

export enum DataStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  IDLE = "IDLE",
}

export interface userState {
  error: string | null;
  status: DataStatus;
  user: null | IUser;
}

export interface candidatesState {
  error: string | null;
  status: DataStatus;
  candidates: ICandidate[];
}
