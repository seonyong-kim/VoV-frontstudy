import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Button, TextInput, Pressable,} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
  // 복잡한 구조인 경우에만 필요하다.
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="상세 페이지 이동"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="할 일 작성"
        onPress={() => navigation.navigate("TodoWrite")}
      />
    </View>
  );
};

const TodoWriteScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");

  return (
    <>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="할 일을 작성해주세요."
        style={{
          flex: 0.3,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 2,
          margin: 10,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Details", { todo });
          setTodo("");
        }}
      >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
            borderWidth: 2,
            width: "30%",
            textAlign: "center",
            fontWeight: "bold",
            margin: 10,
          }}
        >
          작성
        </Text>
      </Pressable>
    </>
  );
};

const DetailScreen = ({ navigation, route }) => {
  const todo = route.params?.todo; // route.params에 데이터가 없는데 반영하려고 해서 error발생 ?.todo를 한다.

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>상세보기 화면</Text>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
        작성 내용 : {todo}
      </Text>
      <Button title="홈으로 이동" onPress={() => navigation.navigate("Home")} />
      <Button
        title="상세 페이지로 이동"
        onPress={() => navigation.push("Details")}
      />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home" //옵션을 부여할 수 있다.
        screenOptions={{ // 이 옵션을 통해 상단에 공통요소가 들어갈수 있다.
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => ( // 특정 아이콘을 우축에 반영한다. 이역시 공통으로 반영한다.
            <Pressable onPress={() => alert("클릭됨!!")}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Menu</Text>
            </Pressable>
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
          }}
        />
        <Stack.Screen name="TodoWrite" component={TodoWriteScreen} />
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