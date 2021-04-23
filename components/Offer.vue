<template>
  <c-stack :spacing="0" my="1rem">
    <c-text font-size="sm">Token ID: {{ deal.token_id }}</c-text>
    <c-text font-size="sm">Price: <b>BNB {{ deal.logs.length ? deal.logs[0].price : 'unknown' }}</b></c-text>
    <c-text font-size="sm">Seller: {{ deal.logs.length ? deal.logs[0].seller.slice(0, 8) : '-' }}</c-text>
    <c-text font-size="sm">Date: {{ deal.logs.length ? deal.logs[0].startTime: '-' }}</c-text>
    <c-text font-size="sm">
      Tx hash:
      <c-link color="green.500" :href="url" is-external>
        {{deal.tx_hash.slice(0, 8)}}
      </c-link>
    </c-text>
  </c-stack>
</template>

<script lang="js">
  import _ from 'loadsh'
  import {
    CBox,
    CStack,
    CText,
    CHeading,
    CTooltip,
    CLink,
  } from '@chakra-ui/vue'

  export default {
    name: 'SaleWidget',
    components: {
      CBox,
      CStack,
      CText,
      CHeading,
      CTooltip,
      CLink,
    },
    props: {
      deal: {
        type: Object,
        required: true
      },
    },
    data () {
      return {
        loading: false,
      }
    },
    computed: {
      url () {
        return `https://bscscan.com/tx/${this.deal.tx_hash}`
      }
    },
    methods: {
    }
  }
</script>
