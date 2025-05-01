import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
    </View>
  );
};

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>상세보기 화면</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
