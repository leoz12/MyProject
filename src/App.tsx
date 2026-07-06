import * as SplashScreen from "expo-splash-screen";
import Navigation from "./navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/client";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
