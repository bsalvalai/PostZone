const { Router } = require("express");
const { check } = require("express-validator");
const postController = require('../controllers/post.controller.js');
const jwtValidator = require("../middlewares/jwtValidator");
const checkFields = require("../middlewares/validateFields");

const router = Router();

// Create Post (Ruta protegida con JWT Token) - Crear una nueva publicación
router.post("/",
  [
    jwtValidator,
    check("content").optional(),
    check("images").not().isEmpty().withMessage("Se requieren las imágenes del Post"),
    check("location").optional(),
    checkFields
  ],
  postController.createPost
);

// Delete Post (Ruta protegida con JWT Token) - Eliminar una publicación
router.delete('/:_id', jwtValidator, postController.deletePost);

// Add Favorite Post (Ruta protegida con JWT Token) - Agregar una publicación a favoritos
router.post("/:_id/favorites", jwtValidator, postController.addFavoritePost);

// Remove Favorite Post (Ruta protegida con JWT Token) - Eliminar una publicación de favoritos
router.delete("/:_id/favorites", jwtValidator, postController.removeFavoritePost);

// Add Comment Post (Ruta protegida con JWT Token) - Agregar un comentario a una publicación
router.post("/:_id/comments",
  [
    jwtValidator,
    check("message").not().isEmpty().withMessage("El mensaje de comentario es obligatorio"),
    checkFields
  ],
  postController.addCommentPost
);

// Remove Comment Post (Ruta protegida con JWT Token) - Eliminar un comentario de una publicación
router.delete("/:_id/comments",
  [
    jwtValidator,
    check("commentId").not().isEmpty().withMessage("Se requiere el ID del comentario"),
    checkFields
  ],
  postController.removeCommentPost
);

// Get Post Comments (Ruta protegida con JWT Token) - Obtener lista de comentarios de la publicación
router.get('/:_id/comments', jwtValidator, postController.getPostComments);

module.exports = router;
