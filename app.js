new Vue({
  el: '#app',
  data() {
    return {
      bottom: false,
      photos: []
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addPhoto()
      }
    }
  },
  created() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.addPhoto()
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    addPhoto() {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(data => data.json())
        .then(response => {
          let photo = response.message
          this.photos.push(photo)
          if (this.bottomVisible()) {
            this.addPhoto()
          }
        })
    }
  }
})