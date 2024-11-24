import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "../constants/Cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const { width } = Dimensions.get("screen");

// Configuración de imágenes de ejemplo
const postImage1 = cld
  .image("cld-sample-2")
  .resize(thumbnail().width(width).height(width));
const postImage2 = cld
  .image("samples/balloons")
  .resize(thumbnail().width(width).height(width));
const postImage3 = cld
  .image("cld-sample-4")
  .resize(thumbnail().width(width).height(width));
const userImage = cld.image("samples/smile");

export default function PostListItem() {
  const [showComments, setShowComments] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null); // Cambiado a aceptar cualquier objeto de imagen

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AdvancedImage cldImg={userImage} style={styles.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>bautisalva</Text>
          <Text style={styles.location}>Parque Nacional</Text>
        </View>
        <Text style={styles.date}>20/08/2024</Text>
      </View>

      {/* Post Description */}
      <Text style={styles.description}>
        Un poco de lo que fue este viaje, agradecido de haberlo compartido con
        la familia que nunca falla!
      </Text>

      {/* Post Images */}
      <View style={styles.imageRow}>
        {[postImage1, postImage2, postImage3].map((img, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedImage(img)} // Guardar directamente el objeto de imagen
          >
            <AdvancedImage cldImg={img} style={styles.postImage} />
          </Pressable>
        ))}
      </View>

      {/* Footer Icons */}
      <View style={styles.iconContainer}>
        <Pressable onPress={() => setShowComments(!showComments)}>
          <Ionicons name="chatbubble-outline" size={28} color="white" />
        </Pressable>
        <Pressable onPress={() => setIsStarred(!isStarred)}>
          <AntDesign
            name={isStarred ? "star" : "staro"}
            size={28}
            color={isStarred ? "yellow" : "white"}
          />
        </Pressable>
        <Text style={styles.iconText}>3</Text>
      </View>

      {/* Comments Section */}
      {showComments && (
        <View style={styles.comments}>
          <Text style={styles.comment}>
            <Text style={styles.commentAuthor}>fedee56 </Text>
            Que lindo paisaje amigo! Me alegro que lo hayas disfrutado
          </Text>
          <Text style={styles.comment}>
            <Text style={styles.commentAuthor}>agush02 </Text>
            Fuaa, la próxima tenemos que ir a Montevideo!
          </Text>
        </View>
      )}

      {/* Fullscreen Image Modal */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setSelectedImage(null)} style={styles.modalClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </Pressable>
          {selectedImage && (
            <AdvancedImage cldImg={selectedImage} style={styles.fullscreenImage} />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  date: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  description: {
    color: "white",
    marginBottom: 10,
    fontSize: 14,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postImage: {
    width: width / 3.2,
    height: width / 4,
    borderRadius: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 5,
    marginBottom: 10,
  },
  iconText: {
    color: "white",
    marginLeft: 1,
  },
  comments: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
  },
  comment: {
    color: "white",
    marginBottom: 5,
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  closeText: {
    color: "white",
    fontSize: 18,
  },
  fullscreenImage: {
    width: "90%",
    height: "70%",
    borderRadius: 8,
  },
});
