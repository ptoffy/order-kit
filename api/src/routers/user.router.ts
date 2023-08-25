import { loginHandler, registerHandler, deleteHandler, meHandler } from "../controllers/user.contoller";
import { checkAuth } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";
import { UserRole } from "../models/user.model";

const router = require('express')();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.delete('/:id', checkRole(UserRole.CASHIER), deleteHandler);
router.get('/me', checkAuth, meHandler);

export default router;
module.exports = router;
