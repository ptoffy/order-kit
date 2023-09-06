import { assignTable, freeTable, listTables, occupyTable } from "../controllers/table.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

router.get('/', checkAuth([UserRole.Waiter, UserRole.Cashier]), listTables)
router.post('/:tableNumber/occupy', checkAuth([UserRole.Waiter]), occupyTable)
router.post('/:tableNumber/free', checkAuth([UserRole.Waiter, UserRole.Cashier]), freeTable)
router.post('/:tableNumber/assign', checkAuth([UserRole.Waiter]), assignTable)

export default router
module.exports = router
