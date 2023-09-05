import { createOrder, getOrders, updateOrder, updateOrdersBulk } from "../controllers/order.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

router.get('/', checkAuth(), getOrders)
router.post('/:id/update', checkAuth(), updateOrder)
router.post('/', checkAuth([UserRole.Waiter]), createOrder)
router.post('/update-bulk', checkAuth([UserRole.Cashier]), updateOrdersBulk)

export default router
module.exports = router
