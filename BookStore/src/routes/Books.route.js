import express from 'express';
import * as BookController from '../controllers/book.controller';
const router = express.Router();
router.get('/:_id', BookController.getAllBooks);

export default router;