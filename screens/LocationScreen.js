import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db, users } from "../firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("The request was denied");
    } else {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        /* setLocation(location); */
        /* navigation.navigate("StepForm"); */
      } catch (e) {
        setErrorMsg(true);
        /* navigation.navigate("NoLocationSet"); */
      }
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // TODO: add location to database
  // TODO: make location work

  /*  useEffect(() => {
    setUserData(users);
    if (userData) {
      console.log("Users", userData);
    }
  }, []); */

  let [fontsLoaded] = useFonts({
    Rubik_500Medium,
    Rubik_400Regular,
    Rubik_700Bold,
  });

  return (
    <LayoutWrapper>
      {location && (
        <View className="w-full h-full items-center">
          <Text>testasdasda</Text>
        </View>
      )}
      {errorMsg && (
        <>
          {fontsLoaded && (
            <View className="w-full h-full items-center">
              <Text>Bitte aktiviere deinen Standort um fortzufahren.</Text>
              <TouchableOpacity
                onPress={getLocation}
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
        </>
      )}
    </LayoutWrapper>
  );
};

export default LocationScreen;
