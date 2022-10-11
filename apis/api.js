const express = require('express');
const router = express.Router();
const mysqlDb = require('../connection/mySqlConnetion')
const Mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/products'
const multer = require('multer');

/*
網站基本API
*/
// 取得所有商品
router.route("/products")
.get((req, res) => {
  // mysql 取得資料
  // 1 -> mysql 取得成功, mongodb 取得圖片資料  
  mysqlDb.query(
    "SELECT * FROM products;",
    (err, result) => {
      if (err) {
        res.status(500).json({message:"Mysql error"});
      } else {
        Mongoclient.connect(url, (err, client) => {
          if (err) {
            res.status(500).json({message:"Mongodb error"});
          } else {
            let db = client.db('products');
            db.collection('image').find().toArray((err, imageList) => {
              if (err) {
                res.status(500).json({message:"Mongodb error"});
              } else {
                for (let j = 0;j < imageList.length; j+=1) {
                  for (let i = 0;i < result.length; i+=1) {
                    let productId = result[i].id;
                    if (productId === imageList[j].id) {
                      result[i].img = imageList[j].image;
                    }
                  }
                }
                res.status(200).json({productList:result});
              }
            })
          }
        })
      }
    }
  )
})
// 登入會員
router.route("/login")
.post((req, res) => {
  // 查詢帳號密碼
  let data = req.body;
  mysqlDb.query(
    "SELECT * FROM custaccount WHERE account = ? and password = ?;",[data.account, data.password], // 代入前端的登入資訊
    (err, result) => {
      if (err) {
        res.status(400).json({message:"bad requert!"});
      } else {
        if (result != null && result[0] != undefined && result[0].id != null) {
          let custAccount = JSON.parse(JSON.stringify(result[0])); // 先將 result[0] 轉成字串之後用 JSON.parse 轉成 json 格式
          custAccount.password = null; // 給前端為空值 (隱藏的意思)
          res.status(200).json({custAccount: custAccount});
        } else {
          res.status(400).json({message:"Not correct account or password!"});
        }
      }
    }
    )

})
// 註冊會員
router.route("/register")
.post((req, res) => {
  let data = req.body;
  mysqlDb.query(
    "INSERT INTO custaccount (account, password, type, name, cellphone, email, birthday) VALUES (?, ? , ? , ? , ? , ? ,?);",
    [data.account, data.password, 1, data.name, data.cellphone, data.email, data.birthday],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).json({message:"bad request!"});
      } else {
        // result 在 insert 成功後會回傳 insertId
        if (result != null && result.insertId != null) {
          res.status(201).json({message:"insert successfully!"})
        } else {
          res.status(400).json({message:"bad request!"}); 
        }
      }
    }
    )
})
// 取得會員歷史訂單
router.route("/histroy/:id")
.get((req, res) => {
  let cust_id = req.params.id;
  mysqlDb.query(
    "SELECT * FROM shop_order WHERE cust_id = ?",[cust_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({message:"mysql error"})
      } else {
        res.status(200).json({result:result})
      }
    }
    )
})
// 金流API
router.route("/submitOrder")
.post((req, res) => {
  let data = req.body;
  mysqlDb.query(
    "INSERT INTO shop_order (cust_id, cust_name, phone, address, status, total) VALUES (?, ?, ?, ?, ?, ?)",
    [data.custAccount.id, data.order.name, data.order.phone, data.order.address, 1, data.order.tatal],
    (err, result) => {
      if (err) {
        res.status(400).json({message:"mysql error"});
      } else {
        res.status(201).json({message:"insert successfully!"})
      }
    }
  )
})

const upload = multer({
  limit: {
    // 限制上傳檔案大小為 10000000 byte
    fileSize: 10000000
  }
})

/*
網站基本API
*/
// 取得所有商品
router.route("/products")
.get((req, res) => {
  // mysql 取得資料
  // mysql 取得成功, mongodb 取得圖片資料  
  mysqlDb.query(
    "SELECT * FROM products;",
    (err, result) => {
      if (err) {
        res.status(500).json({message:"Mysql error"});
      } else {
        Mongoclient.connect(url, (err, client) => {
          if (err) {
            res.status(500).json({message:"Mongodb error"});
          } else {
            let db = client.db('products');
            db.collection('image').find().toArray((err, imageList) => {
              if (err) {
                res.status(500).json({message:"Mongodb error"});
              } else {
                for (let j = 0;j < imageList.length; j+=1) {
                  for (let i = 0;i < result.length; i+=1) {
                    let productId = result[i].id;
                    if (productId === imageList[j].id) {
                      result[i].img = imageList[j].image;
                    }
                  }
                }
                res.status(200).json({productList:result});
              }
            })
          }
        })
      }
    }
  )
})

