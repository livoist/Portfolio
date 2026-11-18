<script setup lang="ts">
// Brand icons as plain .svg files under src/assets/icons/, imported with Vite's `?raw`
// suffix: the file content is inlined into the JS bundle as a string at build time and
// rendered via v-html below. Unlike <img src="...svg">, inline SVG inherits CSS
// `color` (fill="currentColor"), so the hover color in contact.css keeps working, and
// no extra network request is made. v-html is safe here: the markup is our own static
// file, fixed at build time — never user input.
import githubSvg from '@/assets/icons/github.svg?raw'
import linkedinSvg from '@/assets/icons/linkedin.svg?raw'
import mediumSvg from '@/assets/icons/medium.svg?raw'

const iconLinks = [
  { name: 'Medium', link: 'https://medium.com/@waterblue104', svg: mediumSvg },
  { name: 'GitHub', link: 'https://github.com/livoist', svg: githubSvg },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/ben-lai-21906b109/', svg: linkedinSvg },
]
</script>

<template>
  <div id="contact" class="contact">
    <div class="container">
      <p class="description">{{ $t('contact-des') }}</p>
      <h2>{{ $t('contact-title') }}</h2>

      <div class="skill">
        <div class="subtitle">{{ $t('contact-skill-title') }}</div>
        <p>{{ $t('contact-skills') }}</p>
        <p>{{ $t('contact-learning') }}</p>
      </div>

      <div class="info">
        <div class="subtitle">{{ $t('contact-info-title') }}</div>
        <div class="info__email">
          <a href="mailto:waterblue104@gmail.com">{{ $t('contact-email') }}</a>
        </div>

        <div class="info__phone">
          <a href="tel:0981896398">{{ $t('contact-phone') }}</a>
        </div>
      </div>

      <div class="social-bar">
        <!-- `social-link` is also checked by mouseEvent.ts to bump the custom cursor's
             z-index when hovering these links — keep the two in sync if renaming. -->
        <a
          v-for="item in iconLinks"
          :key="item.name"
          class="social-link"
          :href="item.link"
          target="_blank"
          :aria-label="item.name"
          v-html="item.svg"
        ></a>
      </div>

      <div class="footer">
        <div class="container">
          <p class="copyright">{{ $t('footer-des') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
