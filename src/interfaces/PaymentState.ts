import { ApiStatus } from "../enums/ApiStatus";

export interface PaymentState {
  succeeded: boolean | null;
  status: ApiStatus;
  error: string | null;
}
