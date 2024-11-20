/* eslint-disable prettier/prettier */
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { TabHome } from "../../assets/icons/TabHome";
import { TabSearch } from "../../assets/icons/TabSearch";
import { TabProfile } from "../../assets/icons/TabProfile";
import { TabNewPost } from "../../assets/icons/TabNewPost";
import { TabFavourites } from "../../assets/icons/TabFavourites";
import { Notifications } from "../../assets/icons/Notifications";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: Platform.select({ 
          ios: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].barSeparator,
            height: 67,
          },
          android: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme ?? "light"].barSeparator,
            height: 90,
          }
        }), 
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? "light"].barSeparator,
          height: 70,
          paddingTop: 15,
        }, //Color de la tabBar
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTintColor: Colors[colorScheme ?? "light"].text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Inicio",
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <TabHome color={Colors[colorScheme ?? "light"].text}/>
          ),
          headerRight: () => (
            //Meter el logo de las notificaciones aca
            <Link href="/notifications" asChild>
              <Pressable>
                <Notifications
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 16 }}
                />
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Busqueda de usuario",
          tabBarIcon: () => (
            <TabSearch color={Colors[colorScheme ?? "light"].text} />
          ),
        }}
      />

      <Tabs.Screen
        name="newpost"
        options={{
          title: "Nueva Publicacion",
          tabBarIcon: () => (
            <TabNewPost color={Colors[colorScheme ?? "light"].text} />
          ),
        }}
      />

      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favoritos",
          tabBarIcon: () => (
            <TabFavourites color={Colors[colorScheme ?? "light"].text} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <TabProfile color={Colors[colorScheme ?? "light"].text} />
          ),
        }}
      />
      
    </Tabs>
  );
}
