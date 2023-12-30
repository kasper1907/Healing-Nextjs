import { NextFetchEvent, NextRequest } from "next/server";
import { MiddlewareFactory } from "./types";

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return next(request, _next);
  };
};
