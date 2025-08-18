import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { SuggestionsRoutes } from "../modules/suggestions/suggestion.route"

export const router = Router()
const apiRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: SuggestionsRoutes
    },

]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


