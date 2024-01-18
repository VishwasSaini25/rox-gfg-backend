import express from 'express';
import { fetchTransactions } from '../controllers/transaction.js';
const router=express.Router();

router.get("/",fetchTransactions);


export default router;