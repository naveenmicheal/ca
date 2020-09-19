export const state = () => ({
  counter: 15
})

export const mutations = {
  increase(state,number){
    state.counter += number
  },
}

export const getters = {
  data: state =>{
    return state.counter
  }
}