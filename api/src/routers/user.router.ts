import { loginHandler, registerHandler, deleteHandler } from "../controllers/user.contoller";
import { checkRole } from "../middleware/role.middleware";
import { UserRole } from "../models/user.model";

const router = require('express')();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.delete('/:id', checkRole(UserRole.CASHIER), deleteHandler);

export default router;
module.exports = router;
