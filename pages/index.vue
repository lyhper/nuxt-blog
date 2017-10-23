<template>
  <section class="list-view">
    <ol v-if="filteredList.length" class="list">
      <li v-for="{ title, sha, date } in filteredList" :key="sha" class="list-item">
        <nuxt-link :to="'/post/' + sha" class="item-title">
          {{ title }}
        </nuxt-link>
        <br>
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
    <div v-else>暂无数据...</div>
  </section>
</template>

<script>
  import api from '../api'

  export default {
    name: 'listView',

    data () {
      return {
        lists: null
      }
    },

    computed: {
      filteredList () {
        let keyword = (this.$route.query.keyword || '').toLowerCase()
        // Filter by title, Order by publish date, desc
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    asyncData () {
      return api.getList()
        .then(lists => {
          return { lists }
        })
        .catch(err => { console.error(err) })
    }

  }
</script>
