import { freeTable, listTables, occupyTable } from "../controllers/table.controller"

const router = require('express')()

router.get('/', listTables)
router.post('/:tableNumber/occupy', occupyTable)
router.post('/:tableNumber/free', freeTable)

export default router
module.exports = router
