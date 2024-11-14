/* eslint-disable prettier/prettier */
import { Dimensions, Pressable, StyleSheet, useColorScheme, useWindowDimensions } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors  from "@/constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { AdvancedImage } from "cloudinary-react-native"
import { Cloudinary } from "@cloudinary/url-gen";
import { cld } from "@/constants/Cloudinary";



export default function HomeScreen() {
  const colorScheme = useColorScheme();



  const { width } = Dimensions.get("screen")

  const myImage = cld.image("sample");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta es la pagina Inicio</Text>
      <Link href="/Login" asChild>
        <Pressable> 
          <Text>IR A LOGIN</Text>
        </Pressable>
      </Link>
    </View>
  );
}
//El separator es una barra
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: "80%",
  },
});
