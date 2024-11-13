/* eslint-disable prettier/prettier */
import { Text, View } from "../../components/Themed";
import { StyleSheet, TextInput, useColorScheme, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import { TabSearch } from "../../assets/icons/TabSearch";

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [text, onChangeText] = useState("")
  const { height } = Dimensions.get("window")

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}> 
        <TextInput style={[styles.input, 
        { backgroundColor: Colors[colorScheme ?? "light"].textInputBackGround }, 
        { color: Colors[colorScheme ?? "light"].text }]} 

        value={text}
        onChangeText={onChangeText}
        placeholder="Buscar usuario..."
        placeholderTextColor={Colors[colorScheme ?? "light"].textColor}>
        </TextInput>
        <TabSearch color={Colors[colorScheme ?? "light"].text}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20
  },
  input: {
    borderRadius: 20,
    height: 40,
    width: 300,
    padding: 10,
    alignItems: "center"
  },
});
