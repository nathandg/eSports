import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
   title: string;
}

function Button(props: ButtonProps) {
   return (
      <TouchableOpacity>
         <Text style={styles.Button} >{props.title}</Text>
      </TouchableOpacity>
   );
}

export default function App() {
   return (
      <View style={styles.container}>
         <Text style={styles.tilte}>
            Hello World
         </Text>
         <Button title="Embarcar neste mundo !" />
         <Button title="PEDIR AJUDA" />
         <Button title="PEDIR AJUDA" /><Button title="PEDIR AJUDA" />
         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
   },
   tilte: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
   },
   Button: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      margin: 15,
   },
});
