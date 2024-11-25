/* eslint-disable prettier/prettier */
import { ScrollView } from "react-native";

import React from "react";

import PostListItem from "../../components/PostListItem";


const postData = [
  {
    userImage: "https://cloudinary.com/samples/smile.jpg",
    userName: "bautisalva",
    location: "Parque Nacional",
    date: "20/08/2024",
    description: "Un poco de lo que fue este viaje...",
    images: [
      "https://cloudinary.com/cld-sample-2.jpg",
      "https://cloudinary.com/samples/balloons.jpg",
      "https://cloudinary.com/cld-sample-4.jpg",
    ],
    comments: [
      { author: "fedee56", text: "Que lindo paisaje amigo!" },
      { author: "agush02", text: "Fuaa, la próxima tenemos que ir a Montevideo!" },
    ],
  },
  {
    userImage: "https://cloudinary.com/samples/user2.jpg",
    userName: "johndoe",
    location: "Montevideo",
    date: "15/08/2024",
    description: "Hermosos momentos en la playa.",
    images: [
      "https://cloudinary.com/samples/beach1.jpg",
      "https://cloudinary.com/samples/beach2.jpg",
    ],
    comments: [
      { author: "janedoe", text: "Qué lugar increíble!" },
    ],
  },
];
export default function HomeScreen() {
  
  //FALTARIA IMPLEMENTAR TIMELINE INTEGRADO CON BACK
 
 const posts = [{ id: "1" }, { id: "2" }]; // Ejemplo de datos

  return (
    <ScrollView>
      {postData.map((post, index) => (
        <PostListItem
          //key={index}
          userImage={post.userImage}
          userName={post.userName}
          location={post.location}
          date={post.date}
          description={post.description}
          images={post.images}
          comments={post.comments}
        />
      ))}
    </ScrollView>
  );
}