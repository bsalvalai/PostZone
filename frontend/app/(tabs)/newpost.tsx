/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, useColorScheme, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import PagerView from "react-native-pager-view";
import Colors from "@/constants/Colors";
import { Link, router, Stack } from "expo-router";
import { Reject } from "../../assets/icons/Reject";
import { Confirmation } from "../../assets/icons/Confirm"
import { Router } from "expo-router";

export default function ImageSelectorScreen() {
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { width } = Dimensions.get("screen");
  const colorScheme = useColorScheme();


  const pickImages = async () => {
    if(images.length > 0){
      emptyImages
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 4,
    });

    if (!result.canceled && result.assets) {
      console.log(result.assets);
      setImages(result.assets);
      setSelectedIndex(0); // Empezar desde la primera imagen en el carrusel
    }
  };

  

  const emptyImages = () => {
    if(images.length > 0)
      setImages([]);
      setSelectedIndex(0);
  };


  return (
    <View style={[styles.container, {backgroundColor: Colors[colorScheme ?? "light"].background}]} >

      {images.length > 0 && (
        <>
          <View style={styles.imageCount}>
            <Text style={{fontWeight: "500"}}>{selectedIndex + 1}/{images.length}</Text>
          </View>
          <PagerView style={styles.pagerView} initialPage={0} onPageSelected={(e) => setSelectedIndex(e.nativeEvent.position)}>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={[styles.fullImage, {height: width}]} />
              </View>
            ))}
          </PagerView>
          <Stack.Screen options={{
            headerLeft: () => (
              <Pressable onPress={emptyImages} style={styles.headerButtons}>
                <Reject color={Colors[colorScheme ?? "light"].text} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable style={styles.headerButtons} onPress={()=> router.push({
                pathname: "/EditPost",
                params: { images: JSON.stringify(images), }
              })}> 
                <Confirmation color={Colors[colorScheme ?? "light"].text} />
              </Pressable>
              
            ),
          }}/>
        </>
      )}
      
      <TouchableOpacity style={styles.button} onPress={pickImages} >
        <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Abrir Galeria</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  thumbnailContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "#007aff",
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: { 
    width: "100%",
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#5081FF",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    margin: 20,
  },
  imageCount: {
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 23,
    borderRadius: 16,
    marginTop: 15,
    opacity: 0.5,
  },
  headerButtons: {
    marginHorizontal: 25,
  }
});