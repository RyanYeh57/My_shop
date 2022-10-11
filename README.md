# MyShop 
本專案為node.js + express 實作的購物網站，可以模擬購物網站的會員系統、廠商後台的商品管理以及消費者購物及訂單狀況。


## 畫面呈現
### 首頁
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E9%A6%96%E9%A0%81.png)
### 登入頁面
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E7%99%BB%E5%85%A5%E9%A0%81.png)
### 註冊頁面
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E8%A8%BB%E5%86%8A%E9%A0%81.png)
### 修改會員資料
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E4%BF%AE%E6%94%B9%E6%9C%83%E5%93%A1%E8%B3%87%E6%96%99.png)
### 後台頁面
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E5%BE%8C%E8%87%BA%E7%AE%A1%E7%90%86.png)
### 新增商品 Modal
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E6%96%B0%E5%A2%9E%E5%95%86%E5%93%81.png)
### 修改商品 Modal
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E4%BF%AE%E6%94%B9%E5%95%86%E5%93%81.png)
### 刪除商品
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E5%88%AA%E9%99%A4%E5%95%86%E5%93%81.png)
### 購物車
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E8%B3%BC%E7%89%A9%E8%BB%8A.png)
### 填寫訂單
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E5%A1%AB%E5%AF%AB%E8%A8%82%E5%96%AE.png)
### 訂單紀錄
![image](https://github.com/RyanYeh57/My_shop/blob/master/public/img/%E8%A8%82%E5%96%AE%E7%B4%80%E9%8C%84.png)


## 功能

### 登入前：
+ 使用者可以註冊會員、登入會員
+ 使用者可以瀏覽首頁商城
+ 使用者可以將商品加入購物車

### 一般會員登入後：
+ 一般會員可以修改基本資料
+ 一般會員可以升級成為廠商
+ 一般會員可以購買商品加入購物車的商品
+ 一般會員可以選擇不同的付款方式
+ 一般會員可以查詢訂單紀錄並查看出貨狀態

### 廠商登入後：
+ 廠商可以擁有一般會員的功能
+ 廠商可以使用後台管理商品(新增、修改、刪除)


## 使用說明：
1. 請先確認有安裝 node.js 及 npm
2. 打開 Terminal ，並複製此專案的 Clone 至本機電腦

    $ git clone https://github.com/RyanYeh57/My_shop.git

3. 進入專案資料夾

    $ cd my_shop

4. 安裝所需套件

    $ npm install

5. 啟動 MySQL 伺服器並創建資料庫 「myshop」
6. 到 my_shop/connection 中的複製所有 SQL 檔案並創建 table 
7. 到 my_shop/connection/mySqlConnetion.js 輸入 MySQL 的連接資訊
```
{
  "host":"HOST",
  "user":"USER",
  "password":"PASSWORD",
  "database":"myshop"
}
```
8. 啟動 MongoDBCompass 並創建資料庫「products」並新增 Collection「image」
9. 快速啟動
    
    $ npm start

10. 在瀏覽器中輸入`http://localhost:3000/` 使用網站

## 開發工具
+ frontend: bulma/axios/ejs
+ backend: nodejs/multer/express
+ database: mysql/mongodb