import React from "react";
import { useFonts } from "expo-font";
import Login from "./screen/login";
import Register from "./screen/register";
import User from "./screen/user";
import Todo from "./screen/todo";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZU8VLgrR_VL7x2tz3wzKkwGXgXGMllYw",
  authDomain: "loginwithreact-8c754.firebaseapp.com",
  projectId: "loginwithreact-8c754",
  storageBucket: "loginwithreact-8c754.appspot.com",
  messagingSenderId: "269343560364",
  appId: "1:269343560364:web:37a8fb521d326e82910509",
};

initializeApp(firebaseConfig);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const LoginStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen
          name="LoginStack"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    );
  };
  const RegisterStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="RegisterStack"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginStack}
          options={{
            tabBarIcon: (props) => <Entypo name="user" {...props} />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterStack}
          options={{
            tabBarIcon: (props) => <Entypo name="add-user" {...props} />,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
