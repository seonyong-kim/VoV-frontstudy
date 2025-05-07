본 study는 
[24 10 26, 리액트 네이티브 기초, 할 일 App 만들기, 3강, navigation.navigate를 이용한 화면 전환](https://www.youtube.com/watch?v=ZXHQIg6kAQI&list=PLmAWMAo-opQzg5QxYoii1HZXFURstlhqq&index=36)를 참고해서 만들었습니다
# 3강, navigation.navigate를 이용한 화면 전환

## app.js
app.js를 다음과 같이 변경한다.
```javascript
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>메인 화면</Text>
      <Button
        title="상세 페이지 이동"
        onPress={() => navigation.navigate("Details")} // onPress는 눌렀을때 
      />
    </View>
  );
};

const DetailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>상세보기 화면</Text>
      <Button title="홈 화면 이동" onPress={() => navigation.navigate("Home")} />
      <Button title="상세 페이지로 이동" onPress={() => navigation.push("Details")} />
      <StatusBar style="auto" />
    </View>
  );
};
//push는 버튼을 누를때마다 동일한 화면을 스택에 쌓이게한다. 즉, 중복을 허용(Button과의 큰차이)

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
```
## 코드 설명
이전 강의와 달리진 부분을 중점적으로 설명

### HomeScreen
```javascript
const HomeScreen = () => {
  const navigation = useNavigation();
  (생략)
      <Button
        title="상세 페이지 이동"
        onPress={() => navigation.navigate("Details")} // onPress는 눌렀을때
  (생략)
};
```
- const navigation = useNavigation();<br>
  useNavigation() 훅을 통해 명시적으로 navigation을 가져와서 navigation 객체를 사용하여 다른 화면으로 이동하거나, 현재 화면을 제어할 수 있습니다.
- \<Button>
  버튼을 생성하는 기본 컴포넌트 <br>
  title="상세 페이지 이동"로 버튼에 표시될 텍스트를 설정 <br>
  **onPress={() => navigation.navigate("Details")}**: onPress는 버튼이 클릭되었을 때 실행되는 콜백 함수로
  버튼이 눌리면 navigation.navigate("Details")로 Details화면으로 이동한다. <br>
  즉, onPress는 버튼을 눌렀을 때 {} 내부의 이벤트를 발생시키는 역할 <br>
  +) 버튼을 누르면 history가 남는다. <br>
  만약 디자인적으로 고려를 해야한다면 pressable, TouchableOpacity도 고민해보자
- onPress={() => navigation.navigate("Details")}에서
  push를 사용하면 버튼을 누를때마다 동일한 화면을 스택에 쌓이게한다. 즉, 중복을 허용(Button과의 큰차이).<br>
### DetailScreen
```javascript
const DetailScreen = ({navigation}) => {
  (생략)
      <Button title="홈 화면 이동" onPress={() => navigation.navigate("Home")} />
      <Button title="상세 페이지로 이동" onPress={() => navigation.push("Details")} />
      <StatusBar style="auto" />
  (생략)
};
```
- const DetailScreen = ({navigation}) => <br>
  navigation은 React Navigation을 사용한 네비게이션 객체로
  다른 화면으로 이동하거나, 뒤로 가거나, 현재 화면을 제어하는 기능을 제공한다. <br>
- Button은 HomeScreen에서 설명.<br>
- <StatusBar style="auto" />에서 <StatusBar />는 상태 표시줄(스마트폰 상단부분)을 제어하는 React Native의 컴포넌트이다.<br>
  style="auto"를 통해 시스템의 기본 스타일을 따르라는 의미이다.<br>
  또한 useNavigation()을 사용하면 페이지 이동시 여러가지 속성을 조합해 유연하게 사용가능해진다.(복잡한 구조일때 필요)
- const navigation = useNavigation()과 navigation의 차이점은 일단 기능적으로는 같은 일을 한다. <br>
  - useNavigation()은 하위 컴포넌트에서 네비게이션을 제어(navigation을 props로 받지 않기 때문) <br>
    컴포넌트가 네비게이션 스택에 포함되지 않는 경우에 사용하며
  - navigation은 화면 컴포넌트에서 네비게이션을 직접 제어할 때와 <br>
    컴포넌트가 네비게이션 스택에 포함된 경우 사용한다.


## 결과화면
![3강](https://github.com/user-attachments/assets/d43df421-bb38-442d-98d8-7d6d53017103)
