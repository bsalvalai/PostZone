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
import { Link, Stack, router } from "expo-router";
import { useState } from "react";
import React from "react";
  
  
    
export default function RecoverPassword(){
    const colorScheme = useColorScheme();
    const [token, onChangeToken] = useState("")
  
    const handleTokenSender = () => {
        //VALIDAR EL TOKEN
    }


    return (
      <View style={styles.container}>
        <Stack.Screen
        options={{
          headerTitle: ""
        }}
        />
        <View style={styles.container}> 
          <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Validar Token</Text>
          <TextInput style={[styles.input, 
          { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
          { color: Colors[colorScheme ?? "light"].text }]} 
  
          value={token}
          onChangeText={onChangeToken}
          placeholder="Ingrese el token enviado por Mail..."
          placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
          </TextInput>
          <TouchableOpacity style={styles.button} onPress={handleTokenSender}>
              <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Aceptar</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 90
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