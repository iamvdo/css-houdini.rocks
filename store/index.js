import Vuex from 'vuex'

import state from './data.json'

const getters = {
  posts: state => {
    return state.categories.reduce((a, b) => {
      b = b.posts.map(post => {
        post.category = b.category
        post.modules = post.modules || post.tags
        return post
      })
      return a.concat(b)
    }, [])
  },
  getPost: (state, getters) => id => {
    return getters.posts.filter(post => {
      return post.url === id
    })[0]
  },
  getPrevPost: (state, getters) => url => {
    for (var i = 0; i < getters.posts.length; i++) {
      if (getters.posts[i].url === url && getters.posts[i - 1]) {
        return getters.posts[i - 1]
      }
    }
  },
  getNextPost: (state, getters) => url => {
    for (var i = 0; i < getters.posts.length; i++) {
      if (getters.posts[i].url === url && getters.posts[i + 1]) {
        return getters.posts[i + 1]
      }
    }
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
  },
  featured: state => {
    return state.featured
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters
  })
}

export default createStore
