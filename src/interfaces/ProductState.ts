import { ApiStatus } from "../enums/ApiStatus";
import { Product } from "./Product";

export interface ProductState {
  products: Product[];
  status: ApiStatus;
  error: string | null;
}
