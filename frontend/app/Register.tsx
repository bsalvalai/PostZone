/* eslint-disable prettier/prettier */
import { Alert, Pressable, StyleSheet, TextInput, TouchableOpacity, useColorScheme, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { useState } from "react";
import { Stack, router } from "expo-router"

export default function Register() {
    const colorScheme = useColorScheme();
    const [mail, onChangeMail] = useState("")
    const [password, onChangePassword] = useState("")
    const [repeatPassword, onChangeRepeatPassword] = useState("")
    const [username, onChangeUsername] = useState("")
    const [gender, onChangeGender] = useState("")


    const handleNext = () => {
        if(!mail || !password || !repeatPassword || !username || !gender){
            Alert.alert("Error","No se completaron todos los campos")
            
        }
        //HABRIA QUE VERIFICAR LOS MAILS, PASSWORDS Y USERNAME CON EL BACK
        router.push({
            pathname: "/SetProfilePhoto",
            params: {mail, password, username, gender},
        })
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Stack.Screen options={{ headerTitle: "" }} />
                    <Text style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}>
                        Crear Cuenta
                    </Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, { color: Colors[colorScheme ?? "light"].text }]}
                        value={mail}
                        onChangeText={onChangeMail}
                        placeholder="Ingrese su E-Mail"
                        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, { color: Colors[colorScheme ?? "light"].text }]}
                        value={password}
                        onChangeText={onChangePassword}
                        placeholder="Ingrese su contraseña..."
                        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                        secureTextEntry
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, { color: Colors[colorScheme ?? "light"].text }]}
                        value={repeatPassword}
                        onChangeText={onChangeRepeatPassword}
                        placeholder="Repita su contraseña..."
                        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                        secureTextEntry
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, { color: Colors[colorScheme ?? "light"].text }]}
                        value={username}
                        onChangeText={onChangeUsername}
                        placeholder="Ingrese su nombre de usuario..."
                        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, { color: Colors[colorScheme ?? "light"].text }]}
                        value={gender}
                        onChangeText={onChangeGender}
                        placeholder="Ingrese su género..."
                        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                    />
                    <Link href="/Login" asChild>
                        <TouchableOpacity>
                            <Text style={{ marginTop: 20 }}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={[{ color: "#FFFFFF" }, { fontSize: 16 }, { justifyContent: "center" }]}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
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