import { Stack } from "expo-router";

export default function Layout() {
  return (
    // Layout for tabs
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}