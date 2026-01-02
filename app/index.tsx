import { Text, View, ActivityIndicator, Pressable } from "react-native";
import { Link } from 'expo-router';
import useInsects from '@/data/insects-get';

export default function Index() {
  const { data, isLoading, isError } = useInsects();

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Er ging iets mis.</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {(data as any[] | undefined)?.map((insect: any, index: number) => (
        <Text key={insect?._id ?? index}>{insect?.name ?? 'Unnamed'}</Text>
      ))}

      {/* Link naar de informatie pagina */}
      <Link href="/information" asChild>
        <Pressable style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue' }}>Informatie stack</Text>
        </Pressable>
      </Link>

      {/* Link naar de Home-tab */}
      <Link href="/(tabs)/(home)" asChild>
        <Pressable style={{ marginTop: 20 }}>
          <Text style={{ color: 'green' }}>Ga naar Home Tab</Text>
        </Pressable>
      </Link>
    </View>
  );
}
