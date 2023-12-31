"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { NewsMode } from "~/types";

export interface ContextData {
  newsMode: NewsMode;
}

type ContextType = {
  value: ContextData;
  setValue: Dispatch<SetStateAction<ContextData>>;
};

export const defaultContextValue: ContextData = {
  newsMode: "best-stories"
};

export const Context = createContext<ContextType>({
  value: defaultContextValue,
  setValue: () => {}
});
