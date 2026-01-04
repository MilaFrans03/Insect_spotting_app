import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { API_URL } from "@/constants/Api";

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!username || !name || !email || !password) {
      return Alert.alert("Fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, email, password, pictures: [] }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const userId = data?._id ?? data?.id ?? data?.user?._id;

      if (!userId) throw new Error("No user ID returned");

      // Save user ID first
      await AsyncStorage.setItem("userId", userId);

      // Navigate to home tabs
      router.replace("/(tabs)/(home)");
    } catch (err: any) {
      Alert.alert("Error", err?.message ?? "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={isSubmitting ? "Creating account..." : "Create Account"}
        onPress={handleRegister}
        disabled={isSubmitting}
      />

      <Button
        title="Back to Login"
        onPress={() => router.back()}
        disabled={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 10, marginBottom: 12, borderRadius: 5 },
});
