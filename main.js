const express = require("express");
const app = express();
const fs = require("fs");
const utils = require("util");
const cors = require("cors");
const sse = require('./src/routes/sse.js')
const port = 3000;


function add() {
  fs.readdir("./玩偶姐姐", (err) => {
    if (err) {
      fs.mkdir("./玩偶姐姐", () => {});
    } else {
      fs.readFile(
        "E:/ffmpeg-6.1-full_build-shared/wojj.m3u",
        "utf-8",
        (err, data) => {
          if (err) {
            console.log("没有找到对应文件");
            return;
          }

          // 将 M3U 文件内容按行拆分为数组
          const mediaPaths = data
            .split("\n")
            .map((line) => line.trim()) // 去除每行的前后空格
            .filter((line) => line && !line.startsWith("#")); // 过滤掉空行和注释行

          // 构建 JSON 数据对象
          const jsonData = { media_files: mediaPaths };

          // 将 JSON 数据写入文件
          fs.writeFile(
            "./玩偶姐姐/wojj.json",
            JSON.stringify(jsonData, null, 2),
            "utf-8",
            (err) => {
              if (err) {
                console.error("Error writing JSON file:", err);
              } else {
                console.log("Conversion successful. JSON file created:");
              }
            }
          );
        }
      );
    }
  });
}
// add();

app.use(cors());
app.use(express.json())

app.use("/", sse);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
