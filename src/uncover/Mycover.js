import anime from 'animejs/lib/anime.min.js'

export const uncoverOpts = [
  {
  // total number of slices. 切割的數目
  slicesTotal: 1,
  // slices color. 切割圖塊顏色
  slicesColor: '#efecea',
  // 'vertical' || 'horizontal'. 垂直方向 / 平行方向
  orientation: 'vertical',
  alpha: 0.5,
  // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
  // 從左邊開始右邊結束
  slicesOrigin: { show: 'right', hide: 'right' }
  },
  {
    slicesTotal: 1, 
    slicesColor: '#efecea', 
    orientation: 'vertical', 
    slicesOrigin: { show: 'right', hide: 'right' }
  },
  {
    slicesTotal: 1,
    slicesColor: '#efecea',
    orientation: 'vertical',
    slicesOrigin: { show: 'right', hide: 'right' }
  },
  {
    slicesTotal: 1,
    slicesColor: '#efecea',
    orientation: 'vertical',
    slicesOrigin: { show: 'right', hide: 'right' }
  }
]
 // anime.js的細項設定，持續時間 / 延遲時間(Math.random()) / 速度曲線
export const uncoverAnimation = [
  {
    show: {
      slices: { duration: 1000, easing: 'easeInOutCirc', delay: (_,i) => i * 40 },
      image: {
          duration: 800,
          delay: 350,
          easing: 'easeOutCubic',
          scale: [1,0.95]
      }
      //圖片的變化方式，持續時間 / 延遲時間 / 速度曲線 / 縮方比例[from,to]
    },
      // hide: {
      //   slices: { duration: 1000, easing: 'easeInOutCirc', delay: (_,i) => i * 40 }
      // }
  },
  {
      show: {
        slices: { duration: 1000, easing: 'easeInOutCirc', delay: (_,i,t) => (t-i-1)*100 },
        image: {
          duration: 800,
          delay: 350,
          easing: 'easeOutCubic',
          scale: [1,0.95]
        }
      },
      // hide: {
      //   slices: { duration: 600, delay: (_,i,t) => (t-i-1)*100, easing: 'easeInOutCirc' }
      // }
  },
  {
      show: {
        slices: { duration: 1000, easing: 'easeInOutCirc', delay: (_,i,t) => Math.abs(t/2-i)*80 },
        image: {
          duration: 800,
          delay: 350,
          easing: 'easeOutCubic',
          scale: [1,0.95]
      }
      },
      // hide: {
      //   slices: { duration: 300, delay: (_,i,t) => Math.abs(t/2-i)*40, easing: 'easeInOutCirc' }
      // }
  },
  {
      show: {
        slices: { duration: 1000, easing: 'easeInOutCirc', delay: (_,i,t) => anime.random(0,t)*50 },
        image: {
          duration: 800,
          delay: 350,
          easing: 'easeOutCubic',
          scale: [1,0.95]
      }
      },
      // hide: {
      //   slices: { duration: 300, delay: (_,i,t) => anime.random(0,t)*50 }
      // }
  }
]