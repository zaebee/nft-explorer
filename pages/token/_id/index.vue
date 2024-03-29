<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">
      {{ contract.name }}
    </c-heading>
    <c-box mx="3rem" rounded="lg" border-width="1px">
      <c-box p="6">
        <c-box d="flex" align-items="baseline">
          <c-box
            color="gray.500"
            font-weight="semibold"
            letter-spacing="wide"
            font-size="xs"
            text-transform="uppercase"
          >
            #{{ contract.number }} &bull; NFT &bull; BSC
          </c-box>
        </c-box>
        <c-flex
          mt="1"
          font-weight="semibold"
          as="h4"
          line-height="tight"
          is-truncated
        >
          <c-avatar :src="contract.img" :alt="contract.number" />
          <c-box ml="3">
            <c-text size="md" font-weight="bold">
              {{ contract.name }}
            </c-text>
            <c-text as="span">
              <c-badge rounded="full" px="2" variant-color="green">
                {{ contract.symbol }}
              </c-badge>
              {{ contract.marketCap }}
              <c-text as="span" color="gray.600" font-size="sm">
                / Cap
              </c-text>
            </c-text>
          </c-box>
        </c-flex>
        <c-box d="flex" mt="2" align-items="center">
          <c-box as="span" mr="2" color="gray.600" font-size="sm">
            {{ contract.holders }} holders
          </c-box>
          <c-icon
            v-for="(_, i) in Array(5).fill('')"
            :key="i"
            name="star"
            :color="i < contract.rating ? 'green.500' : 'gray.300'"
          />
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-button :is-loading="loading == true ? true : false" color="gray.600" font-size="sm" @click="showTokens">
            Tokens
          </c-button>
          <c-button color="gray.600" font-size="sm" @click="showStats" ml="2">
            Stats
          </c-button>
        </c-box>
      </c-box>
    </c-box>

    <c-flex
      mt="1"
      :mx="['1', '1', '3rem']"
      font-weight="semibold"
      as="h4"
      line-height="tight"
      is-truncated
    >
      <c-box p="6">
        <Pagination @changePage="loadTokens" :pages="pagination.pages" />
      </c-box>
      <c-box :d="['none', 'none', 'flex']" align-items="center">
        <c-badge rounded="full" px="2" variant-color="green">
          {{ tokens.length * pagination.current }} / {{ pagination.total }}
        </c-badge>
      </c-box>
    </c-flex>

    <c-simple-grid min-child-width="330px" min-height="500px" spacing="1rem" :mx="['1', '1', '3rem']">
      <c-box px="6" pb="6">
        <Token :list="tokens" />
      </c-box>
    </c-simple-grid>

    <c-flex
      mt="1"
      mx="3rem"
      font-weight="semibold"
      as="h4"
      line-height="tight"
      is-truncated
    >
      <c-box p="6">
        <Pagination @changePage="loadTokens" :pages="pagination.pages" />
      </c-box>
      <c-box d="flex" mt="2" align-items="center">
        <c-text as="span">
          Show tokens:
          <c-badge rounded="full" px="2" variant-color="green">
            {{ tokens.length * pagination.current }} / {{ pagination.total }}
          </c-badge>
        </c-text>
      </c-box>
    </c-flex>

  </div>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex'

import {
  CAvatar,
  CBox,
  CBadge,
  CButton,
  CText,
  CFlex,
  CIcon,
  CSimpleGrid,
  CHeading
} from '@chakra-ui/vue'
import Pagination from '../../../components/Pagination'
import Token from '../../../components/Token'

export default {
  name: 'ContractDetail',
  components: {
    CBox,
    CAvatar,
    CBadge,
    CButton,
    CText,
    CFlex,
    CIcon,
    CHeading,
  CSimpleGrid,
    Pagination,
    Token
  },
  head () {
    return {
      title: `${this.contract.name} - NFT Explorer»`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.contract.name },
        { property: 'og:title', content: `${this.contract.name} - NFT Explorer` },
        { property: 'og:description', content: this.contract.name }
      ],
    }
  },
  async fetch ({ store, params, error }) {
    if (store.state.contracts.length == 0) {
      await store.dispatch('GET_CONTRACTS')
    }
    console.log('Token params', params)
    if (params && params.id) {
      await store.dispatch('CONTRACT_DETAIL', {_id: params.id})
    }

    if (!store.state.contract.id) {
      return error({ message: 'Contract not found', statusCode: 404 })
    }
  },
  data () {
    return {
      loading: false,
      showModal: false,
      pages: [],
    }
  },
  computed: {
    ...mapState([
      'contracts',
      'contract',
      'tokens',
      'pagination'
    ]),
    ...mapGetters([
      'getContractByID'
    ]),
  },
  methods: {
    loadTokens (page) {
      console.log(page)
      this.$store.dispatch('CONTRACT_DETAIL', {_id: this.contract.id, page: page})
    },
    showTokens () {
      console.log('tokens')
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    showStats () {
      console.log('stats')
    }
  }
}
</script>
