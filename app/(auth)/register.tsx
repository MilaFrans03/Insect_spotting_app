import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import useUserRegister from "@/data/user-post";
import { ThemedText } from '@/components/ThemedText';


export default function RegisterScreen() {
  const router = useRouter();
  const { trigger: registerUser, isMutating } = useUserRegister();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !name || !email || !password) {
      return Alert.alert("Fill in all fields");
    }

    try {
      const data = await registerUser({ username, name, email, password, pictures: [] });
      const userId = data?._id ?? data?.id ?? data?.user?._id;

      if (!userId) return Alert.alert("Registration failed");

      await AsyncStorage.setItem("userId", userId);
      router.replace("./(tabs)/(home)");
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

    
          <View style={{ marginTop: 20 }}>
      <TouchableOpacity
    onPress={handleRegister} disabled={isMutating}
        style={{
          backgroundColor: 'black',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 0,       // 0 = perfect rechthoekig
          alignItems: 'center',
        }}
      >
          <ThemedText style={{ color: 'white'}}>
          Create Account
          </ThemedText>
        </TouchableOpacity>
      </View>
          <View style={{ marginTop: 20 }}>
      <TouchableOpacity
     onPress={() => router.back()} disabled={isMutating}
        style={{
          backgroundColor: 'black',
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 0,       // 0 = perfect rechthoekig
          alignItems: 'center',
        }}
      >
          <ThemedText style={{ color: 'white'}}>
          Back to Login
          </ThemedText>
        </TouchableOpacity>
      </View>
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 8, marginBottom: 12 },
});
