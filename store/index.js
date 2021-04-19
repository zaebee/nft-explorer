import { parse } from 'node-html-parser'
import Vuex from 'vuex'
import _ from 'lodash'

import {
  TOKENS, NFT_TOKEN_IDS, NFT_METADATA, SEARCH
} from './mutation-types'

import auth from './modules/auth'

const environment = process.env.NODE_ENV

const state = {
  environment: environment,
  errors: {},
  user: {},
  contracts: [],
  contract: {},
  tokens: [],
  tokens_metadata: [],
  pagination: {},
  request_is_synced: false,
}

const getters = {
  filterTokenByType: state => topic => state.tokens.filter(token => _.some(token.topics, { name: topic })),
  getContractByID: state => _id => _.find(state.contracts, {slug: _id}),
}

const actions = {
  async GET_CONTRACTS ({commit, state}) {
    const content = await this.$content('contracts').fetch()
    let data = _.map(content.d.data, el => {
      let root = parse(el.tokenName)
      let link = root.querySelector('a')
      if (link && link.attrs.href) {
        el.contractUrl = link.attrs.href
        el.id = el.contractUrl.replace('/token/', '')
      }
      if (link && link.text) {
        let result = link.text.split('(')
        if (result.length == 2) {
          el.name = result[0].trim()
          el.symbol = result[1].replace(')', '')
        }
      }
      let img = root.querySelector('img')
      if (img && img.attrs.src) {
        el.img = `https://bscscan.com${img.attrs.src}`
      } else {
        el.img = `https://bit.ly/broken-link`
      }
      return el
    })
    commit('SET_CONTRACTS', data)
  },
  async CONTRACT_DETAIL ({commit, state}, _id) {
    let contract =  _.find(state.contracts, {id: _id})
    commit('SET_CONTRACT', contract)
    let url = `${_id}/${SEARCH}`
    let data = { 'query': { 'match': { 'nft_data.token_balance': '1' } } }
    await this.$axios.post(url, data).then(
      response => {
        console.log('Loaded tokens for contract', response.data.hits.total)
        commit('SET_TOKENS', response.data.hits)
      },
      error => {
        console.error(error)
        this.$sentry && this.$sentry.captureException(error)
      }
    )
  },
  async GET_TOKENS_METADATA ({commit, state}) {
    let baseUrl = `56${TOKENS}/${state.contract.id}${NFT_METADATA}`
    let tokens = state.tokens.slice(0, 9)
    for (let index = 0; index < tokens.length; index++) {
      let url = `${baseUrl}/${tokens[index].token_id}/`
      const { data } = await this.$axios.get(url)
      if (data.error == false) {
        commit('SET_TOKENS_METADATA', data.data.items)
      }
    }
  },
  SET_USER ({commit, state}, payload) {
    commit('SET_USER', payload)
  },
}

const mutations = {
  SET_CONTRACTS (state, payload) {
    state.contracts = payload
  },
  SET_CONTRACT (state, payload) {
    state.tokens = []
    Object.assign(state.contract, payload)
  },
  SET_TOKENS (state, payload) {
    let tokens = _.map(payload.hits, hit => hit._source)
    console.log('Set contract tokens:', state.contract.id, payload.total)
    state.pagination = { total: payload.total }
    state.tokens = tokens
  },
  SET_TOKENS_METADATA (state, payload) {
    let current_metadata = state.tokens_metadata
    let metadata = _.flatten(_.map(payload, el => el.nft_data))
    console.log('Set tokens metadata:', metadata)
    state.tokens_metadata = current_metadata.concat(metadata)
  },
  SET_USER (state, payload) {
    Object.assign(state.user, payload)
  },
}

const store = () => new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations,
  modules: {
    auth
  }
})

export default store
