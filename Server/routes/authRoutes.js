const express = require('express');
const { createUser, loginUserController, GetAllUsers, GetSingleUser, RemoveUser, UpdateUser, blockUser, unblockUser, handleRefreshToken, logout } = require('../controller/userController');
const { authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUserController)

router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)
router.get('/all-users', GetAllUsers)
router.get('/:id', authMiddleware, isAdmin, GetSingleUser)

router.delete('/:id', RemoveUser)

router.put('/edit-user',authMiddleware, UpdateUser)
router.put('/block-user/:id',authMiddleware, isAdmin, blockUser)
router.put('/unblock-user/:id',authMiddleware, isAdmin, unblockUser)

module.exports = router