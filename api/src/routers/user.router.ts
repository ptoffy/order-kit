import { loginHandler, registerHandler, deleteHandler, meHandler, usersHandler } from "../controllers/user.contoller";
import { checkAuth } from "../middleware/auth.middleware";
import { UserRole } from "../models/user.model";

const router = require('express')();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.delete('/:username', checkAuth(UserRole.CASHIER), deleteHandler);
router.get('/me', meHandler);
router.get('/', checkAuth(UserRole.CASHIER), usersHandler);

export default router;
module.exports = router;
