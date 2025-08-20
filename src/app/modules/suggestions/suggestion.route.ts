import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { SuggestionController } from "./suggestion.controller";
const router = express.Router();

router.get("/suggestions", checkAuth('user','admin'), SuggestionController.suggestions);


export const SuggestionsRoutes = router;