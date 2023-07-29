import express from 'express';
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  addUser,
  loginUser
} from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/adduser', addUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.get('/view', getUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
