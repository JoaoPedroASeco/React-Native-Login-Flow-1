import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";

export default function Home() {
  const navigation: any = useNavigation();

  const { signOut } = useContext(AuthContext);

  const redirect = async () => {
    try {
      navigation.navigate("SignIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
}
