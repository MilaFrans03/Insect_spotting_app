import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Picture {
  insect_id: string;
  photo_url: string;
  in_collection: boolean;
  date_found?: string | null;
}

interface User {
  _id: string;
  username: string;
  pictures: Picture[];
}

interface Insect {
  _id: string;                    // e.g. "01", "002"
  name: string;
  description?: string;
  rarity: string;
  season: string;
  default_photo_url?: string | null;
}

// Hook om alle insecten op te halen
const useAllInsects = () => {
  const [insects, setInsects] = useState<Insect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/insects')
      .then(res => res.json())
      .then(data => {
        setInsects(data);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return { insects, loading, error };
};

// Placeholder afbeeldingen per ID
const placeholderImages: { [key: string]: any } = {
  '01': require('@/assets/images/insects_placeholders/01.jpg'),
  '02': require('@/assets/images/insects_placeholders/02.jpg'),
  '03': require('@/assets/images/insects_placeholders/03.jpg'),
  // Voeg hier alle andere IDs toe
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

  // Combineer insecten met user collectie
  const collectionData = insects
    .filter(insect => insect?._id) // voorkom crashes
    .map((insect) => {
      const picture = user.pictures.find(pic => pic.insect_id === insect._id);
      const inCollection = picture?.in_collection ?? false;
      const photo = picture?.photo_url ?? insect.default_photo_url ?? placeholderImages[insect._id];

      return {
        ...insect,
        in_collection: inCollection,
        photo_url: photo,
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
            {/* Foto */}
            <Image
              source={item.photo_url ? { uri: item.photo_url } : placeholderImages[item._id]}
              style={{ width: '100%', height: 200, borderRadius: 6 }}
            />

            {/* ID boven de naam */}
            <Text style={{ color: 'gray', fontSize: 12, marginTop: 4 }}>ID: {item._id}</Text>

            {/* Naam en info */}
            <Text style={{ marginTop: 4, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>Rarity: {item.rarity}</Text>
            <Text style={{ color: 'gray' }}>Season: {item.season}</Text>
            {item.description && <Text style={{ marginTop: 4 }}>{item.description}</Text>}

            {/* Datum gevonden als in collectie */}
            {item.in_collection && item.date_found && (
              <Text style={{ marginTop: 4 }}>
                Found on: {new Date(item.date_found).toLocaleDateString()}
              </Text>
            )}

            {/* Not in collection tekst */}
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
