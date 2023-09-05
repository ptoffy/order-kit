import { getItems } from "../controllers/item.controller"

const router = require('express')()

router.get('/', getItems)

export default router
module.exports = router
