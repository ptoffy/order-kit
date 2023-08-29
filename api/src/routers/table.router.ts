import { listTables } from "../controllers/table.controller";

const router = require('express')();

router.get('/', listTables);

export default router;
module.exports = router;
