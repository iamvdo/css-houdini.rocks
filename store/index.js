import Vuex from 'vuex'

import state from './data.json'

const getters = {
  posts: state => {
    return state.posts.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
  },
  getPost: state => id => {
    return state.posts.filter(post => {
      return post.url === id
    })[0]
  },
  getTag: state => id => {
    return state.tags[id]
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters
  })
}

export default createStore
