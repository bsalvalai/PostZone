/* eslint-disable prettier/prettier */
import { StyleSheet, Image, Dimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
//import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import React from "react";


export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("screen");
  const height = width/2
  const profileImageSize = width * 0.35;

  //Habria que hacer una configuracion para los colores de los generos y los colores de la gamificacion
  //FALTARIA CAMBIAR EL DISENIO 
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover-%2358-design-template-bd93962fbbef38a888efdc4f27fe081d_screen.jpg?ts=1611218479",
        }}
        style={[styles.image, { height: height }, {width: width}]}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww",
          }}
          style={[
            styles.profileImage,
            { height: profileImageSize },
            { width: profileImageSize },
            {
              borderRadius: profileImageSize / 2,
              borderWidth: 1,
              borderColor: "202020",
              marginTop: -profileImageSize/2
            },
          ]}
        />
      </View>
      <View>
        <Text style={styles.usernameStyle}>bautisalva</Text>
      </View>
      <View>
        <Text style={styles.fullNameStyle}>Bautista Salvalai</Text>
      </View>
      <View style={[{flexDirection: "row"}]}>
        <View style={[styles.gamificationLevel, {backgroundColor: "#36D13B"}]}>
          <Text >Nivel 1</Text>
        </View>
      
        <Text style={[{color: "#5081FF"}, {fontWeight: "bold"},{marginTop: 15}, {marginLeft: 20}]}>Hombre</Text>
      </View>
      <Text style={{marginTop: 15}}>Amante de los viajes en familia.22</Text>
      <View>
        <View style={styles.statsContainer}>
            <Text style={styles.stat}>Seguidores{'\n'}130</Text>
            <Text style={styles.stat}>Seguidos{'\n'}346</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    width: "80%",
  },
  image: {
    resizeMode: "cover",
  },
  profileContainer: {
    backgroundColor: "Transparent",
  },
  profileImage: {
    resizeMode: "cover",
    justifyContent: "center"
  },
  usernameStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  gamificationLevel: {
    marginTop: 15,
    width: 54,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  fullNameStyle: {
    marginTop: 15,
    fontSize: 14
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "60%",
    marginTop: 30
  },
  stat: {
    fontSize: 20,
    textAlign: 'center',
  },
});
