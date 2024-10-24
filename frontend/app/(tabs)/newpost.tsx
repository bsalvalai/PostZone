/* eslint-disable prettier/prettier */
import { Text, View } from "@/components/Themed";
import { StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function NewPostScreen() {
  const [image, setImage] = useState('');

  const { width } = Dimensions.get("screen");
  const handleImagePickerPress = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    })

    if(!result.canceled){
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esta es la pagina de nuevo post</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="#ADADAD" />
      {image  && <Image source={{ uri: image }} style={styles.image} height={ width }/> }
      <View> 
        <TouchableOpacity activeOpacity={0.8} onPress={ handleImagePickerPress }> 
          <Text>Abrir galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>{setImage('')}}>
          <Text>Resetear imagen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//USAR LA LIBRERIA DE IMAGE PICKER
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
  image: {
    width: "100%",
  }
});