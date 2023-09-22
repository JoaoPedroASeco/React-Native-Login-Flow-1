import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREFIX_AUTH } from "../utils/variables";

export default function SignIn() {
  const [email, setEmail] = useState<string>("admin@admin.com");

  const { signIn } = useContext(AuthContext);

  const handleSignIn = () => {
    signIn({ email });
  };

  const log = async () => {
    console.log(await AsyncStorage.getItem(`${PREFIX_AUTH}:user`));
  };
  // Hide header
  const navigation: any = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      // headerShown: false,
    });
  });

  return (
    <View style={tw`flex-1 bg-[#38a69D] pt-12 `}>
      <View style={tw`flex-2 justify-center items-center`}>
        <Animatable.Image
          animation={"flipInY"}
          source={require("../../assets/logo.png")}
          style={tw``}
          resizeMethod="auto"
        />
      </View>

      <Animatable.View
        animation={"fadeInUp"}
        style={tw` flex justify-center bg-white rounded-t-3xl px-4 py-12 gap-6`}
      >
        <View style={tw`relative w-full`}>
          <View style={tw`absolute bg-white z-10 px-2 top-[-6px] left-[8px] `}>
            <Text style={tw``}>E-mail:</Text>
          </View>
          <TextInput
            placeholder="Digite um E-mail..."
            style={tw`flex items-center h-[48px] border-solid border-[#a1a1a1]  border rounded px-4`}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={tw`flex justify-center w-full items-center bg-[#38a69D] py-4 rounded-xl`}
          onPress={() => handleSignIn()}
        >
          <Text style={tw`text-white font-bold`}>Login</Text>
        </TouchableOpacity>

        <Animatable.View
          animation={"fadeInLeft"}
          style={tw`flex flex-row justify-center items-center`}
        >
          <Text style={tw`flex items-center justify-center`}>
            Não possui uma conta?{" "}
          </Text>
          <TouchableOpacity style={tw`flex justify-center items-center`}>
            <Text style={tw`font-bold`}>Registre-se</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}
