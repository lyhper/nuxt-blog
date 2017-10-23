<template>
  <div id='app'>
    <header class="header">
      <nuxt-link to="/">{{ title }}</nuxt-link>
      <div style="clear: both"></div>
      <input class="search-bar" placeholder="Search.."
        ref="searchBar" v-model="keyword"
        @click="selectSearchText"
        @keyup.esc="resetSearch">
    </header>
    <nuxt/>
    <footer class="footer">
      copyright © {{ (new Date()).getFullYear() }} lyhper |
      powered by <a href="https://github.com/lyhper/nuxt-blog" target="_blank">nuxt-blog</a>
    </footer>
  </div>
</template>

<script>
  import conf from '../config.json'
  import { debounce } from '../utils/index'

  export default {
    data () {
      return {
        title: conf.blogTitle,
        keyword: ''
      }
    },
    methods: {
      resetSearch () {
        this.keyword = ''
        this.$refs.searchBar.blur()
      },
      selectSearchText () {
        this.$refs.searchBar.select()
      }
    },
    watch: {
      'keyword': debounce(function () {
        if (this.keyword) {
          this.$router.push({name: 'index', query: { keyword: this.keyword }})
        } else {
          this.$router.push({name: 'index'})
        }
      }, 500)
    }
  }
</script>
