import { parse } from 'node-html-parser'
import Vuex from 'vuex'
import _ from 'lodash'

import {
  TOKENS, NFT_TOKEN_IDS, NFT_METADATA, SEARCH, SALES_AGGREGATION, OFFERS_AGGREGATION
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
  pagination: {pages: []},
  aggregations: {},
  transactions: {},
  offers: {},
}

const getters = {
  filterTokenByType: state => topic => state.tokens.filter(token => _.some(token.topics, { name: topic })),
  getContractByID: state => _id => _.find(state.contracts, {slug: _id}),
  getTotalCards: state => _.sumBy(state.aggregations.per_symbol.buckets, bucket => bucket.doc_count),
  getTopNames: state => _.map(state.aggregations.per_symbol.buckets, bucket => bucket.key),
  getTopContracts: state => {
    let buckets = state.aggregations.per_symbol.buckets
    let result = _.map(buckets, bucket => {
      let contract = _.find(state.contracts, {name: bucket.key})
      if (contract) {
        contract.cards_count = bucket.doc_count
      }
      return contract
    })
    return _.without(result, undefined)
  }
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
        if (img.attrs.src.startsWith('http')) {
          el.img = img.attrs.src
        } else {
          el.img = `https://bscscan.com${img.attrs.src}`
        }
      } else {
        el.img = `https://bit.ly/broken-link`
      }
      return el
    })
    commit('SET_CONTRACTS', data)
  },
  async CONTRACT_DETAIL ({commit, state}, payload) {
    console.log(`payload ${payload}`)
    let contract =  _.find(state.contracts, {id: payload._id})
    commit('SET_CONTRACT', contract)
    let url = `${payload._id}/${SEARCH}`
    let data = {
      'query': {'match_phrase_prefix': {'nft_data.token_url': 'http'}},
      'size': 20,
      'from': payload.page * 20 || 0,
    }
    await this.$axios.post(url, data).then(
      response => {
        console.log(`Loaded ${response.data.hits.total} tokens for contract[${payload._id}] page:${payload.page}`)
        commit('SET_TOKENS', response.data.hits)
        commit('SET_CURRENT_PAGE', payload)
      },
      error => {
        console.error(`Error get contract detail: ${error}`)
        this.$sentry && this.$sentry.captureException(error)
      }
    )
  },
  async GET_CONTRACTS_STATS ({commit, state}) {
    let url = `index-*${SEARCH}`
    let data = {
      'query': {'match_phrase_prefix': {'nft_data.token_url': 'http'}},
      'aggs': {'per_symbol': {'terms': {'field': 'contract_name.keyword'}}},
      'size': 20,
    }
    await this.$axios.post(url, data).then(
      response => {
        commit('SET_STATS', response.data.aggregations)
      },
      error => {
        console.error(`Error get contract stats: ${error}`)
        this.$sentry && this.$sentry.captureException(error)
      }
    )
  },
  async GET_TRANSACTIONS({commit, state}, payload) {
    let url = `sales-${payload._id}${SEARCH}`
    await this.$axios.post(url, SALES_AGGREGATION).then(
      response => {
        commit('SET_TRANSACTIONS', response.data)
      },
      error => {
        console.error(`Error get transactions stats: ${error}`)
        this.$sentry && this.$sentry.captureException(error)
      }
    )
  },
  async GET_OFFERS({commit, state}, payload) {
    let name = payload.name
    let url = `sales-*${SEARCH}`
    let data = {'query': {
      'bool': {
        'filter': [{'match_phrase': {'token_name': payload.name}},
        {'match': {'logs.action': 'eveNewSales'}}]}},
        'sort': [{'logs.startTime': {'order': 'desc'}}],
        'size': 3}
    await this.$axios.post(url, data).then(
      response => {

        payload[name] = response.data.hits
        commit('SET_OFFERS', payload)
      },
      error => {
        console.error(`Error get transactions stats: ${error}`)
        this.$sentry && this.$sentry.captureException(error)
      }
    )
  },
  SET_TOKEN ({commit, state}, payload) {
    console.log(payload)
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
    let pages = _.range(Math.ceil(payload.total / tokens.length))
    Object.assign(state.pagination, {
      pages: pages.slice(0, 15),
      total: payload.total,
    })
    state.tokens = tokens
  },
  SET_STATS (state, payload) {
    console.log('Set contract stats:', payload)
    Object.assign(state.aggregations, payload)
  },
  SET_TRANSACTIONS (state, payload) {
    Object.assign(state.transactions, payload.aggregations)
    //Object.assign(state.transactions.hits, payload.hits)
  },
  SET_OFFERS (state, payload) {
    Object.assign(state.offers, payload)
  },
  SET_CURRENT_PAGE (state, payload) {
    Object.assign(state.pagination, {current: payload.page || 0})
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
