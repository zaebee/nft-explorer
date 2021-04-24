<template>
  <div class="container">
    <c-heading :mx="['1rem', '1rem', '3rem']" mt="8" mb="4">
      Token Ranking
    </c-heading>
    <c-box :mx="['1rem', '1rem', '3rem']" rounded="lg" border-width="1px" />
  </div>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex'

import {
  CBox,
  CHeading
} from '@chakra-ui/vue'

export default {
  name: 'Shop',
  components: {
    CBox,
    CHeading,
  },
  data () {
    return {
    }
  },
  async fetch ({ store, _params }) {
    if (store.state.contracts.length === 0) {
      await store.dispatch('GET_CONTRACTS')
    }
  },
  head () {
    return {
      title: `Token Ranking - NFT Explorer»`,
      meta: [
        { hid: 'description', name: 'description', content: 'Explore NFT Tokens' },
        { property: 'og:title', content: `Token Shop - NFT Explorer` },
        { property: 'og:description', content: 'Explore NFT Tokens' }
      ],
    }
  },
  computed: {
    ...mapState([
      'contract',
      'contracts',
    ]),
    ...mapGetters([
      'getTransactionsByContractID'
    ]),
  },
  methods: {
  }
}
</script>
