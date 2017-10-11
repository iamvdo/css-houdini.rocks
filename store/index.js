import Vuex from 'vuex'

import state from './data.json'

const getters = {
  getPost: state => id => {
    return state.posts.filter(post => {
      return post.url === id
    })[0]
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    getters
  })
}

export default createStore
