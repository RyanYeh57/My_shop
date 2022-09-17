$('#login').click((evt) => {
  evt.preventDefault();
  login();
})

function login() {
  let data = {
  account: $("#accound").val(),
  password: $("#password").val()
  };
  axios.post("/api/login", data)
  .then((res) => {
    if (res.status === 200) {
      setInfo("custAccount", JSON.stringify(res.data.custaAccount));
      res.require("/index"); // 測試
    }
  })
  .catch((error) => {
    alert("登入失敗，請重新登入。");
    location.reload();
  })
}

function setInfo(key, value) {
  localStorage.setItem(key, value);
  setCookie(key, value, 600); // 登入有效時間6分鐘
}

function setCookie(key, value, seconds) {
  seconds = seconds || 0;
  let expires = "";
  if (seconds !== 0) {      //設置 cookie 有效時間   
    let date = new Date();
    // 此處有效時間單位為毫秒
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // 將設置好的資訊存回 cookie 中
  document.cookie = name + "=" + escape(value) + expires + "; path=/";   
}

module.exports = login;