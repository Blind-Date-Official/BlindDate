import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

const NoLocationSet = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Rubik_500Medium,
    Rubik_400Regular,
    Rubik_700Bold,
  });

  return (
    <LayoutWrapper>
      {fontsLoaded && (
        <View className="w-full h-full items-center">
          <Text>Bitte aktiviere deinen Standort um fortzufahren.</Text>
          <TouchableOpacity
            onPress={navigation.navigate("LocationScreen")}
            className="rounded-[10px] bg-white px-[48px] py-[15px] shadow-lg absolute bottom-[50px] disabled:bg-slate-400"
          >
            <Text
              className="text-[#EF5E1D] text-[25px]"
              style={{ fontFamily: "Rubik_700Bold" }}
            >
              Zurück
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </LayoutWrapper>
  );
};

export default NoLocationSet;
