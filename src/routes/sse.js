const express = require("express");
const router = express.Router();

router.get("/sse", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream", //设定数据类型
    "Cache-Control": "no-cache", // 长链接拒绝缓存
    Connection: "keep-alive", //设置长链接
  });

  console.log("进入到长连接了");
  //持续返回数据
  setInterval(() => {
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`,
    };
    res.write(`data: ${JSON.stringify(data)}` + "\n\n");
  }, 1000);
});

router.post("/getMessage", (req, res) => {
  res.send({
    message: req.body.message || "你没输入",
  });
});

module.exports = router;
