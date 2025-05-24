import { Router } from "express";
import { createUrl, deleteById, findById, home, readURLs, updateOneById } from "../controllers/public.controller.js";

export const router = Router()


router.get('/', home)
router.get('/urls', readURLs)
router.get('/urls/:uid', findById)
router.post('/urls', createUrl)
router.put('/urls/:uid', updateOneById)
router.delete('/urls/:uid',deleteById)
