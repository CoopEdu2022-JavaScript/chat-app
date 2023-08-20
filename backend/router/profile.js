const express = require('express')
const multer = require('multer')
const db = require('../db/db')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const { getPayload } = require('../jwt_config')

const uploadPath = path.join(__dirname, '../../frontend/src/assets/icons/');
const upload = multer({ dest: uploadPath });


router.use(express.json())
router.use(express.urlencoded({ extended: true }))

function emptydir(delpath){
  fpath="../frontend/src/assets/icons"
  const files=fs.readdirSync(fpath);
  files.forEach(file=>{
      const filePath=`${fpath}/${file}`;
      const stats=fs.statSync(filePath);
      let path_to_compare=filePath.replace('../frontend/','')
      if(stats.isDirectory()){
          emptydir(filePath);
      }else{
        if(path_to_compare==delpath)
        {
          fs.unlinkSync(filePath);
          console.log(`删除${file}文件成功`)
        }
        else{
          console.log(path_to_compare)
        }
      }
  });
}
router.post('/deleteicon', upload.single('image'), async (req, res) => {

  const user_id = getPayload(req).user_id
  const sql = 'SELECT usericon from users WHERE uid=?'
  const values = [user_id]
  const [del_img]=await db.query(sql,values)
  emptydir(del_img[0].usericon)
})
module.exports = router