/* eslint-disable prettier/prettier */
import { Dimensions, Pressable, StyleSheet, useColorScheme, useWindowDimensions,FlatList } from "react-native";

import {AntDesign, Ionicons, Feather} from '@expo/vector-icons'

//import EditScreenInfo from "@/components/EditScreenInfo";
//import { Text, View } from "@/components/Themed";
import { Text, View } from "../../components/Themed";
//import Colors  from "@/constants/Colors";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import React from "react";
import { AdvancedImage } from "cloudinary-react-native"
import { Cloudinary } from "@cloudinary/url-gen";
//import { cld } from "@/constants/Cloudinary";
import { cld } from "../../constants/Cloudinary";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
//import PostListItem from "@/components/PostListItem";
import PostListItem from "../../components/PostListItem";


export default function HomeScreen() {
  const colorScheme = useColorScheme();

  //FALTARIA IMPLEMENTAR TIMELINE INTEGRADO CON BACK

  const { width } = Dimensions.get("screen")

  const myImage = cld.image("sample");

  const image = cld.image("cld-sample-2");
  // Apply the transformation.
  image
  .resize(
   thumbnail().width(width).height(width))  // Crop the image, focusing on the face.

 //user image
 const userImage = cld.image("samples/smile")
 
 const posts = [{ id: "1" }, { id: "2" }]; // Ejemplo de datos

  return (
    <FlatList
    data={posts}
    renderItem={({ item }) => <PostListItem />}
    keyExtractor={(item) => item.id}
    style={{ flex: 1, backgroundColor: "lightgray" }}
  />
);

}
//El separator es una barra
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 48,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
  },
  userName:{
    fontWeight:"500",
    padding:10,
    alignContent:"center",
  },
  date:{
    marginLeft:"auto",
    padding:10
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 8,
  },
  location:{
    
  }
});
