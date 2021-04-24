<template>
  <c-box my="3rem">
    <c-grid template-columns="repeat(4, 1fr)" gap="6">
      <c-box w="100%" clas="cover">
        <c-image size="sm" :name="name" v-lazy="imageSrc(name)"  />
      </c-box>

      <c-box w="100%" class="sales">
        <c-stat>
          <c-stat-number>{{ name || 'Unknown name' }}</c-stat-number>
          <c-stat-label class="contract_header">
            <strong class="contract__name">vol: {{ volume.toFixed(5) }} <b>BNB</b> </strong>
          </c-stat-label>
          <c-stat-helper-text><b>{{ dealsCount }}</b> Deals with average price {{ avgPrice.toFixed(5) }} BNB </c-stat-helper-text>
        </c-stat>
        <trend-chart
          :datasets="datasets"
          :grid="grid"
          :labels="labels"
          :min="0"
          :interactive="true"
          @mouse-move="onMouseMove"/>
      </c-box>

      <c-box w="100%">
        <c-button :is-loading="loading == true ? true : false" color="gray.600" font-size="sm" @click="showOffers(name)">
          Show offer prices
        </c-button>
        <c-box v-if="tokenOffers">
          <offer v-for="offer in tokenOffers.hits" :key="offer.id" :deal="offer._source" />
        </c-box>
      </c-box>
    </c-grid>
  </c-box>
</template>

<script lang="js">
  import _ from 'loadsh'
  import { mapState, mapGetters } from 'vuex'
  import Offer from  '../components/Offer'
  import {
    CButton,
    CImage,
    CStat,
    CStatLabel,
    CStatNumber,
    CStatHelperText,
    CStack,
    CAvatar,
    CBox,
    CGrid,
    CHeading,
    CTooltip,
    CList,
    CListItem
  } from '@chakra-ui/vue'

  export default {
    name: 'SaleWidget',
    components: {
      CButton,
      CImage,
      CStat,
      CStatLabel,
      CStatNumber,
      CStatHelperText,
      CAvatar,
      CStack,
      CBox,
      CGrid,
      CHeading,
      CTooltip,
      CList,
      CListItem,
      Offer
    },
    props: {
      contract: Object,
      name: {
        type: String,
        required: true
      },
      sales: {
        type: Array,
        required: true,
      },
      volume: {
        type: Number
      },
      avgPrice: {
        type: Number
      },
    },
    data () {
      return {
        external_data: {},
        tokenOffers: [],
        loading: false,
        grid: {
          verticalLines: true,
          horizontallLines: true,
        },
      }
    },
    computed: {
      ...mapState([
        'offers'
      ]),
      values () {
        return this.sales.map(sale => parseFloat(sale.volume.value.toFixed(4)))
      },
      labels () {
        return {
          xLabels: this.sales.map(sale => ''),
          yLabels: 2,
          //yLabelTextFormatter: val => (Math.round(val * 100) / 100).toFixed(4),
        }
      },
      dealsCount () {
        return _.sum(this.sales.map(s => _.sum(s.byTokenId.buckets.map(t => t.doc_count))))
        //return this.sales.filter(s => s.volume.value > 0).length
      },
      datasets () {
        return [
          {
            data: this.values,
            showPoints: true,
            fill: true,
            className: 'curve1'
          }
        ]
      },
      weeklySales () {
        return 0
      },
    },
    methods: {
      onMouseMove (params) {
        console.log(params)
      },
      showOffers (name) {
        this.loading = true
        this.$store.dispatch('GET_OFFERS', {name: name}).then(() => {
          this.tokenOffers = this.offers[this.name]
          this.loading = false
        })
      },
      imageSrc (name) {
        return this.external_data.image
      }
    },
    mounted () {
      this.$nextTick(() => {
        let url = `${this.contract.id}/_search`
        let data = {
          'query': {
            'match_phrase': {
              'nft_data.external_data.name': this.name
            }
          },'size': 1}
        this.$axios.post(url, data).then(response => {
          let hits = response.data.hits.hits
          if (hits.length) {
            this.external_data = hits[0]._source.nft_data.external_data
          }
          console.log('URL', response.data)
        })
      })
    }
  }
</script>

<style lang="scss">
img {
  object-fit: contain;
}
.cover {
  img {
    object-fit: contain;
  }
}
.sales {
  width: 100%;
  .vtc {
    /*height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }*/
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .fill {
      fill: #fbac91;
      opacity: 0.05;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }

  .tooltip {
    &:not(.is-active) {
      display: none;
    }
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
      }
    }
  }
}
</style>
