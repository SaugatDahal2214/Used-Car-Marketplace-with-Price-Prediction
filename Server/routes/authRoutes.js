const express = require("express");
const {
  createUser,
  loginUserController,
  GetAllUsers,
  GetSingleUser,
  RemoveUser,
  UpdateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  getOrders,
  createOrder,
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
  addToWishlist,
  removeFromWishlist,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.post('/wishlist', authMiddleware, addToWishlist);
router.post("/forgot-password-token", forgotPasswordToken);

router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/all-users", GetAllUsers);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware,  GetSingleUser);

router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", RemoveUser);

router.delete('/wishlist/:id', authMiddleware, removeFromWishlist);

router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/reset-password/:token", resetPassword);
router.put("/edit-user", authMiddleware, UpdateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/password", authMiddleware, updatePassword);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
