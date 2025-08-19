import { Router } from "express"
import { AuthRoutes } from "../modules/auth/auth.route"
import { SuggestionsRoutes } from "../modules/suggestions/suggestion.route"
import { FriendRequestRoutes } from "../modules/friendRequests/friendRequest.route"
import { MessageRoutes } from "../modules/messages/message.route"

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
    {
        path: "/friend-request",
        route: FriendRequestRoutes
    },
    {
        path: "/messages",
        route: MessageRoutes
    }

]

apiRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


