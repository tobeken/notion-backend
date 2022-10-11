const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHanlder")


//memowosakusei
router.post("/",tokenHandler.verifyToken,memoController.create);

//memonosyutoku
router.get("/",tokenHandler.verifyToken,memoController.getAll);


//memonosyutoku
router.get("/:memoId",tokenHandler.verifyToken,memoController.getOne);

//memonokoushin
router.put("/:memoId",tokenHandler.verifyToken,memoController.update);

//memonokoushin
router.delete("/:memoId",tokenHandler.verifyToken,memoController.delete);

module.exports = router;

