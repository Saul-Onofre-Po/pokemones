import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrayFavoritos: []
  },
  mutations: {
    validarFavoritos(state){
      if(localStorage.getItem('datos')){
          state.arrayFavoritos =  JSON.parse(localStorage.getItem("datos"));
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
