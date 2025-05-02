본 study는 
[24 10 27, 리액트 네이티브 기초, 할 일 App 만들기, 7강, Tab.Screen name에 맞는 아이콘 적용](https://www.youtube.com/watch?v=EeFKBe6SdXs&list=PLmAWMAo-opQzg5QxYoii1HZXFURstlhqq&index=31)를 참고해서 만들었습니다<br>
# 7강, Tab.Screen name에 맞는 아이콘 적용
## app.js
```javascript
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Pressable,} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="할 일 리스트 이동"
        onPress={() => navigation.navigate("TodoList")}
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

const TodoSearchScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 검색</Text>
    </View>
  );
};

const TodoListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>할일 리스트</Text>
    </View>
  );
};

const MyPageScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>내 정보</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({ 
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
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") { 
              iconName = "home-variant";
            } else if (route.name === "TodoSearch") {
              iconName = "text-search";
            } else if (route.name === "TodoWrite") {
              iconName = "note-edit";
            } else if (route.name === "TodoList") {
              iconName = "view-list";
            } else if (route.name === "MyPage") {
              iconName = "account-circle";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            title: "메인 홈",
          }}
        />
        <Tab.Screen
          name="TodoSearch"
          component={TodoSearchScreen}
          options={{
            title: "할일 검색",
          }}
        />
        <Tab.Screen
          name="TodoWrite"
          component={TodoWriteScreen}
          options={{
            title: "할일 작성",
          }}
        />
        <Tab.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            title: "할일 리스트",
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{
            title: "내 정보",
          }}
        />
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

### 코드 설명
하단 Tab.Screen name에 여러개를 설정하면서 맞는 아이콘 적용까지 한다.
- screenOptions={({ route }) => ({ <br>
으로 route를 통해 해당 screen 값의 접근이 가능하도록 한다.
- route값에 따라 값을 설정하고 반영하기
```javascript
tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") { 
              iconName = "home-variant";
            } else if (route.name === "TodoSearch") {
              iconName = "text-search";
            } else if (route.name === "TodoWrite") {
              iconName = "note-edit";
            } else if (route.name === "TodoList") {
              iconName = "view-list";
            } else if (route.name === "MyPage") {
              iconName = "account-circle";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
```

를 보면 route값에 따라 iconName에 값을 설정하고 return을 통해 아이콘을 설정해준다.
- Tab.Screen을 통해 필요한 화면들이 하단 tab에 들어 가도록 설정하였다.

## 결과
![7강](https://github.com/user-attachments/assets/72ca9714-014f-4800-8090-efc5961200e6)
