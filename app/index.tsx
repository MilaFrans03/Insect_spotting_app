import { Text, View, ActivityIndicator, PressableAlert, SafeAreaView, TouchableOpacity, Image, StyleSheet, Platform, TextInput, Alert, Pressable } from "react-native";
import { Link } from 'expo-router';
import useInsects from '@/data/insects-get';

import { useEffect, useState } from 'react';
import {API_URL} from '@/constants/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import useUserLogin from '@/data/user-login';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { trigger: loginUser, isMutating } = useUserLogin();

  useEffect(() => {
      const checkLogin = async () => {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
              router.replace('/(tabs)/(home)');
          }
      };
  
      checkLogin();
  }, []); 

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }
    try {
      const data = await loginUser({ email, password });
      const userId =
  data?._id ??
  data?.id ??
  data?.user?._id ??
  data?.user?.id;

      if (!userId) {
        Alert.alert('User not found', 'Server did not return a user id');
        return;
      }
      await AsyncStorage.setItem('userId', userId);
      router.replace('/(tabs)/(home)');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err?.message ?? 'Failed to log in');
    }
  };




  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  
      <TextInput
             style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              marginTop: 20,
              borderRadius: 5,
            }}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
             style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              marginTop: 20,
              borderRadius: 5,
            }}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={handleEmailLogin} disabled={isMutating} style={[styles.button, isMutating && styles.buttonDisabled]}>
             <Text>{isMutating ? 'Logging in...' : 'LOGIN'}</Text>     
        </TouchableOpacity>

        </View>
      );
    }
  
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonDisabled: {
      backgroundColor: '#A9A9A9',
    },
  });

