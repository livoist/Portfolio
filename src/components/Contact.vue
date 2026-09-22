<script setup lang="ts">
const iconLinks = [
  { link: 'https://medium.com/@waterblue104', icon: 'medium' },
  { link: 'https://github.com/livoist', icon: 'github' },
  { link: 'https://www.linkedin.com/in/ben-lai-21906b109/', icon: 'linkedin' },
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
        <a v-for="item in iconLinks" :key="item.icon" class="fab" :href="item.link" target="_blank">
          <font-awesome-icon :icon="['fab', item.icon]" />
        </a>
      </div>

      <div class="footer">
        <div class="container">
          <p class="copyright">{{ $t('footer-des') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
