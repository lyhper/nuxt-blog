<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="this.date | formatDate" :title="this.date | formatDate" class="post-date">{{ this.date | timeago }}</time>
    </h1>
    <article v-if="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
  import api from '../../api'
  import fm from 'front-matter'
  import marked from '../../utils/render.js'

  export default {
    name: 'postView',

    data () {
      return {
        title: '',
        date: null,
        content: ''
      }
    },

    computed: {
      htmlFromMarkdown () {
        return marked(this.content)
      }
    },

    methods: {
      newTab () {
        this.$nextTick(function () {
          // Load the external link into new tab
          const linksArray = Array.from(document.querySelectorAll('a'))
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
              el.rel = 'noopener noreferrer'
            }
          })
        })
      }
    },

    asyncData ({ params }) {
      return api.getDetail(params.hash)
        .then(text => {
          // Parse front-matter
          // https://github.com/jxson/front-matter#fmstring
          const content = fm(text)
          return {
            content: content.body,
            title: content.attributes.title,
            date: content.attributes.date
          }
        })
        .catch(err => { console.error(err) })
    },

    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>
