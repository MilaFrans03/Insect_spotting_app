import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ThemedText } from '@/components/ThemedText';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto: require("..//assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    AnonymousPro: require("../assets/fonts/AnonymousPro-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (

    
    <Stack>
      
      <Stack.Screen name="(tabs)" options={{
         headerShown: false,
         title: "Collection",
          }} />
           <Stack.Screen name="(stack)" options={{
         headerShown: true,
         headerStyle: { backgroundColor: '#f2f2f2' },
         headerTintColor: 'black',
         title: "",
         headerTitleStyle: {
          fontSize: 30,                // optional: adjust size        // optional: adjust weight
          color: 'black',              // optional: override color
        },
          }} />
          <Stack.Screen name="(auth)" options={{
         headerShown: false,
          }} />

<Stack.Screen name="(auth)/index.tsx" options={{
         headerShown: false,
          }} />


    </Stack>
  );
}
