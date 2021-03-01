<template lang="pug">
#portfolio.work
  .container
    .u-text-center
      h2 PORTFOLIO

    .work-list
      .work-item(v-for="item in list")
        .work-inner.mb-70
          .u-col-1-2
            .imgbox
              .imgbox__inner
                .image.bg-img(:style="{ backgroundImage: `url(${item.img})` }")

            .work-item-content(ref="container")
              h3.work-item-title(ref="title") {{ item.title }}
              a.text-btn(ref="link" :href="item.link" target="_blank") 
                span
                p View Portfolio

</template>

<script>
import Uncover from '@/uncover/Uncover.js'
import {
  uncoverOpts,
  uncoverAnimation
} from '@/uncover/Mycover.js'

export default {
  name: 'PortfolioList',
  data() {
    return {
      list: [
        {
          title: '# NORDIC',
          content: 'E-commerce website developed by Vue.js, Bootaprap, Jquery, features include shopping cart,form (form verification), and back-end database.',
          link: 'https://livoist.github.io/Nordic/dist/index.html#/HomePage',
          img: require('@img/nordic.png')
        },
        {
          title: '# THEATER',
          content: 'Small cinema developed with Vue.js and TweenMax, features include shopping cart, my favorite. Lorem Ipsum',
          link: 'https://livoist.github.io/Theater/Movie.html',
          img: require('@img/theater.png')
        },
        {
          title: '# PARTICLE',
          content: 'Particle generators developed using Canvas, Gui, TweenMax',
          link: 'https://livoist.github.io/Particle/Particle.html',
          img: require('@img/particle.png')

        },
        {
          title: '# WINE',
          content: 'Image concept website developed with rellax.js and fullPage.js with red wine as the theme',
          link: 'https://livoist.github.io/Wine/index.html',
          img: require('@img/wine6.png')
        }
      ]
    }
  },
  methods: {
    uncoverImage() {
      const items = Array.from(document.querySelectorAll('.u-col-1-2 > .imgbox'))
      let uncoverArr = []

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if ( entry.intersectionRatio > 0.5 ) {
            uncoverArr[items.indexOf(entry.target)].show(true, uncoverAnimation[items.indexOf(entry.target)].show)
          } 
          // else {
          //   uncoverArr[items.indexOf(entry.target)].hide(true, uncoverAnimation[items.indexOf(entry.target)].hide)
          // }
        })
      }, { threshold: 0.5 })
      items.forEach((item, pos) => {
        uncoverArr.push(new Uncover(item.querySelector('.image'),uncoverOpts[pos]))
        observer.observe(item)
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.uncoverImage()
    }, 3100)
  }
}
</script>