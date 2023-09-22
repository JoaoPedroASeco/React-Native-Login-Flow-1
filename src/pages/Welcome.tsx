import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";

import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  // Hide header
  const navigation: any = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={tw`flex-1 bg-[#38a69D]`}>
      <View style={tw`flex-2 justify-center items-center`}>
        <Animatable.Image
          animation={"flipInY"}
          source={require("../../assets/logo.png")}
          style={tw``}
          resizeMethod="auto"
        />
      </View>
      <Animatable.View
        style={tw`h-[250px] rounded-t-3xl bg-white px-4 pt-8`}
        animation={"fadeInUp"}
        delay={1000}
      >
        <Text style={tw`text-2xl font-bold mb-3`}>
          Monitore, organize seus gastos de qualquer lugar
        </Text>
        <Text style={tw`text-[#a1a1a1] text-xl`}>
          Faça o login para começar
        </Text>
        <TouchableOpacity
          style={tw`w-full py-2 justify-center items-center bg-[#38a69d] rounded-xl mt-8`}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={tw`text-2xl text-white font-bold`}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
