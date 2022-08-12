import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../firebase";
import firebase from "firebase/compat/app";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import {
  useFonts,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  Rubik_800ExtraBold,
  Rubik_900Black,
  Rubik_300Light_Italic,
  Rubik_400Regular_Italic,
  Rubik_500Medium_Italic,
  Rubik_600SemiBold_Italic,
  Rubik_700Bold_Italic,
  Rubik_800ExtraBold_Italic,
  Rubik_900Black_Italic,
} from "@expo-google-fonts/rubik";

const Outh = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Rubik_500Medium,
    Rubik_400Regular,
    Rubik_700Bold,
  });

  const [isVerified, setIsVerified] = useState(false);
  const [showPhoneButton, setShowPhoneButton] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("+49");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
    setIsVerified(true);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log("Credential Result", result.user.uid);
        setCode("");
        navigation.navigate("LocationScreen");
      })
      .catch((error) => {
        navigation.navigate("Outh");
      });
  };

  return (
    <LayoutWrapper>
      <View className="w-full h-full items-center">
        <Image
          source={require("../assets/images/blinddate.png")}
          className="w-[118px] h-[118px]"
        />
      </View>
      {fontsLoaded && (
        <View className="absolute w-full h-full justify-center items-center">
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            style={{ margin: 0, backgroundColor: "#000" }}
          />
          {!isVerified && (
            <>
              <Text
                style={{ fontFamily: "Rubik_500Medium" }}
                className="text-white text-[35px] text-center px-[64px]"
              >
                Deine Telefonnummer
              </Text>

              <TextInput
                onFocus={setShowPhoneButton}
                onBlur={setShowPhoneButton}
                onChangeText={setPhoneNumber}
                placeholder="+49"
                defaultValue="+49"
                placeholderTextColor="#fff"
                keyboardType="phone-pad"
                autoCompleteType="tel"
                style={{ fontFamily: "Rubik_400Regular" }}
                className="mt-[45px] px-[5px] text-[30px] text-white bg-transparent focus:outline-none border-none border-b-2 border-b-white w-[60%] placeholder-red-300"
              />

              {showPhoneButton && (
                <TouchableOpacity
                  onPress={sendVerification}
                  className="rounded-[10px] bg-white px-[48px] py-[15px] shadow-lg absolute bottom-[50px]"
                >
                  <Text
                    className="text-[#EF5E1D] text-[25px]"
                    style={{ fontFamily: "Rubik_700Bold" }}
                  >
                    Verifizieren
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {isVerified && (
            <>
              <Text
                style={{ fontFamily: "Rubik_500Medium" }}
                className="text-white text-[35px] text-center px-[64px]"
              >
                Deine Code
              </Text>
              <TextInput
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCompleteType="tel"
                style={{ fontFamily: "Rubik_400Regular" }}
                className="mt-[45px] px-[5px] text-[30px] text-white bg-transparent focus:outline-none border-none border-b-2 border-b-white w-[60%] placeholder-red-300"
              />
              <TouchableOpacity
                onPress={() => setIsVerified(false)}
                className="mt-[10px]"
              >
                <Text className="text-white">Keinen Code bekommen?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmCode}
                className="rounded-[10px] bg-white px-[48px] py-[15px] shadow-lg absolute bottom-[50px]"
              >
                <Text
                  className="text-[#EF5E1D] text-[25px]"
                  style={{ fontFamily: "Rubik_700Bold" }}
                >
                  Verifizieren
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </LayoutWrapper>
  );
};

export default Outh;
