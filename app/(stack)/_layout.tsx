import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false  // uncomment dit als je de header voor deze screen wilt verbergen

      }}
    >
      {/* Specifieke screens */}
 
  
    </Stack>
  );
}
