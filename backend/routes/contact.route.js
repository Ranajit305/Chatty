import express from 'express'
import { newDm, oldDm, searchContacts } from '../controllers/contact.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router();

router.get('/:name', verifyToken, searchContacts);
router.get('/dm/new', verifyToken, newDm);
router.get('/dm/old', verifyToken, oldDm);

export default router