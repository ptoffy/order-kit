import { getOrders } from "../controllers/order.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

router.get('/', checkAuth([UserRole.Cook, UserRole.Bartender]), getOrders)

export default router
module.exports = router
