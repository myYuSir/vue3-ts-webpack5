<template>
  <div>欢迎</div>
  <input type="text" v-model="text" />
  <button @click="handleClick">测试请求</button>
  <div v-for="(value, key) in list" :key="key">{{ key + ":" + value }}</div>
  <ul ref="ul"></ul>
</template>

<script setup lang="ts">
defineOptions({
  name: "About",
});

import axios from "axios";
import { ref, onBeforeUnmount, Ref } from "vue";
const text: Ref<string> = ref("");
const list: Ref<Array<number>> = ref([]);
const url = "http://localhost:3000/sse";
const evtSource = new EventSource(url);

evtSource.onopen = function () {
  console.log("连接已启动");
};

evtSource.onerror = function () {
  console.log("连接错误");
};
const ul = ref(null);

evtSource.onmessage = (e) => {
  const newElement = document.createElement("li");

  newElement.textContent = `message: ${e.data}`;
  ul.value.appendChild(newElement);
};

const handleClick = () => {
  axios
    .post("http://localhost:3000/getMessage", {
      message: text.value,
    })
    .then((res) => {
      list.value = res.data;
    });
};

onBeforeUnmount(() => {
  evtSource.close();
});
</script>

<style lang="scss" scoped></style>
