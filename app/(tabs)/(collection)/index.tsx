import React from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useCollection } from '@/data/user-collection-get';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';

export default function CollectionScreen() {
    const router = useRouter(); 
  const { collectionData, addPictureToCollection, deletePicture, isLoading } = useCollection();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        My Collection
      </Text>


      <FlatList
        data={collectionData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, borderWidth: 1, borderRadius: 8, padding: 10 }}>
            <TouchableOpacity
            onPress={() => router.push({
             pathname: '/(tabs)/(collection)/insectInfo/[id]', 
             params: { id: item._id } // hier sturen we de id mee
            })}
            >
  <Image
    source={{ uri: item.photo_url }}
    style={{ width: '100%', height: 200, borderRadius: 6 }}
  />
</TouchableOpacity>


            <Text style={{ color: 'gray', fontSize: 12, marginTop: 4 }}>ID: {item._id}</Text>
            <Text style={{ marginTop: 4, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: 'gray' }}>Rarity: {item.rarity}</Text>
            <Text style={{ color: 'gray' }}>Season: {item.season}</Text>
            {item.description && <Text style={{ marginTop: 4 }}>{item.description}</Text>}

            {item.in_collection ? (
              <>
                {item.date_found && (
                  <Text style={{ marginTop: 4 }}>
                    Found on: {new Date(item.date_found).toLocaleDateString()}
                  </Text>
                  
                )}
                
                <Button
                  title="Delete Photo"
                  color="red"
                  onPress={() => deletePicture(item._id)}
                />
              </>
            ) : (
              <Button
                title="Add Photo"
                onPress={() => addPictureToCollection(item._id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
