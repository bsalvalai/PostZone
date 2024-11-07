/* eslint-disable prettier/prettier */
import { StyleSheet, Image, Dimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get("screen");
  const height = (width * 182) / 390;
  const profileImageSize = width * 0.35;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover-%2358-design-template-bd93962fbbef38a888efdc4f27fe081d_screen.jpg?ts=1611218479",
        }}
        style={[styles.image, { height: height }]}
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
              marginTop: height - profileImageSize / 2,
              borderWidth: 1,
              borderColor: "202020",
            },
          ]}
        />
      </View>
      <View style={{flexDirection: "row", marginLeft: (width / 2) - 10, marginTop: 15, marginBottom: 40, alignItems: "center", justifyContent: "space-around"}}> 
        <Text
          style={[
            styles.usernameStyle,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
        >
          bautisalva
        </Text>
        <View style={[{ backgroundColor: "#36D13B" },
          styles.gamificationLevel
        ]}> 
          <Text style={[{fontWeight: "bold"}, {color: "#FFFFFF"}]}>Nivel 1</Text>
        </View>
      </View>
      <View style={styles.followStyle}>
        <View style={styles.followersStyle}>
          <Text style={styles.followerTitleStyle}>Seguidores</Text>
          <Text style={styles.followersNumberStyle}>130</Text>
        </View>
        <View style={styles.followersStyle}>
          <Text style={styles.followerTitleStyle}>Seguidos</Text>
          <Text style={styles.followersNumberStyle}>346</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    resizeMode: "cover",
  },
  profileContainer: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "Transparent",
  },
  profileImage: {
    resizeMode: "cover",
    marginLeft: 19,
  },
  usernameStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  followStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  followersStyle: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  followerTitleStyle: {
    fontSize: 20,
    fontWeight: "500",
  },
  followersNumberStyle: {
    fontSize: 20,
  },
  gamificationLevel: {
    width: 54,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  }
});
