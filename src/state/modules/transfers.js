export const state = {
  transfers: []
}

export const getters = {
  getTransfers (state) {
    return state.transfers
  }
}

export const mutations = {
  SET_TRANSFERS (state, payload) {
    state.transfers = payload
  }
}

export const actions = { 
}
