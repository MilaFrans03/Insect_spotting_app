import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto: require("..//assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    AnonymousPro: require("../assets/fonts/AnonymousPro-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
