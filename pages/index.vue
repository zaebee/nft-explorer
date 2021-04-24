<template>
  <div class="container">
    <c-heading :mx="['1rem', '1rem', '3rem']" mt="8" mb="4">
      The most popular NFT projects on the Binance Chain.
    </c-heading>
    <c-box :mx="['1rem', '1rem', '3rem']">
      <Contract :list="getTopContracts" />
    </c-box>
    <c-heading :mx="['1rem', '1rem', '3rem']" mt="8" mb="4">
      The most traded NFT from {{first.name}}
    </c-heading>
    <c-box :mx="['1rem', '1rem', '3rem']">
      <SaleWidget
        v-if="bucket.key"
        :contract="first"
        v-for="bucket in getTransactionsByContractID(first.id).byTokenName.buckets.slice(0, 3)"
        :key="bucket.key"
        :volume="bucket.volume.value"
        :avgPrice="bucket.avgPrice.value"
        :sales="bucket.salesPerDay.buckets"
        :name="bucket.key"/>
    </c-box>
    <c-heading :mx="['1rem', '1rem', '3rem']" mt="8" mb="4">
      The most traded NFT from {{second.name}}
    </c-heading>
    <c-box :mx="['1rem', '1rem', '3rem']">
      <SaleWidget
        v-if="bucket.key"
        :contract="second"
        v-for="bucket in getTransactionsByContractID(second.id).byTokenName.buckets.slice(0, 3)"
        :key="bucket.key"
        :volume="bucket.volume.value"
        :avgPrice="bucket.avgPrice.value"
        :sales="bucket.salesPerDay.buckets"
        :name="bucket.key"/>
    </c-box>
  </div>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex'
import SaleWidget from  '../components/SaleWidget'

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
    Contract,
    SaleWidget
  },
  data () {
    return {
      showModal: false
    }
  },
  async fetch ({ store, _params }) {
    await store.dispatch('GET_CONTRACTS')
    await store.dispatch('GET_CONTRACTS_STATS')
    await store.dispatch('GET_TRANSACTIONS', {_id: '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1'})
    await store.dispatch('GET_TRANSACTIONS', {_id: '0x828e90cef49b3baea41590ebf7f274d49f845dbb'})
  },
  computed: {
    ...mapState([
      'aggregations',
      'contracts',
      'tokens'
    ]),
    ...mapGetters([
      'getTopContracts',
      'getTransactionsByContractID'
    ]),
    first () {
      let contract = this.getTopContracts.find(c => c.id == '0x8a0c542ba7bbbab7cf3551ffcc546cdc5362d2a1')
      return contract
    },
    second () {
        let contract = this.getTopContracts.find(c => c.id == '0x828e90cef49b3baea41590ebf7f274d49f845dbb')
        return contract
    },
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
