const express = require('express');
const { createUser, loginUserController, GetAllUsers, GetSingleUser, RemoveUser, UpdateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword } = require('../controller/userController');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserController)
router.post('/forgot-password-token', forgotPasswordToken)

router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get('/all-users', GetAllUsers)
router.get('/:id', authMiddleware, isAdmin, GetSingleUser)

router.delete('/:id', RemoveUser)

router.put('/reset-password/:token', resetPassword)
router.put('/edit-user',authMiddleware, UpdateUser)
router.put('/password', authMiddleware, updatePassword)
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id',authMiddleware, isAdmin, unblockUser)

module.exports = router