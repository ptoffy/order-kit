import { loginHandler, registerHandler, deleteHandler, meHandler, usersHandler } from "../controllers/user.contoller";
import { checkAuth } from "../middleware/auth.middleware";
import { checkRole } from "../middleware/role.middleware";
import { UserRole } from "../models/user.model";

const router = require('express')();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.delete('/:username', checkRole(UserRole.CASHIER), deleteHandler);
router.get('/me', checkAuth, meHandler);
router.get('/', checkRole(UserRole.CASHIER), usersHandler);

export default router;
module.exports = router;
