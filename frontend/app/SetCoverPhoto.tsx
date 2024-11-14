/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, Alert, Image, Dimensions } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import React from "react";



export default function SetCoverPhoto() {
    const { mail, password} = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset>() || undefined;
    const { width } = Dimensions.get("screen");

    const handleChooser = async() =>{
        Alert.alert("Tipo de foto","Seleccione si quiere sacar una foto con su camara o elegir de la galeria",[
            {text: "Camara", onPress:() => handleCamera() },
            {text: "Galeria", onPress:()=> handleImageLibrary() },
            {text: "Cancelar"},
        ])
    }

    const handleCamera = async() => {
        try{
            console.log("CAMARA")
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16 ,9],
            quality: 1,
            })

            if (!result.canceled && result.assets[0]) {
            console.log(result.assets[0]);
            setImage(result.assets[0]);
            } else {
            Alert.alert("Error", "No seleccionaste ninguna imagen")
            }
        } catch {

        }

    }

    const handleImageLibrary = async() => {
        console.log("GALERIA")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })
        
        if (!result.canceled && result.assets[0]) {
            console.log(result.assets[0]);
            setImage(result.assets[0]);
        } else {
            Alert.alert("Error", "No seleccionaste ninguna imagen")
        }
    }

    const handleDeleteImage = () => {
        if(image){
            setImage(undefined)
        }
    }

    const handleNext = () => {

    }
    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: "Foto de perfil"
            }}
        />
        {!image && <View style={[styles.image, {height: width/2}, {backgroundColor: "#A3A3A3"}]}></View>}
        {image && <Image source={image} style={[styles.image, {height: width/2}]}/>}
        <TouchableOpacity style={styles.button} onPress={handleChooser}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Agregar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Siguiente</Text>
        </TouchableOpacity>
        {image && 
        <TouchableOpacity onPress={handleDeleteImage} >
            <Text style={[{color:"#5081FF"}, {marginBottom: 10}]}>Borrar</Text>
        </TouchableOpacity>}
        <Text style={[{color: Colors[colorScheme ?? "light"].text},{marginHorizontal: 30}]}>Atencion: Si no elegis ninguna foto, continuaras con una imagen por defecto</Text>
    </View>
    
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 90,
  },
  input: {
    borderRadius: 20,
    height: 40,
    width: 300,
    padding: 10,
    alignItems: "center",
    margin: 15,
  },
  button: {
    backgroundColor: "#5081FF",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40,
    margin: 15,
    },
    fullImage: { 
    width: "100%",
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: 200,

},
});