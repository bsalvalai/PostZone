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
import { Link } from "expo-router";
import { useState } from "react";
import { Stack } from "expo-router";
import { GoogleLogo } from "../assets/icons/GoogleLogo";

export default function Register() {
    const colorScheme = useColorScheme();
    return (
    <View style={styles.container}>
        <Stack.Screen 
        options={{
            headerTitle: ""
        }}/>
        <Text style={styles.title}>Crear cuenta</Text>

        <TouchableOpacity style={[styles.googleButton, {backgroundColor: Colors[colorScheme ?? "light"].googleButton}]}>
            <GoogleLogo style={{marginLeft: 5}} />
            <Text style={[{color: "#202020"}, {fontSize: 16}, {marginRight: 65}]}>Registrarse con google</Text>
        </TouchableOpacity>
        <Text style={[{color: Colors[colorScheme ?? "light"].text}, {marginVertical: 10}]}>————————— O —————————</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: "#5081FF"}]}>
            <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Registrarse con E-Mail</Text>
        </TouchableOpacity>
        <Link href="/Login" asChild>
            <TouchableOpacity>
                <Text style={{marginTop: 20}}>No tienes una cuenta? Registrate aqui</Text>
            </TouchableOpacity>
        </Link>
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
        justifyContent: "space-between",
        alignItems: "center",
    },
});