본 study는 
[24 10 27, 리액트 네이티브 기초, 할 일 App 만들기, 9강, tabConfig와 각각의 screen을 별도의 파일로 분리](https://www.youtube.com/watch?v=4Jh9B3u0D7U&list=PLmAWMAo-opQzg5QxYoii1HZXFURstlhqq&index=29)를 참고해서 만들었습니다<br>

# 9강, tabConfig와 각각의 screen을 별도의 파일로 분리
**분리를 통해 좀더 관리가 쉬워진다**
TODO-APP 폴더 하단에 screens폴더를 생성하고 HomeScreen.js, TodoWriteScreen.js, TodoSearchScreen.js, TodoListScreen.js, MyPageScreen,js 파일을 생성한다. <br>
그리고 함수 내용 그대로 파일에 넣어준다. <br>

## HomeScreen.js
```javascript
import { Text, View } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
    </View>
  );
};
```

## MyPageScreen.js
```javascript
export default HomeScreen;
import { Text, View } from "react-native";
import React from "react";

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>내 정보</Text>
    </View>
  );
};
```

## TodoListScreen.js
```javascript
export default MyPageScreen;
import { Text, View } from "react-native";
import React from "react";

const TodoListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 리스트</Text>
    </View>
  );
};

export default TodoListScreen;
```

## TodoSearchScreen.js
```javascript
import { Text, View } from "react-native";
import React from "react";

const TodoSearchScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 검색</Text>
    </View>
  );
};

## TodoWriteScreen.js
export default TodoSearchScreen;
import { Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

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

export default TodoWriteScreen;
```

## tabConfig.js
```javascript
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import TodoSearchScreen from "../screens/TodoSearchScreen";
import TodoWriteScreen from "../screens/TodoWriteScreen";
import TodoListScreen from "../screens/TodoListScreen";
import MyPageScreen from "../screens/MyPageScreen";
// import를 통해 screens들을 불러온다

const tabConfig = [
  {
    name: "Home",
    title: "메인 홈",
    component: HomeScreen,
    focusedIcon: "home-variant",
    unfocuedIcon: "home-variant-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "TodoSearch",
    title: "할일 검색",
    component: TodoSearchScreen,
    focusedIcon: "search-sharp",
    unfocuedIcon: "search-outline",
    iconComponent: Ionicons,
  },
  {
    name: "TodoWrite",
    title: "할일 작성",
    component: TodoWriteScreen,
    focusedIcon: "application-edit",
    unfocuedIcon: "application-edit-outline",
    iconComponent: MaterialCommunityIcons,
  },
  {
    name: "TodoList",
    title: "할일 리스트",
    component: TodoListScreen,
    focusedIcon: "list-sharp",
    unfocuedIcon: "list-outline",
    iconComponent: Ionicons,
  },
  {
    name: "MyPage",
    title: "내 정보",
    component: MyPageScreen,
    focusedIcon: "person-circle-sharp",
    unfocuedIcon: "person-circle-outline",
    iconComponent: Ionicons,
  },
];

export default tabConfig;
```

## App.js
```javascript
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import tabConfig from "./configs/tabConfig";
// tabConfig 불러오면서 사용한다.

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find(
        (config) => config.name === route.name
      );

      const iconName = focused
        ? routeConfig.focusedIcon
        : routeConfig.unfocuedIcon;
      const IconComponent = routeConfig.iconComponent;

      return <IconComponent name={iconName} size={size} color={color} />;
    },
    tabBarLabelStyle: {
      fontSize: 12,
      paddingBottom: 10,
      fontWeight: "bold",
    },
    tabBarStyle: {
      height: 60,
    },
    tabBarInactiveTintColor: "#0163d2",
    tabBarActiveTintColor: "black",
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        {tabConfig.map((routeConfig) => (
          <Tab.Screen
            key={routeConfig.name}
            name={routeConfig.name}
            component={routeConfig.component}
            options={{ title: routeConfig.title }}
          />
        ))}
      </Tab.Navigator>
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

## 결과
![9장](https://github.com/user-attachments/assets/56fe8939-811b-454a-8074-72112c1ccc22)




