/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { Stack } from "expo-router"

export default function Login() {
    const colorScheme = useColorScheme();
    const [mail, onChangeMail] = useState("")
    const [password, onChangePassword] = useState("")
    
    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: ""
            }}
        />
        <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Iniciar sesion</Text>
        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={mail}
        onChangeText={onChangeMail}
        placeholder="Ingrese su E-Mail"
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>

        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={password}
        onChangeText={onChangePassword}
        placeholder="Ingrese su contraseña"
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>
        <TouchableOpacity style={styles.button}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Log In</Text>
        </TouchableOpacity>
        <Link href="/Register" asChild>
            <TouchableOpacity>
                <Text style={{marginTop: 20}}>No tienes una cuenta? Registrate aqui</Text>
            </TouchableOpacity>
        </Link>
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
