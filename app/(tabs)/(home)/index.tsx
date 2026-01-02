import { View, Text } from 'react-native';
import useInsects from '@/data/insects-get';

export default function HomeScreen() {
    const { data, isLoading, isError } = useInsects();

    console.log(data);
    
      if (isLoading) { 
        return <View ><Text>Loading...</Text></View>;
      }
    
  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      {/* {data.map((insect: any) => (
              <View key={insect.id}>
                <Text>{insect.name}</Text>
              </View>
            ))} */}
      
    </View>
  );
}
