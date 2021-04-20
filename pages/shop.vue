<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">
      Token Shop
    </c-heading>
    <c-box mx="3rem" rounded="lg" border-width="1px">
      <c-box p="6">
        TODO
      </c-box>
    </c-box>
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
    CHeading
  },
  data () {
    return {
      showModal: false
    }
  },
  async fetch ({ store, _params }) {
    await store.dispatch('GET_CONTRACTS')
  },
  head () {
    return {
      title: `Token Shop - NFT Explorer»`,
      meta: [
        { hid: 'description', name: 'description', content: 'Explore NFT Tokens' },
        { property: 'og:title', content: `Token Shop - NFT Explorer` },
        { property: 'og:description', content: 'Explore NFT Tokens' }
      ],
    }
  },
  computed: {
    ...mapState([
      'contracts',
      'tokens'
    ]),
    ...mapGetters([
      'filterTokenByType',
      'getContractByID'
    ])
  },
  methods: {
  }
}
</script>
