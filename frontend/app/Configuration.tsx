/* eslint-disable prettier/prettier */

import { View, Text } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router, Stack } from "expo-router"
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


    //EN ALGUNOS DE ESTOS HANDLE, SE PODRIAN PASAR LOS DATOS DEL USUARIO A LAS VISTAS COMO PARAMETROS
    //SOLO QUE ES NECESARIO USAR, EN LA VISTA A LA QUE SE NAVEGUE, EL useLocalSearchParams(); (Hay algunas vistas como en EditPost.tsx que se usa, para tener de referencia)
    const handleChangeName = () => {
        router.push({
            pathname: "/ConfigChangeName"
        })
    }

    const handleChangeProfilePhoto = () => {
        router.push({
            pathname: "/ConfigChangeProfilePhoto"
        })
    }

    const handleChangeCoverPhoto = () => {
        router.push({
            pathname: "/ConfigChangeCoverPhoto"
        })
    }

    const handleChangePassword = () => {
        router.push({
            pathname: "/ConfigChangePassword"
        })
    }
    const handleLogOut = () => {
        Alert.alert("Cerrar sesion","Esta seguro de que quiere cerrar sesion?",[
            {text: "Cancelar"},
            {text: "Si", onPress:() => {
                //ACA IRIA LA LOGICA PARA DESLOGUEARSE, CON AXIOS
            }},
        ])
    }

    const handleDeleteAccount = () => {
        Alert.alert("Borrar Cuenta","Esta seguro de que quiere borrar su cuenta?",[
            {text: "Cancelar"},
            {text: "Si", onPress:() => {
                //ACA IRIA LA LOGICA PARA BORRAR LA CUENTA, CON AXIOS
            }},
        ])
    }

    

    //Boton de editar notificaciones por si a alguien se le ocurre que hacer
    //<TouchableOpacity style={styles.option}>
    //    <ConfigEditNotifications color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
    //    <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar notificaciones</Text>
    //</TouchableOpacity>


    //SI TIRA UN ERROR QUE DICE "Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
    //TENGO ENTENDIDO QUE ES PORQUE EN LOS COMPONENTES USO EL styles.icon, PERO ANDAR, ANDA
    return (
        <View style={styles.container}>
            <Stack.Screen 
            options={{
                headerTitle: "Configuracion"
            }}/>
            <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? "light"].barSeparator}]}  />
            
            <TouchableOpacity style={[styles.option, {marginTop: 50}]} onPress={handleChangeName}>
                <ChangeName color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar nombre y apellido</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={handleChangeProfilePhoto}> 
                <ConfigEditUserPhoto color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar foto de perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleChangeCoverPhoto}>
                <ConfigEditCoverPhoto color={Colors[colorScheme ?? "light"].text} style={styles.icon}/> 
                <Text  style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Editar foto de portada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
                <ConfigChangePassword color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cambiar contraseña</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.option} onPress={handleLogOut}>
                <ConfigLogOut color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Cerrar sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
                <ConfigDeleteAccount color={Colors[colorScheme ?? "light"].text} style={styles.icon}/>
                <Text style={[{color: Colors[colorScheme ?? "light"].text}, styles.optionText]}>Borrar cuenta</Text>
            </TouchableOpacity>

                
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    option: {
        flexDirection: "row",
        marginVertical: 20,
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