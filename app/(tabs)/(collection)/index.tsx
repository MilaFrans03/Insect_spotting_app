import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Picture {
  _id: string;
  insect_id: {
    _id: string;
    name: string;
    rarity: string;
    season: string;
    default_photo_url?: string | null;
  };
  photo_url: string;
  in_collection: boolean;
  date_found?: string | null;
}

interface User {
  _id: string;
  username: string;
  pictures: Picture[];
}

// Hook om alle insecten op te halen
const useAllInsects = () => {
  const [insects, setInsects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/insects') // pas aan naar jouw backend
      .then(res => res.json())
      .then(data => {
        setInsects(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return { insects, loading, error };
};

export default function CollectionScreen() {
  const [user, setUser] = useState<User | null>(null);
  const { insects, loading: insectsLoading, error: insectsError } = useAllInsects();

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async userId => {
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:3000/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    });
  }, []);

  if (!user || insectsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (insectsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load insects</Text>
      </View>
    );
  }

  // Combineer alle insecten met user collectie
  const collectionData = insects.map((insect) => {
    const picture = user.pictures.find(pic => pic.insect_id._id === insect._id);

    return {
      ...insect,
      in_collection: picture?.in_collection ?? false,
      photo_url: picture?.photo_url ?? insect.default_photo_url,
      date_found: picture?.date_found ?? null,
    };
  });

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        My Collection
      </Text>

      <FlatList
        data={collectionData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
            }}
          >
            {item.photo_url && (
              <Image
                source={{ uri: item.photo_url }}
                style={{ width: '100%', height: 200, borderRadius: 6 }}
              />
            )}

            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>Rarity: {item.rarity}</Text>
            <Text style={{ color: 'gray' }}>Season: {item.season}</Text>
            {item.description && <Text style={{ marginTop: 4 }}>{item.description}</Text>}

            {item.in_collection && item.date_found && (
              <Text style={{ marginTop: 4 }}>
                Found on: {new Date(item.date_found).toLocaleDateString()}
              </Text>
            )}

            {!item.in_collection && (
              <Text style={{ marginTop: 4, fontStyle: 'italic', color: 'gray' }}>
                Not in your collection
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
