/* eslint-disable prettier/prettier */
import { View } from "@/components/Themed";
import { Stack, Router, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, useColorScheme, TextInput, TouchableOpacity, Alert } from "react-native";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';
import { upload } from "cloudinary-react-native";
import { cld } from "@/constants/Cloudinary";

type Coordinates = Location.LocationObject | null

export default function EditPost() {
    const [location, setLocation] = useState<Coordinates>(null);
    const [description, onChangeDescription] = useState("")
    const [adress, setAdress] = useState("")
    const [imagesUri, setImageUri] = useState<string[]>([]);
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

    useEffect(() => {
        if (images) {
            console.log("Recibido en useEffect, images:", images);
    
            try {
                // Analiza el string JSON
                const parsedImages = JSON.parse(images as string);
                console.log("Imagenes parseadas:", parsedImages);
    
                if (Array.isArray(parsedImages)) {
                    const uris = parsedImages.map((image: { uri: string }) => image.uri);
                    console.log("URIs extraídas:", uris);
                    setImageUri(uris);
                } else {
                    console.warn("El formato de 'images' no es un array.");
                }
            } catch (error) {
                console.error("Error al analizar 'images':", error);
            }
        }
    }, [images]);

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
    const handleAccept = async() => {
        await uploadImages();
    }

    const uploadImages = async () => {
        if (!imagesUri || imagesUri.length === 0) {
            Alert.alert("Error", "No hay imágenes para subir");
            return;
        }
    
        const options = {
            upload_preset: 'Default',
            unsigned: true,
        };
    
        try {
            // Utiliza Promise.all para esperar a que todas las imágenes se suban.
            const uploadPromises = imagesUri.map(async (uri) => {
                // Sube cada imagen individualmente.
                return await upload(cld, {
                    file: uri, // Usa la URI de la imagen.
                    options: options,
                    callback: (error: any, response: any) => {
                        if (error) {
                            console.error("Error al subir la imagen:", error);
                        } else {
                            console.log("Imagen subida correctamente:", response);
                            //TENGO QUE GUARDAR EN EL BACK EL response.public_id
                        }
                    }
                });
            });
    
            // Espera a que todas las promesas se resuelvan.
            const uploadResults = await Promise.all(uploadPromises);
            console.log("Resultados de las subidas:", uploadResults);
            Alert.alert("Éxito", "Todas las imágenes se han subido correctamente");
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            Alert.alert("Error", "Ocurrió un problema al subir las imágenes");
        }
    };


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