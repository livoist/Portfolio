<template lang="pug">
#contact.contact
  .container
    p.description Hi I&apos;m Ben I&apos;m a Frontend Developer
    h2 CONTACT

    .skill
      .subtitle SKILLS
      p
        | JavaScript / Vue.js(Vuex) / HTML5(pug) / CSS3(SCSS/SASS) / RWD / Git Flow / Canvas / SVG / GSAP(TweenMax) / Bootstrap /
        | JQuery
        br
        br
        | Learning ( PIXI.js &#x3001; Three.js &#x3001; UX/UI concept &#x3001; WebGL )

    .info
      .subtitle CONTACT
      .info__email
        a(href='mailto:waterblue104@gmail.com') Email : waterblue104@gmail.com

      .info__phone
        a(href='tel:0981896398') Phone : 0981896398

    .social-bar
      a.fab(
        v-for="item in iconLinks"
        :href='item.link'
        target='_blank'
      )
        font-awesome-icon(:icon="['fab',`${item.icon}`]")

    .footer
      .container
        p.copyright Copyright @ 2021 Ben All right reserved

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
        }
      ]
    }
  }
}
</script>
