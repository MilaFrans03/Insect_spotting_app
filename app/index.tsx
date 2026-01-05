import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function StartScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // userId zoeken in storage

        if (userId) {
          router.replace('/(tabs)/(home)'); // gevonden = home
        } else {
          router.replace('/(auth)'); // niet gevonden = login
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
        router.replace('/(auth)'); // bij error = login
      } finally {
        setLoading(false);
      }
    };

    checkLogin(); 
  }, []);

  //  Laadindicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Checking login...</Text>
      </View>
    );
  }

  return null; 
}
