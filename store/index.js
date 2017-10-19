import Vuex from 'vuex'

import state from './data.json'

const getters = {
  posts: state => {
    return state.categories.reduce((a, b) => {
      b = b.posts.map(post => {
        post.category = b.category
        return post
      })
      if (a.posts) {
        a = a.posts.map(post => {
          post.category = a.category
          return post
        })
      }
      return a.concat(b)
    })
  },
  getPost: (state, getters) => id => {
    return getters.posts.filter(post => {
      return post.url === id
    })[0]
  },
  getTag: state => id => {
    return state.tags[id]
  },
  getAbbrTag: state => id => {
    if (id === 'props&val') {
      id = 'C+'
    } else {
      id = id.charAt(0).toUpperCase()
    }
    return id
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters
  })
}

export default createStore
