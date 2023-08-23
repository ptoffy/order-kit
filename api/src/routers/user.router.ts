import { loginHandler, registerHandler, deleteHandler } from "../controllers/user.contoller";

const router = require('express')();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.delete('/:id', deleteHandler);

export default router;
module.exports = router;
