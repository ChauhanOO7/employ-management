const express=require("express");
const router=express.Router();
const {addemploy,getalldata,searcheddata}=require("../controllers/addemploy");
const {updateemploy,deleteemploy}=require("../controllers/updateemploy");
const cache = require('../middleware/cache');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../backend/static/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now()+"-"+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post("/add",upload.single('file'),addemploy);
router.post("/update",upload.single('file'),updateemploy);
router.post("/delete",deleteemploy);
router.get("/alldata",cache(3600),getalldata);
router.post("/searcheddata",searcheddata)

module.exports=router;
