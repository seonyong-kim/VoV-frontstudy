본 study는 
[24 10 27, 리액트 네이티브 기초, 할 일 App 만들기, 8강, tabConfig 도입, screenOptions을 별도의 컴포넌트로 분리](https://www.youtube.com/watch?v=io2EBKems0Q&list=PLmAWMAo-opQzg5QxYoii1HZXFURstlhqq&index=30)를 참고해서 만들었습니다<br>
# 24 10 27, 리액트 네이티브 기초, 할 일 App 만들기, 8강, tabConfig 도입, screenOptions을 별도의 컴포넌트로 분리
[expo 아이콘 목록 사이트](https://icons.expo.fyi/Index)
## app.js
```javascript
import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Button, TextInput, Pressable,} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
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
  const tabConfig = [ // tabConfig는 설정 파일을 말한다.
    {
      name: "Home",
      title: "메인 홈",
      component: HomeScreen,
      focusedIcon: "home-variant", // focusedIcon 포커싱이된 아이콘콘
      unfocuedIcon: "home-variant-outline", // unfocuedIcon 포커싱이 안된 아이콘
      iconComponent: MaterialCommunityIcons,
    },
    { // 각각 모두 진행
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

  const screenOptions = ({ route }) => ({ // screenOptions도 별도의 컴포넌트로 작성해 분리
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = tabConfig.find( //config.name === route.name일때 tabConfig정보를 routeConfig에 넣어준다
        (config) => config.name === route.name
      );

      const iconName = focused //focused여부에 따라 다른거 적용
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

### 코드 명
- screenOptions 함수 <br>
screenOptions 함수는 Tab.Navigator 컴포넌트에서 각 탭에 대한 설정을 동적으로 지정하는 역할을 한다.
따라서 이 함수는 탭 아이콘이나 탭 스타일을 정의하는 데 사용됩니다.
  - tabBarIcon : 각 탭에 표시할 아이콘을 정의로 focused(현재 탭의 활성화 여부), color, size를 매개변수로 한다.<br>
  - routeConfig: tabConfig 배열에서 해당 탭에 대한 설정을 찾는 부분으로
  route.name이 탭의 이름(name)과 일치하는 설정을 찾고, 이 설정을 routeConfig에 담긴다. <br>
  따라서 routeConfig는 tabConfig에서 해당 탭에 대한 아이콘 이름(focusedIcon, unfocuedIcon), 아이콘 컴포넌트(iconComponent)
  등을 포함하는 객체입니다.
  - iconName: focused 값에 따라 아이콘을 선택한다.
  - IconComponent: 탭 아이콘의 실제 UI를 렌더링할 컴포넌트로 MaterialCommunityIcons나 Ionicons와 같은 아이콘 라이브러리의 컴포넌트를 사용한다.
  그리고 이 IconComponent로 return을 한다.

- Tab.Navigator 사용 <br>
Tab.Navigator는 실제로 탭 네비게이션을 설정하는 컴포넌트이다. 여기서는 screenOptions를 Tab.Navigator에 전달하여 탭의 스타일과 아이콘을 설정한다.
  - screenOptions={screenOptions}: screenOptions를 전달하여 탭의 스타일, 아이콘 등을 설정한다.
  - tabConfig.map: tabConfig 배열을 순회하면서 각 탭을 동적으로 생성한다. 각 탭을 동적으로 생성하면서 name, component, options을 설정해준다.
  - key={routeConfig.name}를 통해 탭의 고유 이름을 키로 사용한다.


## 결과
![8장](https://github.com/user-attachments/assets/aaed1ade-37a4-403f-b684-c3fd19fa4663)
