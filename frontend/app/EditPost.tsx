/* eslint-disable prettier/prettier */
import { View } from "../components/Themed";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, TextInput, TouchableOpacity, Alert } from "react-native";
import Colors from "../constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { Router } from "expo-router";
import * as ImagePicker from 'expo-image-picker'


export default function EditPost() {
    const [location, onChangeLocation] = useState("")
    const [description, onChangeDescription] = useState("")
    const colorScheme = useColorScheme();
    let { images }= useLocalSearchParams();

    const handleImageUpload = () => { 
        if(!images){
            Alert.alert("Alerta", "No hay imagenes seleccionadas",
                [{text: "OK"}]
            )
        }
    }
    console.log("IMAGENES PASADAS: ", images)

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Nueva Publicacion"
            }}/>
            <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? "light"].barSeparator}]}  />
            <View style={styles.configuration}>
                <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Configuracion del post</Text>
                <TextInput style={[styles.input, 
                    { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
                    { color: Colors[colorScheme ?? "light"].text },
                    { height: 40 }]} 

                    value={location}
                    onChangeText={onChangeLocation}
                    placeholder="Ingrese ubicacion (Opcional)..."
                    placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
                    </TextInput>
                <TextInput style={[styles.input, 
                    { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
                    { color: Colors[colorScheme ?? "light"].text },
                    { height: 130 },
                    { flexDirection: "column"},
                    { justifyContent: "flex-start"}]}
                    
                    value={description}
                    onChangeText={onChangeDescription}
                    placeholder="Ingrese una descripcion (Opcional)..."
                    placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                > 
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={handleImageUpload}>
                    <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    separator: {
        marginVertical: 2,
        height: 1,
        width: "100%",
    },
    configuration: {
        marginTop: 100,
        alignItems: "center",
        flexDirection: "column",
    },
    title:{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        borderRadius: 20,
        width: 300,
        padding: 10,
        alignItems: "center",
        margin: 20,
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
})