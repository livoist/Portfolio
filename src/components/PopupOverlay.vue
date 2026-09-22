<script setup lang="ts">
const headerLinks: { title: string }[] = []
</script>

<template>
  <div class="nav u-z-index_7">
    <div id="popup-overlay" class="popup-menu">
      <a class="popup-menu__close u-z-index_7" href="#!">
        <span></span>
        <span></span>
      </a>

      <div class="bar-container bg-black u-px-30">
        <ul class="u-pt-100">
          <li v-for="item in headerLinks" :key="item.title">
            <a class="popup-menu__item" :href="`#${item.title}`">{{ item.title.toUpperCase() }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav {
  visibility: hidden;
  opacity: 0;
  display: none;
}
@media only screen and (max-width: 768px) {
  .nav {
    visibility: visible;
    opacity: 1;
    display: block;
  }
}

.navbar .navbar__social-bar {
  padding: 24px;
  display: inline-block;
}

.navbar .menu-toggle {
  width: 50px;
  height: 50px;
  display: block;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.navbar .menu-toggle:hover span::before {
  transform-origin: center left;
  transform: scaleX(0);
}
.navbar .menu-toggle:hover span::after {
  transform-origin: center right;
  transform: scaleX(0);
}
.navbar .menu-toggle span {
  width: 32px;
  height: 2px;
  display: block;
  background-color: #000;
  margin-bottom: 8px;
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.navbar .menu-toggle span::before,
.navbar .menu-toggle span::after {
  content: '';
  position: absolute;
  width: 32px;
  height: 2px;
  background-color: #000;
  left: 0;
  right: 0;
  transition: transform 0.5s ease;
  transform: scaleX(1);
}
.navbar .menu-toggle span::before {
  top: -10px;
  transform-origin: center right;
}
.navbar .menu-toggle span::after {
  bottom: -10px;
  transform-origin: center left;
}

.navbar .popup-menu {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  background-color: white;
  transition: all 0.6s;
  display: flex;
}

.bar-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
}
.bar-container ul {
  width: 70vw;
  margin: 0 auto;
}

.navbar .popup-menu__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
}
.navbar .popup-menu__close span {
  width: 32px;
  height: 2px;
  background-color: black;
  position: absolute;
  top: 50%;
  right: 50%;
}
.navbar .popup-menu__close span:nth-child(1) {
  transform: translate(50%, 50%) rotate(-45deg);
}
.navbar .popup-menu__close span:nth-child(2) {
  transform: translate(50%, 50%) rotate(45deg);
}

.navbar .popup-menu .popup-menu__item {
  display: block;
  text-align: center;
  position: relative;
  font-size: 20px;
  font-weight: 900;
  color: rgb(82, 82, 82);
  line-height: 80px;
  opacity: 0;
  transition: color 0.5s, transform 1s 0.5s;
}
.navbar .popup-menu .popup-menu__item::before {
  width: 5px;
  height: 5px;
  content: '';
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: 50%;
  left: 13vw;
  opacity: 0;
  transition: 0.5s;
  transform: translateY(-50%);
}
.navbar .popup-menu .popup-menu__item:hover {
  color: #fede43;
}
.navbar .popup-menu .popup-menu__item:hover::before {
  opacity: 1;
}

.bg-black {
  background-color: rgb(247, 247, 247);
}

.navbar #popup-overlay:target {
  visibility: visible;
  opacity: 1;
  transform: translateY(0%);
}
.navbar #popup-overlay:target .popup-menu__item {
  opacity: 0.85;
}
</style>
