export const state = {
  users: []
}

export const getters = {
  getUsers (state) {
    return state.users
  }
}

export const mutations = {
  SET_USERS (state, payload) {
    for (let data of payload) {
      state.users.push(data)
    }
  }
}

export const actions = { 
}
