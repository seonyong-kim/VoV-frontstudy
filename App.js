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