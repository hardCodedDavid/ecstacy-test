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
    for (let data of payload) {
      state.transfers.push(data)
    }
  }
}

export const actions = { 
}
