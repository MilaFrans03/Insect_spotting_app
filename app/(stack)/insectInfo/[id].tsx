import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useCollection } from '@/data/user-collection-get';
import { useSearchParams } from 'expo-router/build/hooks';

export default function Information() {
  const searchParams = useSearchParams(); // haalt de id uit de URL: /information/123
  const id = searchParams.get('id');
  const { collectionData, isLoading } = useCollection();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const insect = collectionData.find(item => item._id === id);

  if (!insect) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Insect not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      
      <Image
        source={{ uri: insect.photo_url }}
        style={{ width: '100%', height: 300, borderRadius: 8 }}
      />
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 16 }}>
        {insect.name}
      </Text>
      <Text style={{ color: 'gray', marginTop: 4 }}>Rarity: {insect.rarity}</Text>
      <Text style={{ color: 'gray', marginTop: 2 }}>Season: {insect.season}</Text>
      {insect.description && <Text style={{ marginTop: 8 }}>{insect.description}</Text>}
      {insect.date_found && (
        <Text style={{ marginTop: 8, color: 'gray' }}>
          HEEEEEY Found on: {new Date(insect.date_found).toLocaleDateString()}
        </Text>
      )}
    </View>
  );
}
