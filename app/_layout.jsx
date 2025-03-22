import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MultaContextProvider from "./multas-context";

export default function RootLayout() {
  return (
    <MultaContextProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="MultaDetails" options={{ headerShown: false }} />
          <Stack.Screen name="NewMulta" options={{ headerShown: false }} />
          <Stack.Screen name="About" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </MultaContextProvider>
  );
}
