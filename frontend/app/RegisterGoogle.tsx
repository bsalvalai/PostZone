/* eslint-disable prettier/prettier */
import { Pressable, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { Stack, router } from "expo-router"
import React from "react";

export default function RegisterGoogle() {
    const colorScheme = useColorScheme();
    const [mail, onChangeMail] = useState("")
    const [password, onChangePassword] = useState("")
    const [repeatPassword, onChangeRepeatPassword] = useState("")
    const [username, onChangeUsername] = useState("")
    const [gender, onChangeGender] = useState("")


    const handleNext = () => {
        //HABRIA QUE VERIFICAR LOS MAILS, PASSWORDS Y USERNAME
        router.push({
            pathname: "/SetProfilePhoto",
            params: {mail, password, username, gender},
        })
    }
    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: ""
            }}
        />
        <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Crear Cuenta (GOOGLE)</Text>
    
        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={username}
        onChangeText={onChangeUsername}
        placeholder="Ingrese su nombre de usuario..."
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>

        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={gender}
        onChangeText={onChangeGender}
        placeholder="Ingrese su genero..."
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>


        <Link href="/Login" asChild>
            <TouchableOpacity>
                <Text style={{marginTop: 20}}>Ya tienes una cuenta? Inicia sesion aqui</Text>
            </TouchableOpacity>
        </Link>
        
        <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Siguiente</Text>
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