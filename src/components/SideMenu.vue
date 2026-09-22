<script setup lang="ts">
const sideLists = [{ title: 'Home' }, { title: 'Portfolio' }, { title: 'Contact' }]
</script>

<template>
  <div class="sideMenu">
    <ul>
      <li v-for="item in sideLists" :key="item.title" :class="item.title.toLowerCase()">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<style>
.sideMenu {
  position: fixed;
  z-index: 100;
  right: 0;
  top: 0;
  height: 100vh;
  width: 126px;
  background: #efecea;
}
.sideMenu ul {
  padding: 0 20px;
  position: absolute;
  right: 0;
  top: 33%;
}
.sideMenu ul li {
  padding: 20px 0;
  letter-spacing: 5px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 70px;
  font-size: 12px;
  transition: 0.3s;
  transform: rotate(90deg);
}
.sideMenu ul li:hover {
  color: orange;
}
</style>
