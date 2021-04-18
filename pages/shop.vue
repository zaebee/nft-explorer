<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">The most popular NFT projects on the Binance Chain.</c-heading>
    <c-box mx="3rem">
      TODO
    </c-box>
  </div>
</template>

<script lang="js">
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import {
    CBox,
    CHeading
  } from '@chakra-ui/vue'

  export default {
    name: 'Index',
    async fetch ({store, params}) {
      await store.dispatch('GET_CONTRACTS')
    },
    components: {
      CBox,
      CHeading,
    },
    data () {
      return {
        showModal: false,
      }
    },
    computed: {
      ...mapState([
        'contracts',
        'tokens',
      ]),
      ...mapGetters([
        'filterTokenByType',
        'getContractByID',
      ]),
    },
    methods: {
    }
  }
</script>
