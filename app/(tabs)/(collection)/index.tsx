import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CollectionScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>COLLECTIE</Text>
  </View>
  );
}
