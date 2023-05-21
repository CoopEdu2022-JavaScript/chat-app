const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const app = express()
// 这里添加了数据库连接的代码
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hc20070521',
    database: 'msachatdatabase',
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
router.post('/login', (req, res) => {
    console.log(req.body);
    console.log(" -------------------- ")
    const username = req.body.fusername;
    const password = req.body.fpassword;
    // const username = "StanHe"
    // const password = "Hc20070521"
    // 检查username和password的值是否为undefined
    if (username === undefined) {
        // 如果username或password的值为undefined，向前端返回错误信息
        console.log("scanjdhsadasdasdasduashdjasjd")
        res.status(400).json({ error: '用户名或密码不能为空' });
        return;
    }
    if (password === undefined) {
        // 如果username或password的值为undefined，向前端返回错误信息
        console.log("scanjdhuashdjasjd")
        res.status(400).json({ error: '用户名或密码不能为空' });
        return;
    }

    const crypto = require('crypto');
    const hash = crypto.createHash('sha3-256');
    hash.update(password);
    const password_hashed = hash.digest('hex');
    connection.query(
        'SELECT * FROM users WHERE usernames = ? AND passwords = ?',
        [username, password_hashed],
        function (err, results) {
            if (err) throw err;
            if (results.length > 0) {
                // 用户名和密码匹配
                res.json({ success: true });
            } else {
                // 用户名或密码错误
                res.status(401).json({ error: '用户名或密码错误' });
            }
        }
    );
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'login.html'));
});

// 在进程退出时关闭数据库连接
process.on('exit', () => {
    connection.end();
});


module.exports = router;