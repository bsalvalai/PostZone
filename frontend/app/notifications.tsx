/* eslint-disable prettier/prettier */
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { Tabs } from "expo-router"
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import React from "react";
export default function NotificationsScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTitle: "Notificaciones"
      }}/>
      <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? "light"].barSeparator}]}  />
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
    marginVertical: 2,
    height: 1,
    width: "100%",
  },
});