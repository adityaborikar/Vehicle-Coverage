/* eslint-disable prettier/prettier */
export interface commonResponseType<DT> {
  success: boolean;
  message: string;
  data: DT;
}
