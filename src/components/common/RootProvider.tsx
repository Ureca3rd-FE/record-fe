"use client";

import { queryClient } from "@/lib/tanstack";
import { store } from "@/store";
import { QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";

interface RootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
