import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState,  } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserLogin from '@/data/user-login';
import { ThemedText } from '@/components/ThemedText';


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
    

      <View style={{ marginTop: 20 }}>
  <TouchableOpacity
 onPress={handleLogin} disabled={isMutating}
    style={{
      backgroundColor: 'black',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 0,       // 0 = perfect rechthoekig
      alignItems: 'center',
    }}
  >
      <ThemedText style={{ color: 'white'}}>
      Log In
      </ThemedText>
    </TouchableOpacity>
  </View>
      <View style={{ marginTop: 20 }}>
  <TouchableOpacity
 onPress={() => router.push('/(auth)/register')}
    style={{
      backgroundColor: 'black',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 0,       // 0 = perfect rechthoekig
      alignItems: 'center',
    }}
  >
      <ThemedText style={{ color: 'white'}}>
      Don't have an account? Create one
      </ThemedText>
    </TouchableOpacity>
  </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 },
  button: { backgroundColor: '#007BFF', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  registerButton: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#007BFF', textDecorationLine: 'underline' },
});
