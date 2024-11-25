/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { Stack } from "expo-router"
import React from "react";

export default function ChangeName() {

    const colorScheme = useColorScheme();
    const [name, onChangeName] = useState("")
    
    const handleLogin = () =>{

        if(!name){
            alert("Te olvidase de llenar el campo")
            return;
        }

        //FALTARIA EL AXIOS PARA CAMBIAR EL NOMBRE

    }

    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: "",
                headerBackTitle: "Atras"
            }}
        />
        <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Cambiar nombre y apellido</Text>
        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={name}
        onChangeText={onChangeName}
        placeholder="Ingrese su nuevo nombre y apellido..."
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Aceptar</Text>
        </TouchableOpacity>

        
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
    margin: 20,
},
});