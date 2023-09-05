import { createOrder, getOrders, updateOrder } from "../controllers/order.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

router.get('/', checkAuth([UserRole.Cook, UserRole.Bartender, UserRole.Waiter]), getOrders)
router.post('/:id/update', checkAuth([UserRole.Cook, UserRole.Bartender, UserRole.Waiter]), updateOrder)
router.post('/', checkAuth([UserRole.Waiter]), createOrder)

export default router
module.exports = router
