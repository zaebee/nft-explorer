<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">
      The most popular NFT projects on the Binance Chain.
    </c-heading>
    <c-box mx="3rem">
      <Contract :list="contracts" />
    </c-box>
  </div>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex'

import {
  CBox,
  CHeading
} from '@chakra-ui/vue'

import Contract from '../components/Contract'

export default {
  name: 'Index',
  components: {
    CBox,
    CHeading,
    Contract
  },
  data () {
    return {
      showModal: false
    }
  },
  async fetch ({ store, _params }) {
    await store.dispatch('GET_CONTRACTS')
    await store.dispatch('GET_CONTRACTS_STATS')
  },
  computed: {
    ...mapState([
      'aggregations',
      'contracts',
      'tokens'
    ]),
    ...mapGetters([
      'filterTokenByType',
      'getContractByID'
    ])
  },
  methods: {
    showToast () {
      this.$toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 10000,
        isClosable: true
      })
    }
  }
}
</script>
