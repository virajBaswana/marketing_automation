import { JsonErrorResponse, JsonSuccessResponse } from "../types/global.types";

export const SuccessJSONResponse = (
  message: string,
  status: number,
  data: { [k: string]: any }[]
): JsonSuccessResponse => {
  let response: JsonSuccessResponse = {
    success: true,
    status: status,
    message: message,
    data: data,
  };
  return response;
};
// export const ErrorJSONResponse = (
//   message: string,
//   status: number,
//   stack?: string,
//   name?: string,
// ): JsonErrorResponse => {
//   let response: JsonErrorResponse = {
//     success: false,
//     message: message,
//     status: status,
//     name : name,
//     stack : stack
//   };
//   return response;
// };
