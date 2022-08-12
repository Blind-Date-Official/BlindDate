import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db, users } from "../firebase";
import { ref, onValue, push, update, remove } from "firebase/database";

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // TODO: add location to database

  useEffect(() => {
    setUserData(users);
    if (userData) {
      console.log("Users", userData);
    }
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    /* console.log("Database:", db); */
    /* navigation.navigate("StepForm"); */
  }

  return (
    <LayoutWrapper>
      <View className="w-full h-full items-center">
        <Text>{text}</Text>
      </View>
    </LayoutWrapper>
  );
};

export default LocationScreen;
