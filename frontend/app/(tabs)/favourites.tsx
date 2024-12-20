/* eslint-disable prettier/prettier */
import { Text, View } from "@/components/Themed";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function FavouritesScreen() {

  useEffect(()=>{
    //TRAER LOS POSTEOS FAVORITOS CON AXIOS
  },[])
  

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta es la pagina de Favoritos</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="#ADADAD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});