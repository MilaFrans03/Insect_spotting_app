
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import useInsects from '@/data/insects-get';

export default function Information() {
  const { data, isLoading, isError } = useInsects();
  
    console.log(data);
  
    if (isLoading) { 
      return <View style={styles.container}><ThemedText>Loading...</ThemedText></View>;
    }
  
    return (
      <View style={styles.container}>
        {data.map((insect: any) => (
          <View key={insect.id}>
            <ThemedText>{insect.name}</ThemedText>
          </View>
        ))}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
