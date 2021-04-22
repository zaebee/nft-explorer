<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">
      Token Shop
    </c-heading>
    <c-box mx="3rem" rounded="lg" border-width="1px">
      <c-box p="6">
        TODO
        <trend-widget :data="stats" />
      </c-box>
    </c-box>
  </div>
</template>

<script lang="js">
import TrendWidget from  '../components/TrendWidget'
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
    TrendWidget
  },
  data () {
    return {
      showModal: false,
      stats: [
        {value: 430114, day: "2021-04-15"},
        {value: 379677, day: "2021-04-16"},
        {value: 111365, day: "2021-04-17"},
        {value: 112823, day: "2021-04-18"},
        {value: 439136, day: "2021-04-19"},
        {value: 442581, day: "2021-04-20"},
        {value: 427611, day: "2021-04-21"}
      ]
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
