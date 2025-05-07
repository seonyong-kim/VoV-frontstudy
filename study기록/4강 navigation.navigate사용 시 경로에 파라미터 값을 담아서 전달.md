본 study는 
[24 10 26, 리액트 네이티브 기초, 할 일 App 만들기, 4강, navigation.navigate사용 시 경로에 파라미터 값을 담아서 전달](https://www.youtube.com/watch?v=KleIKaUkiDI&list=PLmAWMAo-opQzg5QxYoii1HZXFURstlhqq&index=34)를 참고해서 만들었습니다
# navigation.navigate사용 시 경로에 파라미터 값을 담아서 전달

## app.js
app.js를 다음과 같이 변경한다.
```javascript
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Pressable,} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

const HomeScreen = () => {
  const navigation = useNavigation();
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
  const { todo } = route.params;

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
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
```
## 코드
### HomeScreen
```javascript
const HomeScreen = () => {
  (생략)
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      (생략)
      <Button
        title="할 일 작성"
        onPress={() => navigation.navigate("TodoWrite")}
      />
  (생략)
};
```
- \<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  
- 할 일 작성 버튼을 추가 작성 동작이 궁금하면 3장을 참고

### TodoWriteScreen
``` javascript
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
```
- const [todo, setTodo] = useState("")<br>
  todo: 사용자가 작성한 텍스트를 저장할 변수. setTodo: 텍스트를 변경할 때 사용되는 함수
 

### DetailScreen
```javascript
const DetailScreen = ({ navigation, route }) => {
  const { todo } = route.params;

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

```

- TextInput

TextInput은 text를 적을 수 있게 만들어 준다
- 매개변수 전달
```javascript
<Pressable
  onPress={() => {
    navigation.navigate("Details", { todo });
    setTodo("");
}}
```
navigation.navigate("Details", { todo })로 Details에 todo로 매개변수를 보내고, <br>
Details함수에서는 const DetailScreen = ({ navigation, route }) => { const { todo } = route.params; 로 route에서 매개변수를 받고 todo에 저장한다.

## 결과
![4강결과](https://github.com/user-attachments/assets/2dfba881-1f55-4afc-a2ca-dc11555f9769)


