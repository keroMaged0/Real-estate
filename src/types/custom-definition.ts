import { IUser } from "../models/user.model";
import { IPagination } from "./pagination";

declare global {
  namespace Express {
    interface Request {
      loggedUser?: IUser;
      pagination?: IPagination;
    }
  }
}
