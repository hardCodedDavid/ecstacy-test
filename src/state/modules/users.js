export const state = {
  users: [],
  verifiedUsers: [],
  unverifiedUsers: []
}

export const getters = {
  getUsers (state) {
    return state.users
  },
  getVerifiedUsers (state) {
    return state.verifiedUsers
  },
  getUnverifiedUsers (state) {
    return state.unverifiedUsers
  }
}

export const mutations = {
  SET_USERS (state, payload) {
    for (let data of payload) {
      state.users.push(data)
    }
  },
  SET_VERIFIED_USERS (state, payload) {
    for (let data of payload) {
      state.verifiedUsers.push(data)
    }
  },
  SET_UNVERIFIED_USERS (state, payload) {
    for (let data of payload) {
      state.unverifiedUsers.push(data)
    }
  },
}

export const actions = { 
}
