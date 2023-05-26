export const state = {
  withdrawals: []
}

export const getters = {
  getWithdrawals (state) {
    return state.withdrawals
  }
}

export const mutations = {
  SET_WITHDRAWALS (state, payload) {
    state.withdrawals = payload
  }
}

export const actions = { 
}
