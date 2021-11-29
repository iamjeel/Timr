import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// To formate The Number Style
const formatNumber = (number) => `0${number}`.slice(-2);

// To get the time
const getRemaining = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

// Export App
export default function App() {

  // Load Fonts
    const [fontsLoaded] = useFonts({
      "JosefinSans-Bold": require("./assets/fonts/JosefinSans-Bold.ttf"),
      "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
      "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
    });

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { minutes, seconds } = getRemaining(remainingSeconds);
  const toggle = () => {
    setIsActive(!isActive);
  };
  const reset = () => {
    setRemainingSeconds(0);
    setIsActive(false);
  };
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSeconds((remainingSeconds) => remainingSeconds + 1);
      }, 1000);
    } else if (!isActive && remainingSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSeconds]);

// To load Fonts
    if (!fontsLoaded) {
      return <AppLoading />;
    } else { 
      return(
      <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.logoText}>Timr</Text>
      <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={toggle}>
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.buttonReset}>
          <Text style={[styles.buttonText, styles.buttonTextReset]}>
            Restart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A19",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Ubuntu-Bold",
    color: "#F7F7F750",
    fontSize: 44,
    marginTop: 50,
    marginBottom: 100,
  },
  timerText: {
    fontFamily: "JosefinSans-Bold",
    color: "#F7F7F7",
    fontSize: 124,
    marginBottom: 250,
  },
  buttonText: {
    fontFamily: "Ubuntu-Light",
    color: "#F7F7F780",
    fontSize: 40,
    textDecorationLine: "underline",
  },
  buttonTextReset: {
    color: "#F7F7F780",
    marginLeft: 150,
  },
});
