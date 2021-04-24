<template>
  <div class="container">
    <c-heading :mx="['1rem', '1rem', '3rem']" mt="8" mb="4">
      Token Shop {{contract_id}}
    </c-heading>
    <c-box :mx="['1rem', '1rem', '3rem']" rounded="lg" border-width="1px">
      <c-box p="6">
        <trend-widget :data="stats" />
      </c-box>
    </c-box>
    <c-box :mx="['1rem', '1rem', '3rem']">
      <c-box p="6">
        <SaleWidget
          v-if="bucket.key"
          v-for="bucket in transactions"
          :key="bucket.key"
          :volume="bucket.volume.value"
          :avgPrice="bucket.avgPrice.value"
          :sales="bucket.salesPerDay.buckets"
          :contract="contract"
          :name="bucket.key"/>
      </c-box>
    </c-box>
  </div>
</template>

<script lang="js">
import SaleWidget from  '../components/SaleWidget'
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
    SaleWidget,
    TrendWidget
  },
  data () {
    return {
      contract_id: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1',
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
  async fetch ({ store, params }) {
    if (store.state.contracts.length === 0) {
      await store.dispatch('GET_CONTRACTS')
    }
    console.log('Shop params', params)
    if (params && params.id) {
      await store.dispatch('CONTRACT_DETAIL', {_id: params.id})
      await store.dispatch('GET_TRANSACTIONS', {_id: params.id})
    } else {
    }
    await store.dispatch('CONTRACT_DETAIL', {_id: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1'})
    await store.dispatch('GET_TRANSACTIONS', {_id: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1'})
    await store.dispatch('GET_CONTRACTS_STATS')
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
      'contract',
      'contracts',
    ]),
    ...mapGetters([
      'getTransactionsByContractID'
    ]),
    transactions () {
      let trxs = this.getTransactionsByContractID(this.contract_id)
      if (trxs) {
        console.log(trxs)
        return trxs.byTokenName.buckets.slice(0, 15)
      }
      return []
    },
  },
  methods: {
  }
}
</script>
