import axios from 'axios'
import 'es6-promise/auto'

import conf from '../config.json'
import { onlyTitle, onlyDate } from '../utils'

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  let url = `https://api.github.com/repos/${conf.repo}/contents/`
  if (conf.path) url += conf.path
  if (conf.branch) url += `?ref=${conf.branch}`
  return url
}

/**
 * Format GitHub Api url for file content
 * @param {string} hash
 * @returns {string}
 */
function getPostUrl (hash) {
  // @see https://developer.github.com/v3/git/blobs/#get-a-blob
  return `https://api.github.com/repos/${conf.repo}/git/blobs/${hash}`
}

export default {

  getList () {
    return axios.get(getListUrl())
      .then(res => res.data)
      .then(arr => {
        // Data cleaning
        const list = arr.map(({name, sha, size}) => ({
          title: onlyTitle(name),
          date: onlyDate(name),
          sha,
          size
        }))
        // ..then return
        return list
      })
  },

  getDetail (hash) {
    const httpOpts = {
      // https://developer.github.com/v3/media/#raw-1
      headers: { Accept: 'application/vnd.github.v3.raw' }
    }

    return axios.get(getPostUrl(hash), httpOpts)
      .then(res => res.data)
      .then(content => {
        // ..then return
        return content
      })
  }
}
