/* eslint-disable prettier/prettier */
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";

import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Stack } from "expo-router"
import React from "react";
import axios from "axios";
export let token="";

export default function Login() {
    const colorScheme = useColorScheme();
    const [mail, onChangeMail] = useState("")
    const [password, onChangePassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter(); // Inicializa el hook de navegación
    
    const handleLogin = async () =>{
        setErrorMessage("");
        if(!mail || !password){
            alert("ERROR TE OLVIDASTE DE LLENAR TODO")
        }
        try {
            const result = await axios.post("https://postzone.onrender.com/sessions",{email:mail, password})
            console.log(JSON.stringify(result.data,null,2));
            token = result.data.token; //Guardo el token
            setClientToken(token);
            router.push("/(tabs)/profile") //Redirect al perfil del usuario.
        } catch (error) {
           //setErrorMessage(error.response.data.error) //traigo el mensaje del back de error.
           // @ts-ignore
           alert(error.response.data.error)
        }
    }

    function setClientToken(token: string) {
        axios.defaults.headers.common = {Authorization: "bearer " + {token}};
    }

    //<Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>{errorMessage}</Text> LE SAQUE ESTO PORQUE ME HACIA UN ESPACIO GIGANTE
    return (
    <View style={styles.container}>
        <Stack.Screen
            options={{
                headerTitle: "",
                headerBackTitle: "Atras"
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
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
        secureTextEntry/>
   
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Log In</Text>
        </TouchableOpacity>

        <Link href="/Register" asChild>
            <TouchableOpacity>
                <Text style={{marginTop: 20}}>No tienes una cuenta? Registrate aqui</Text>
            </TouchableOpacity>
        </Link>
        
        <Link href="/RecoverMail" asChild>
            <TouchableOpacity>
                <Text style={{marginTop: 40}}>Olvidaste tu contraseña? Presione aqui</Text>
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