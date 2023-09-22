import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import { AuthContext } from "../context/authContext";
import Home from "../pages/Home";
const Stack = createNativeStackNavigator();

export default function Routes() {
  const { data } = useContext(AuthContext);

  if (data?.user?.email?.length && data?.token?.length) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="SignIn"
        options={{ title: "App - Login" }}
        component={SignIn}
      />
    </Stack.Navigator>
  );
}
