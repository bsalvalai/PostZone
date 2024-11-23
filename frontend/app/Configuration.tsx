/* eslint-disable prettier/prettier */

import { View, Text } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Stack } from "expo-router"
//Opciones de configuracion en orden
import { ChangeName } from "@/assets/icons/ChangeName"
import { ConfigEditUserPhoto } from "@/assets/icons/ConfigEditUserPhoto"
import { ConfigEditCoverPhoto } from "@/assets/icons/ConfigEditCoverPhoto"
import { ConfigChangePassword } from "@/assets/icons/ConfigChangePassword"

import { ConfigChangeToDarkMode } from "@/assets/icons/ConfigChangeToDarkMode"
import { ConfigChangeToLightMode } from "@/assets/icons/ConfigChangeToLightMode"

import { ConfigEditNotifications } from "@/assets/icons/ConfigEditNotifications"
import { ConfigLogOut } from "@/assets/icons/ConfigLogOut"
import { ConfigDeleteAccount } from "@/assets/icons/ConfigDeleteAccount"
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function Configuration(){
    let systemColorScheme = useColorScheme()
    const [colorScheme, setColorScheme] = useState(systemColorScheme ?? "light")

    const handlePressLightMode = () => {
        setColorScheme("light")

    }


    const handlePressDarkMode = () => {
        setColorScheme("dark")

    }

    const handleDeleteAccount = () => {
        alert("Estas seguro de que quieres borrar tu cuenta?")
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Stack.Screen 
                options={{
                    headerTitle: "Configuracion"
                }}/>
                <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? "light"].barSeparator}]}  />
                <TouchableOpacity style={[styles.option, {marginTop: 50}]}>
                    <ChangeName color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar nombre y apellido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}> 
                    <ConfigEditUserPhoto color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar foto de perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <ConfigEditCoverPhoto color={Colors[colorScheme ?? "light"].text} style={styles.icon}/> 
                    <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar foto de portada</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <ConfigChangePassword color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar contraseña</Text>
                </TouchableOpacity>

                {colorScheme === "dark" && (
                    <>
                        <TouchableOpacity style={styles.option} onPress={handlePressLightMode}>
                            <ConfigChangeToLightMode color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                            <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar a modo claro</Text>
                        </TouchableOpacity>
                    </>
                )}
                {colorScheme !== "dark" && (
                    <>
                        <TouchableOpacity style={styles.option} onPress={handlePressDarkMode}>
                            <ConfigChangeToDarkMode color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                            <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar a modo oscuro</Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity style={styles.option}>
                    <ConfigEditNotifications color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar notificaciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <ConfigLogOut color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cerrar sesion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option}>
                    <ConfigDeleteAccount color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                    <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Borrar cuenta</Text>
                </TouchableOpacity>

                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    option: {
        flexDirection: "row",
        marginVertical: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    optionText: {
        fontSize: 20,
        marginRight: 40,
        
    },
    separator: {
        marginVertical: 2,
        height: 1,
        width: "100%",
    },
    icon: {
        marginLeft: 40
    }
});