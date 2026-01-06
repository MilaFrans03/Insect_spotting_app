import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider } from '@/components/Divider';
import { Marker } from '@/components/Marker';
import { ThemedText } from '@/components/ThemedText';


import { useUserGet } from '@/data/user-get';
import  useUserPut  from '@/data/user-put';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();


  const { user: data, isLoading, isError } = useUserGet();
  const userId = data?._id ?? '';

  const { trigger, isMutating } = useUserPut(userId);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (data) {
      setUsername(data.username ?? '');
      setName(data.name ?? '');
      setEmail(data.email ?? '');
    }
  }, [data]);

  if (isLoading || isMutating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load profile</Text>
      </View>
    );
  }

  const handleSave = () => {
    const payload: any = {
      username,
      name,
      email,
    };

    // only send password if user typed one
    if (password.trim().length > 0) {
      payload.password = password;
    }

    trigger(payload);
  };

  const handleLogout = async () => {
    // 1️⃣ Clear user info
    await AsyncStorage.removeItem('userId');
  
    // 2️⃣ Navigate to login
    router.replace('/');
  
    // 3️⃣ Force a reload (works on web)
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };
  
  

  const createdAtFormatted = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : 'Unknown';

  return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
    <View style={{ flex: 1}}>
      <View>
            <Marker />
            <ThemedText type="subtitle" >PROFILE</ThemedText>
            <Divider />
            </View>

<View style={{ flexDirection: "row", alignItems: 'center' }}> 

  <View>

<Image source={require('@/assets/images/insects_placeholders/default.jpg')} style={{ width: 150, height: 150, marginRight: 16 }} />
    </View>
  <View>
  <ThemedText>Username</ThemedText>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <ThemedText>Name</ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <ThemedText>Email</ThemedText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

</View>

</View>


      

      <ThemedText>New Password</ThemedText>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Leave empty to keep current password"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <ThemedText style={{ fontSize: 12, color: 'gray', marginBottom: 20 }}>
        Account created on: {createdAtFormatted}
      </ThemedText>

   

      <View style={{ marginTop: 20 }}>
  <TouchableOpacity
    onPress={handleSave}
    style={{
      backgroundColor: 'black',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 0,       // 0 = perfect rechthoekig
      alignItems: 'center',
    }}
  >
    <ThemedText style={{ color: 'white'}}>
    Save changes
    </ThemedText>
  </TouchableOpacity>
</View>

<View style={{ marginTop: 20 }}>
  <TouchableOpacity
    onPress={handleLogout}
    style={{
      backgroundColor: 'black',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 0,       // 0 = perfect rechthoekig
      alignItems: 'center',
    }}
  >
    <ThemedText style={{ color: 'white'}}>
      Log out
    </ThemedText>
  </TouchableOpacity>
</View>

    </View>
    </SafeAreaView>
  );
}
