<template>
  <c-box maxW="sm" class="contracts">
    <c-box w="50%" class="contract" :class="slug" v-if="data">
      <div class="contract__data">
        <c-stat>
          <c-stat-label class="contract_header">
            <strong class="contract__name">{{name}}</strong>
          </c-stat-label>
          <c-stat-number>BNB{{ info.value }}</c-stat-number>
          <c-stat-helper-text>{{ info.label }}</c-stat-helper-text>
        </c-stat>
        <TrendChart :datasets="[dataset]" :min="0" padding="5 5 0" :interactive="true" @mouse-move="onMouseMove"></TrendChart>
      </div>
    </c-box>
    <c-box mt="2rem" w="50%">
      <c-stack is-inline>
        <c-avatar name="" src="https://bit.ly/chakra-evan-you" />
        <c-avatar name="" src="https://bit.ly/chakra-segun-adebayo" />
        <c-avatar name="" src="https://bit.ly/chakra-sarah-drasner" />
        <c-avatar name="" src="https://bit.ly/chakra-kelvin-omereshone" />
        <c-avatar name="" src="https://bit.ly/chakra-mesut-koca" />
        <c-avatar name="" src="https://bit.ly/chakra-gift-egwuenu" />
        <c-avatar name="" src="https://bit.ly/chakra-maya-shavin" />
        <c-avatar name="" src="https://bit.ly/chakra-jonathan-bakebwa" />
      </c-stack>
    </c-box>
  </c-box>
</template>

<script lang="js">

import {
  CStat,
  CStatLabel,
  CStatNumber,
  CStatHelperText,
  CStack,
  CAvatar,
  CBox,
  CHeading,
  CTooltip,
} from '@chakra-ui/vue'

export default {
  name: 'TrendWidget',
  components: {
    CBox,
    CHeading,
    CStat,
    CStatLabel,
    CStatNumber,
    CStatHelperText,
    CStack,
    CAvatar,
    CTooltip,
  },
props: {
    data: {
      type: Array,
      required: true
    },
  },
  data () {
    return {
      name: 'CryptoZ Cards',
      slug: 'cryptoz',
      currentInfo: null
    }
  },
  computed: {
    dataset () {
      return {
        data: this.data,
        showPoints: true,
        fill: true,
        className: 'curve-cryptoz'
      }
    },
    weeklySales () {
      return 0
    },
    info () {
      return {
        label: this.currentInfo ? this.currentInfo.label : 'Weekly sales',
        value: this.currentInfo ? this.currentInfo.value : this.weeklySales
      }
    },
  },
  methods: {
    onMouseMove (params) {
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
.contracts {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
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
.contract {
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
