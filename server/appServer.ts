const express = require('express')
const app = express();
const server = require('http').Server(app);
//引入中间件模块
const bodyParser = require("body-parser");

const mysql = require("mysql");
//创建连接池对象
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'platSql',
    connectionLimit: 20
})

//创建路由器
const route = express.Router()
//设置端口
server.listen(9817, () => {
    console.log(`Example app listening at http://localhost:9817`)
});
const cors = require("cors");
app.use(
    cors({
        origin: ["http://10.61.115.40:3000", "http://localhost:3000"],
        credentials: true, // 允许客户端请求携带身份认证信息
    })
);

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
//挂载路由
app.use('/', route)

//错误处理中间件
//要拦截所有产生的错误
app.use((err, req, res, next) => {
    //err  接收到的错误
    console.log(err);
    res.send({ code: 500, msg: "服务器端错误" });
});

//登录
route.post("/login", (req, res) => {
    let name = req.body.uname;
    let pwd = req.body.upwd;
    console.log(req.body)
    console.log(name, pwd)
    let sql = "select * from account where uname=? and upwd=?";
    pool.query(sql, [name, pwd], (err, result) => {
        res.send(result);
    });
});
//注册普通用户
route.post("/reg", (req, res) => {
    let uname = req.body.uname;
    let upwd = req.body.upwd;
    let uemail = req.body.uemail;
    let sql = "insert into account (uid,uname,upwd,uemail,utype) value(null,?,?,?,'user')";
    pool.query(sql, [uname, upwd, uemail], (err, result) => {
        pool.query(sql, [uname, upwd, uemail], (err, result) => {
            let obj = {};
            if (result.affectedRows === 1) {
                obj = {
                    meta: {
                        msg: "注册成功",
                        status: 200,
                    },
                };
            } else {
                obj = {
                    meta: {
                        msg: "注册失败",
                        status: 400,
                    },
                };
            }
            res.send(obj);
        })
    });
});
//查看账号列表
route.get('/list', (req, res) => {
    let sql = "select * from account";
    pool.query(sql, (err, result) => {
        res.send(result);
    });
})
route.get('/list/:id', (req, res) => {
    let sql = "select * from account where uid=?";
    pool.query(sql, [req.params.id], (err, result) => {
        res.send(result);
    });
})
//删除用户
route.delete('/del', (req, res) => {
    let { id } = req.query;
    let sql = `delete from account where uid=?`;
    pool.query(sql, [id], (err, rs) => {
        if (err) throw err;
        let obj = {}
        if (rs.affectedRows === 0) {
            obj = {
                meta: {
                    msg: "删除失败",
                    status: 400
                },
            };
        } else {
            obj = {
                meta: {
                    msg: "删除成功",
                    status: 200,
                },
            };
        }
        res.send(obj)
    })
})
//数据库储存头像
route.post('/storeAvatar', (req, res) => {
    // console.log(req.body)
    let body = req.body
    let sql = "insert into avatar (ava_id,uid,originalname,filename,path,size) value(null,?,?,?,?,?)";
    pool.query(sql, [Number(body.uid), body.originalname, body.filename, body.path, Number(body.size)], (err, result) => {
        let obj = {};
        if (result.affectedRows === 1) {
            obj = {
                meta: {
                    msg: "上传成功",
                    status: 200,
                },
            };
        } else {
            obj = {
                meta: {
                    msg: "上传失败",
                    status: 400,
                },
            };
        }
        res.send(obj);
    })
})
//数据库查询头像
route.get('/getAvatar', (req, res) => {
    let sql = "select * from avatar";
    pool.query(sql, (err, result) => {
        res.send(result);
    });
})
route.get('/getAvatar/:id', (req, res) => {
    let sql = "select * from avatar where ava_id=?";
    pool.query(sql, [req.params.id], (err, result) => {
        res.send(result);
    });
})
//数据库删除头像
route.delete('/delAvatar/:id', (req, res) => {
    console.log(req.params)
    let id = Number(req.params.id);
    let sql = `delete from avatar where ava_id=?`;
    pool.query(sql, [id], (err, rs) => {
        if (err) throw err;
        let obj = {}
        if (rs.affectedRows === 0) {
            obj = {
                meta: {
                    msg: "删除失败",
                    status: 400
                },
            };
        } else {
            obj = {
                meta: {
                    msg: "删除成功",
                    status: 200,
                },
            };
        }
        res.send(obj)
    })
})
//配置multer中间件  
const multer = require('multer')
const uuid = require('uuid')
let mult = multer.diskStorage({
    destination: function (req, file, cb) {//指定目录
        cb(null, '../server/avatar')
    },
    filename: function (req, file, cb) {//指定文件名
        cb(null, uuid.v4() + file.originalname.split('.')[0])
    }
})
const uploadTools = multer({ storage: mult })
//  静态资源托管upload目录
route.use(express.static('../server/avatar'))
//上传头像
route.post('/upload', uploadTools.array('file'), (req, res) => {
    // console.log(req.files)
    res.send(req.files)
})
route.use('/avatar', express.static('./avatar'))
