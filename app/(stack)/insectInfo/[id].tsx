import { View, Text, Image, Button, ActivityIndicator,TouchableOpacity } from 'react-native';
import { useCollection } from '@/data/user-collection-get';
import { useSearchParams } from 'expo-router/build/hooks';
import { Divider } from '@/components/Divider';
import { Marker } from '@/components/Marker';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageSizes } from '@/constants/ImageSizes';
import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

import * as ImageManipulator from 'expo-image-manipulator'
import { useRouter } from 'expo-router';

export default function Information() {
  const router = useRouter();
  const searchParams = useSearchParams(); // haalt de id uit de URL: /information/123
  const id = searchParams.get('id');
  const { collectionData, addPictureToCollection, deletePicture, isLoading } = useCollection();
  

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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
    <View style={{ flex: 1 }}>

       <View style={{ flexDirection: "row", alignItems: 'center' }}> 
        <View style={{flex:1,}}><ThemedText>{insect._id}</ThemedText></View>
        <View style={{flex:1, alignItems:'flex-end'}}>
       {insect.in_collection ? (
        insect.date_found && (
                 <ThemedText>Found on: {new Date(insect.date_found).toLocaleDateString()}</ThemedText>
               )
             ) : null}
          </View>

</View>

      <View>
            <Marker />
            <ThemedText type="subtitle" >{insect.name}</ThemedText>
            <ThemedText>{insect.rarity} {insect.season}</ThemedText>
            </View>

            <ThemedText >{insect.description}</ThemedText>

            <View style={{ flexDirection: "row", alignItems: 'center' }}> 

                <View style={{ flex: 6 }}> 
      <Image
        source={
          typeof insect.photo_url === 'string'
            ? { uri: insect.photo_url }  // online URL (user foto)
            : insect.photo_url }
        style={{ width: ImageSizes.showcase, height: ImageSizes.showcase, borderWidth: 2, padding: 8, marginTop: 16 }}
        
      />
                </View> 
                <View style={{ flex: 0.2, height: '75%', width: '2%' , backgroundColor: 'transparant', borderRightWidth:2,borderBottomWidth: 2, borderTopWidth:2, justifyContent: 'center' }}>

                </View >
               
                <View style={{ flex: 1.1, padding:17, }}>
                <ThemedText >Grootte/eigenschappen?</ThemedText>
                </View>
              </View>

<View style={{ marginTop: 20 }}>
  <TouchableOpacity
   onPress={() => router.push({
    pathname: '/cameraScreen/[id]',
    params: { id: insect._id }
  })}
    style={{
      backgroundColor: 'black',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 0,       // 0 = perfect rechthoekig
      alignItems: 'center',
    }}
  >
    <ThemedText style={{ color: 'white'}}>
    Take Picture
    </ThemedText>
  </TouchableOpacity>
</View>
    
    </View>
     </SafeAreaView>
  );
}