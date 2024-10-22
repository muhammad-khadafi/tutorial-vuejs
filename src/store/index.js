import { createStore } from 'vuex'

const store = createStore({
  state: {
    selectedBook: null
  },
  mutations: {
    SET_SELECTED_BOOK(state, book) {
      state.selectedBook = book
    },
    CLEAR_SELECTED_BOOK(state) {
      state.selectedBook = null
    }
  },
  actions: {
    setSelectedBook({ commit }, book) {
      commit('SET_SELECTED_BOOK', book)
    },
    clearSelectedBook({ commit }) {
      commit('CLEAR_SELECTED_BOOK')
    }
  },
  getters: {
    selectedBook: state => state.selectedBook
  }
})

export default store
