import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useUserGet from '@/data/user-get';
import useUserPut from '@/data/user-put';

export default function ProfileScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const userId = params.userId as string;

  const { data, isLoading, isError } = useUserGet(userId);
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
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
        Profile
      </Text>

      <Text>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text>New Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Leave empty to keep current password"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <Text style={{ fontSize: 12, color: 'gray', marginBottom: 20 }}>
        Account created on: {createdAtFormatted}
      </Text>

      <Button title="Save changes" onPress={handleSave} />

      <View style={{ marginTop: 20 }}>
        <Button title="Log out" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}
