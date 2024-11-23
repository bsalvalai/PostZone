/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, Alert, Image, Dimensions } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/constants/Cloudinary";
import React from "react";

export default function SetProfilePhoto() {
    let { firstName, lastName, mail, password, username, gender} = useLocalSearchParams();
    const colorScheme = useColorScheme();
    const [image, setImage] = useState("")
    const { width } = Dimensions.get("screen");

    const defaultImage = cld.image("default_icon_bvd2di")

    console.log("nombre: ", firstName)
    console.log("apellido: ", lastName)
    console.log("mail: ", mail)
    console.log("password", password)
    console.log("username: ", username)
    console.log("gender: ", gender) 
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
            quality: 0.5,
            })

            if (!result.canceled && result.assets[0]) {
            console.log(result.assets[0]);
            setImage(result.assets[0].uri);
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
            quality: 0.5,
        })
        
        if (!result.canceled && result.assets[0]) {
            console.log(result.assets[0].uri);
            setImage(result.assets[0].uri);
        } else {
            Alert.alert("Error", "No seleccionaste ninguna imagen")
        }
    }

    const handleDeleteImage = () => {
        if(image){
            setImage("")
        }
    }

    const handleNext = () => {
        //MANEJAR EL TEMA DE QUE HAYA O NO IMAGEN. QUIZAS SE PUEDE AGREGAR COMO UN ASSET EN el cloudinary
        if(!image){
            setImage("")
        }

        router.push({
            pathname: "/SetCoverPhoto", 
            params: {mail, password, image}
        })
    }

    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: "Foto de perfil"
            }}
        />

        {!image && <Image source={{uri: defaultImage.toURL()}} style={[styles.image, {height: width}]}/>}
        {image && <Image source={{uri: image}} style={[styles.image, {height: width}]}/>}
        <TouchableOpacity style={styles.button} onPress={handleChooser}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Agregar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Siguiente</Text>
        </TouchableOpacity>
        {image && 
        <TouchableOpacity onPress={handleDeleteImage}>
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
},
});