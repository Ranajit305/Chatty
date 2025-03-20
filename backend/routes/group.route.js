import express from 'express'
import { verifyToken } from '../utils/verifyToken.js';
import { createGroup, getGroupContacts, getGroups } from '../controllers/group.controller.js';

const router = express.Router();

router.get('/', verifyToken, getGroupContacts);
router.post('/create', verifyToken, createGroup);
router.get('/group', verifyToken, getGroups);

export default router