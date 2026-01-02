import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function TabsLayout() {
  return (
 
      <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
  name="(home)/index"
  options={{
    title: 'Home',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="(profile)/index"
  options={{
    title: 'Profile',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="(collection)/index"
  options={{
    title: 'Collection',
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="home-outline" size={size} color={color} />
    ),
  }}
/>
      </Tabs>
   

  );
}
