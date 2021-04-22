<template>
  <c-box maxW="sm" class="frameworks">
    <c-box class="framework" :class="slug" v-if="data">
      <c-stat>
        <c-stat-label>Collected Fees</c-stat-label>
        <c-stat-number>$500.00</c-stat-number>
        <c-stat-helper-text>Feb 12 - Feb 28</c-stat-helper-text>
      </c-stat>
      <header class="framework__header">
        <strong class="framework__name">{{name}}</strong>
      </header>
      <div class="framework__data">
        <div class="framework__data-info">
          <div class="framework__period">
            <span class="framework__period-text">{{info.label}}</span>
          </div>
          <strong class="framework__downloads">{{info.value}}</strong>
        </div>
        <TrendChart :datasets="[dataset]" :min="0" padding="5 5 0" :interactive="true" @mousemove="onMouseMove"></TrendChart>
      </div>
    </c-box>
  </c-box>
</template>

<script lang="js">

import {
  CStat,
  CStatLabel,
  CStatNumber,
  CStatHelperText,
  CBox,
  CHeading,
} from '@chakra-ui/vue'

export default {
  name: 'ChartWidget',
  components: {
    CBox,
    CHeading,
    CStat,
    CStatLabel,
    CStatNumber,
    CStatHelperText,
  },
props: {
    data: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      name: 'CryptoZ',
      slug: 'cryptoz',
      currentInfo: null
    }
  },
  computed: {
    dataset () {
      return {
        data: this.data,
        showPoints: true,
        fill: false,
        className: 'curve-cryptoz'
      }
    }, 
    info () {
      return {
        label: 'Weekly sales',
        value: 12,
      }
    },
  },
  methods: {
    onMouseMove (params) {
      console.log(params, 'mouse')
      if (!params) {
        this.currentInfo = null
        return
      }
      this.currentInfo = {
        label: params.data[0].day,
        value: params.data[0].value
      }
    }
  }
}
</script>
<style lang="scss">
.frameworks {
  display: flex;
  flex-wrap: wrap;
  .vtc {
    width: 160px;
    height: 60px;
    margin-right: -5px;
  }
  .stroke {
    stroke-width: 2;
  }
  .fill {
    opacity: 0.2;
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    display: none;
  }
  .point.is-active {
     display: block;
  }
}
.framework {
  width: 100%;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__name {
    width: 150px;
  }
  &__period {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    opacity: 0.5;
    &-icon {
      display: block;
      height: 10px;
      width: auto;
      margin-right: 5px;
    }
    &-text {
      font-size: 11px;
      line-height: 16px;
      white-space: nowrap;
    }
  }
  &__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &__downloads {
    font-size: 24px;
  }
  &.cryptoz {
    border-bottom: 2px solid rgba(#39af77, 0.2);
  }
  &.react {
    border-bottom: 2px solid rgba(#61dafb, 0.2);
  }
  &.angular {
    border-bottom: 2px solid rgba(#d8002b, 0.2);
  }
  &.hapi {
    border-bottom: 2px solid rgba(#febc6b, 0.2);
  }
  &.express {
      border-bottom: 2px solid rgba(#259dff, 0.2);
  }
  &.koa {
      border-bottom: 2px solid rgba(#33333d, 0.2);
  }
}
.curve-cryptoz {
  .stroke {
    stroke: #39af77;
  }
  .fill {
    fill: #39af77;
  }
  .point {
    fill: #39af77;
    stroke: #39af77;
  }
}
.curve-hapi {
  .stroke {
    stroke: #febc6b;
  }
  .fill {
      fill: #febc6b;
  }
  .point {
    fill: #febc6b;
    stroke: #febc6b;
  }
}
.curve-express {
  .stroke {
    stroke: #259dff;
  }
  .fill {
    fill: #259dff;
  }
  .point {
    fill: #259dff;
    stroke: #259dff;
  }
}
</style>
