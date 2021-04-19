<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">
      The most popular NFT projects on the Binance Chain.
    </c-heading>
    <c-box mx="3rem">
      TODO
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
  name: 'Index',
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
