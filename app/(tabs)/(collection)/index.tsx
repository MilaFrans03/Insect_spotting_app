import React from 'react';
import { View, FlatList, Image, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { useCollection } from '@/data/user-collection-get';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ImageSizes } from '@/constants/ImageSizes';

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
      <ThemedText type="subtitle">My Collection</ThemedText>

      <FlatList
        key="3-cols" // force re-render voor numColumns
        data={collectionData}
        keyExtractor={(item) => item._id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/(stack)/insectInfo/[id]', 
              params: { id: item._id }
            })}
            style={{
              flex: 1 / 3,
              marginBottom: 16,
              marginHorizontal: 4,
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              alignItems: 'center',
            }}
          >
             <ThemedText>{item._id}</ThemedText>
             <ThemedText>{item.name}</ThemedText>
            <Image
              source={
                typeof item.photo_url === 'string'
                  ? { uri: item.photo_url }  // online URL (user foto)
                  : item.photo_url           // require(...) lokaal
              }
              style={{
                width: ImageSizes.thumbnail,
                height: ImageSizes.thumbnail,
              }}
            />
           
            <ThemedText>{item.season}</ThemedText>

            {item.in_collection ? (
  item.date_found && (
    <ThemedText>{new Date(item.date_found).toLocaleDateString()}</ThemedText>
  )
) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
