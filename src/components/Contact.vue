<template lang="pug">
#contact.contact
  .container
    p.description {{ $t('contact-des') }}
    h2 {{ $t('contact-title') }}

    .skill
      .subtitle {{ $t('contact-skill-title') }}
      p {{ $t('contact-skills') }}
      p {{ $t('contact-learning') }}

    .info
      .subtitle {{ $t('contact-info-title') }}
      .info__email
        a(href='mailto:waterblue104@gmail.com') {{ $t('contact-email') }}

      .info__phone
        a(href='tel:0981896398') {{ $t('contact-phone') }}

    .social-bar
      a.fab(
        v-for="item in iconLinks"
        :href='item.link'
        target='_blank'
      )
        font-awesome-icon(:icon="['fab',`${item.icon}`]")

    .footer
      .container
        p.copyright {{ $t('footer-des') }}

</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      iconLinks: [
        {
          link: 'https://github.com/livoist',
          icon: 'github'
        },
        {
          link: 'https://www.instagram.com/waterblue104/',
          icon: 'instagram'
        },
        {
          link: 'https://medium.com/@waterblue104',
          icon: 'medium'
        },
        {
          link: 'https://www.linkedin.com/in/ben-lai-21906b109/',
          icon: 'linkedin'
        }
      ]
    }
  }
}
</script>
