/* eslint-disable prettier/prettier */
import { View } from "@/components/Themed";
import { Stack, Router, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, TextInput, TouchableOpacity, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';

type Coordinates = Location.LocationObject | null

export default function EditPost() {
    const [location, setLocation] = useState<Coordinates>(null);
    const [description, onChangeDescription] = useState("")
    const [adress, setAdress] = useState("")
    const [locationPermission, setLocationPermission] = useState(false)
    const colorScheme = useColorScheme();
    let { images }= useLocalSearchParams();

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log("RECHAZADO")
            return;
          }
          console.log("ACEPTADO")
          setLocationPermission(true)
          let currentLocation = await Location.getCurrentPositionAsync({}).then();
          setLocation(currentLocation);

        })();
      }, []);

      useEffect(()=>{
        if(Location)
            reverseGeocode();
            console.log("direccion: ", adress)
      },[location])

    const handleImageUpload = () => { 
        if(!images){
            Alert.alert("Alerta", "No hay imagenes seleccionadas",
                [{text: "OK"}]
            )
        }
    }

    const reverseGeocode = async () => {
        
        if(location?.coords.latitude !== undefined && location?.coords.longitude !== undefined){
            const getReverseGeocodedLocation = await Location.reverseGeocodeAsync({
                latitude: location?.coords.latitude, 
                longitude: location?.coords.longitude})

            const { city, country, region } = getReverseGeocodedLocation[0];
            const adress = city + ", " + region + ", " + country 
            setAdress(adress);
        }
    }

    //CREO QUE TIENE QUE SER ASYNC (?)
    const handleAccept = () => {
        console.log(images)
        router.replace("/")
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Nueva Publicacion"
            }}/>
            <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? "light"].barSeparator}]}  />
            <View style={styles.configuration}>
                <Text style={[styles.title, {color: Colors[colorScheme ?? "light"].text}]}>Configuracion del post</Text>
                <Text style={[styles.input, {color: Colors[colorScheme ?? "light"].text}]}>Ubicacion: {locationPermission ? adress : "No hay ubicacion"}</Text>
                <TextInput style={[styles.input, 
                    { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
                    { color: Colors[colorScheme ?? "light"].text },
                    { height: 130 },
                    { flexDirection: "column"},
                    { justifyContent: "flex-start"}]}
                    
                    value={description}
                    onChangeText={onChangeDescription}
                    placeholder="Ingrese una descripcion (Opcional)..."
                    placeholderTextColor={Colors[colorScheme ?? "light"].textColor}
                > 
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={handleAccept}>
                    <Text style={[{color: "#FFFFFF"}, {fontSize: 16}, {justifyContent: "center"}]}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    separator: {
        marginVertical: 2,
        height: 1,
        width: "100%",
    },
    configuration: {
        marginTop: 100,
        alignItems: "center",
        flexDirection: "column",
    },
    title:{
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 30,
    },
    input: {
        borderRadius: 20,
        width: 300,
        padding: 10,
        alignItems: "center",
        margin: 20,
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
})