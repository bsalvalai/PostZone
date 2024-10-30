/* eslint-disable prettier/prettier */
import { BackHandler, Button, StyleSheet } from "react-native";

export default function ButtonPZ({ title, ...props}) {
  return <Button title={title} />;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5081FF",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 40, 
  },
});
