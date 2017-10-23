import timeago from 'timeago.js'
import Vue from 'vue'

Vue.filter('timeago', str => {
  if (!str) return ''
  return timeago(null, 'zh_CN').format(new Date(str))
})

// get a string representing the date portion of the given Date
Vue.filter('formatDate', date => {
  return new Date(date).toLocaleDateString()
})
