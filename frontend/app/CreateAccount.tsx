/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Stack } from "expo-router";
import { GoogleLogo } from "../assets/icons/GoogleLogo";
import React from "react";

export default function CreateAccount() {
    const colorScheme = useColorScheme();


    const handleRegister = () =>{
      router.push({
        pathname: "/Register",
      })
    }

    const handleRegisterGoogle = () => {
      router.push({
        pathname: "/RegisterGoogle"
      })
    }

    
    return (
    <View style={styles.container}>
        <Stack.Screen 
        options={{
            headerTitle: ""
        }}/>
        <Text style={styles.title}>Crear cuenta</Text>

        <TouchableOpacity style={[styles.googleButton, {backgroundColor: Colors[colorScheme ?? "light"].googleButton}]} onPress={handleRegisterGoogle}>
            <GoogleLogo style={{marginLeft: 5}} />
            <Text style={[{color: "#202020"}, {fontSize: 16}, {marginHorizontal: 30}, {marginRight: 60}]}>Registrarse con google</Text>
        </TouchableOpacity>

        <Text style={[{color: Colors[colorScheme ?? "light"].text}, {marginVertical: 10}]}>————————— O —————————</Text>

        <TouchableOpacity style={[styles.button, {backgroundColor: "#5081FF"}]} onPress={handleRegister}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Registrarse con E-Mail</Text>
        </TouchableOpacity>
        
       
        <TouchableOpacity onPress={()=>router.back()}>
            <Text style={{marginTop: 20}}>Ya tienes una cuenta? Inicia sesion aqui</Text>
        </TouchableOpacity>
        
    </View>
    )
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
      borderRadius: 11,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      height: 40,
      margin: 20,
    },
    googleButton: {
        borderRadius: 11,
        width: 300,
        height: 40,
        margin: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});