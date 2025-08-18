import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { SuggestionController } from "./suggestion.controller";
const router = express.Router();

router.get("/suggestions", checkAuth('admin', 'user'), SuggestionController.suggestions);


export const SuggestionsRoutes = router;