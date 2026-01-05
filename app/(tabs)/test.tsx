import { View, StyleSheet } from "react-native";
import MyIcon from "@/components/MyIcon";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MyIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // verticaal
    alignItems: "center",     // horizontaal
  },
});
