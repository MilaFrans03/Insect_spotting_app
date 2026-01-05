import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState,  } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserLogin from '@/data/user-login';

export default function LoginScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { trigger: loginUser, isMutating } = useUserLogin();


  /////

//ALLERTS DOEN NOG NIETS//

//////

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Fill in all fields'); 
    try {
      const data = await loginUser({ email, password });
      const userId = data?._id ?? data?.id ?? data?.user?._id;
      if (!userId) return Alert.alert('User not found');

      await AsyncStorage.setItem('userId', userId);
      router.replace('/(tabs)/(home)');
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isMutating}>
        <Text style={styles.buttonText}>{isMutating ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.registerText}>Don't have an account? Create one</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 12, borderRadius: 5 },
  button: { backgroundColor: '#007BFF', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  registerButton: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#007BFF', textDecorationLine: 'underline' },
});