// 會員系統
// 登入會員
router.route("/login")
.post((req, res) => {
  // 查詢帳號密碼
  let data = req.body;
  mysqlDb.query(
    "SELECT * FROM custaccount WHERE account = ? and password = ?;",[data.account, data.password], // 代入前端的登入資訊
    (err, result) => {
      if (err) {
        res.status(400).json({message:"bad requert!"});
      } else {
        if (result != null && result[0] != undefined && result[0].id != null) {
          let custAccount = JSON.parse(JSON.stringify(result[0])); // 先將 result[0] 轉成字串之後用 JSON.parse 轉成 json 格式
          custAccount.password = null; // 給前端為空值 (隱藏的意思)
          res.status(200).json({custAccount: custAccount});
        } else {
          res.status(400).json({message:"Not correct account or password!"});
        }
      }
    }
    )

})
// 註冊會員
router.route("/register")
.post((req, res) => {
  let data = req.body;
  mysqlDb.query(
    "INSERT INTO custaccount (account, password, type, name, cellphone, email, birthday) VALUES (?, ? , ? , ? , ? , ? ,?);",
    [data.account, data.password, 1, data.name, data.cellphone, data.email, data.birthday],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).json({message:"bad request!"});
      } else {
        // result 在 insert 成功後會回傳 insertId
        if (result != null && result.insertId != null) {
          res.status(201).json({message:"insert successfully!"})
        } else {
          res.status(400).json({message:"bad request!"}); 
        }
      }
    }
    )
})
// 修改會員
router.route("/edit/:id")
.patch((req, res) => {
  let cust_id = req.params.id;
  let data = req.body
  mysqlDb.query(
    "UPDATE custaccount SET name = ?, cellphone = ?, email = ? WHERE id = ?",
    [data.name, data.cellphone, data.email, cust_id],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).json({message:"bad request!"})
      } else {
        res.status(200).json({message:"update successfully!"})
      }
    }
    )
})
// 成為廠商
router.route("/firm/:id")
.patch((req, res) => {
  let cust_id = req.params.id;
  mysqlDb.query(
    "UPDATE custaccount SET type = ? WHERE id = ?",
    ['2', cust_id],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).json({message:"bad request!"})
      } else {
        res.status(200).json({message:"update successfully!"})
      }
    }
    )
})

// 取得會員歷史訂單
router.route("/histroy/:id")
.get((req, res) => {
  let cust_id = req.params.id;
  mysqlDb.query(
    "SELECT * FROM shop_order WHERE cust_id = ?;",[cust_id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({message:"mysql error"})
      } else {
        res.status(200).json({result:result})
      }
    }
    )
})
// 交易 API
router.route("/submitOrder")
.post((req, res) => {
  let data = req.body;
  mysqlDb.query(
    "INSERT INTO shop_order (cust_id, cust_name, phone, address, status, total) VALUES (?, ?, ?, ?, ?, ?);",
    [data.custAccount.id, data.order.name, data.order.phone, data.order.address, 1, data.order.total],
    (err, result) => {
      if (err) {
        res.status(400).json({message:"mysql error"});
      } else {
        res.status(201).json({message:"insert successfully!"})
      }
    }
  )
})

// 後臺API
// 新增產品
router.route("/product")
.post(upload.single('img'),
  (req, res) => {
    let data = req.body;
    let file = req.file;
    // 將照片轉成字串
    let imageSrting;
    if (file !== undefined && file !== null) {
      imageSrting = `data:image/gif;base64,${file.buffer.toString('base64')}`
    }
    mysqlDb.query(
      "INSERT INTO products (name, description, amount, inventory, status) VALUES (?, ?, ?, ?, ?);",
      [data.name, data.desc, data.amount, data.inventory, data.status],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({message:"mysql error"})
        } else {
          // 商品資料存入 Mysql 成功後，將照片字串存入 Mongodb 
          Mongoclient.connect(url, (err, client) => {
            if (err) {
              console.log(err);
              res.status(400).json({message:"mongodb error"});
            } else {
              let db = client.db("products");
              let image = db.collection("image");
              image.insertOne({
                id: result.insertId,
                image: imageSrting
              }, (err, response) => {
                if (err) console.log(err)
                else res.status(200).json({message:"bad request"})
              })
            }
          })
        }
      }
    )
})
// 修改商品
router.route("/product/:id")
.put(upload.single('img'),
(req, res) => {
  let id = req.params.id
  let data = req.body;
  let file = req.file;
  let imgString;
  if (file !== undefined && file !== null) {
    imgString = `data:image/gif;base64,${file.buffer.toString('base64')}`
  }
  // 用 id 更新 Mysql 
  mysqlDb.query(
    "UPDATE products SET name= ?, description = ?, amount = ?, inventory = ?, status = ? WHERE id = ?;",
    [data.name, data.desc, data.amount, data.inventory, data.status, id], 
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json()
      } else {
        Mongoclient.connect(url, (err, client) => {
          if (err) {
            console.log(err);
            res.status(400).json({message:"mysql error"})
          } else {
            if (imgString != null && imgString.length > 0) {
              let db = client.db("products");
              let image = db.collection("image");
              image.updateOne(
                {"id":Number(id)},
                {$set: {"image": imgString}},
                (err, response) => {
                  if (err) {
                    console.log(err);
                    res.status(400).json({message:"mongodb error"});
                  } else {
                    res.status(200).json({message:"update suseccfuly!"});
                  }
                }
              )     
            } else {
              res.status(400).json({message:"mongodb error"})
            }
          }
        })
      }
    }
  )
}
)
// 刪除產品
router.route("/product/:id")
.delete((req, res) =>{
  let id = req.params.id;
  mysqlDb.query(
    "DELETE FROM products WHERE id = ?;",
    [id],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(400).json({message:"mysql error"});
      } else {
        Mongoclient.connect(url, (err, client) =>{
          let db = client.db('products');
          let image = db.collection('image');
          image.deleteOne(
            {id:Number(id)},
            (err, response) => {
              if (err) {
                res.status(400).json({message:"mongodb error"});
              } else {
                res.status(200).json({message:"delete suseccfuly!"});
              }
            }
          ) 
        })
      }
    }
  )
})

module.exports = router;