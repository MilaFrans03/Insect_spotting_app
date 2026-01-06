import { Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { CustomTabBar } from "@/components/navigation/CustomTabBar";
import { TabShape } from "@/components/navigation/TabShape";
import { ThemedText } from '@/components/ThemedText';


export default function TabsLayout() {

  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setUserId(userId);
      }
    };
    getUserId();
  }, []);

  if (!userId) {
    return null;
  }

  return (
<Tabs
  screenOptions={{
    headerShown: false,
    tabBarStyle: {
      borderRadius: 50, // rounded corners
      marginHorizontal: 0, // optional spacing from edges
    marginVertical: 0,
      paddingBottom: 0,
    },
    tabBarLabelStyle: {
      fontFamily: 'AnonymousPro',
      fontSize: 16,
    },
    tabBarIcon: () => null, 
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'black',
    tabBarActiveBackgroundColor: 'black',   
    tabBarInactiveBackgroundColor: 'white',
    
  }}
>

      <Tabs.Screen
  name="(home)/index"
  initialParams={{ userId }}
  options={{
    title: '01 Home',
   
  }}
/>



<Tabs.Screen
  name="(collection)/index"
  initialParams={{ userId }}
  options={{
    title: '02 Collection',

   
  }}
/>

<Tabs.Screen
  name="(profile)/index"
  initialParams={{ userId }}
  options={{
    title: '03 Profile',

  }}
/>
      </Tabs>
   
  );
}
