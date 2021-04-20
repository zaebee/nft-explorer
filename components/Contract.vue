<template>
  <c-simple-grid min-child-width="290px" spacing="1rem">
    <c-box v-for="item in list" :key="item.number" rounded="lg" border-width="1px">
      <c-box p="6">
        <c-box d="flex" align-items="baseline">
          <c-box
            color="gray.500"
            font-weight="semibold"
            letter-spacing="wide"
            font-size="xs"
            text-transform="uppercase"
          >
            #{{ item.number }} &bull; NFT &bull; BSC
          </c-box>
        </c-box>
        <c-flex
          mt="1"
          font-weight="semibold"
          as="h4"
          line-height="tight"
          is-truncated
        >
          <c-avatar :src="item.img" :alt="item.number" />
          <c-box ml="3">
            <c-text size="md" font-weight="bold">
              {{ item.name }}
            </c-text>
            <c-text as="span">
              <c-badge rounded="full" px="2" variant-color="green">
                {{ item.symbol }}
              </c-badge>
            </c-text>
          </c-box>
        </c-flex>
        <c-box d="flex" mt="2" align-items="center">
          <c-box as="span" mr="2" color="gray.600" font-size="sm">
            {{ item.cards_count }} tokens
          </c-box>
          <c-icon
            v-for="(_, i) in Array(5).fill('')"
            :key="i"
            name="star"
            :color="i < rating(item) ? 'green.500' : 'gray.300'"
          />
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-button as="nuxt-link" :to="item.contractUrl" color="gray.600" font-size="sm">
            Contract detail
          </c-button>
        </c-box>
      </c-box>
    </c-box>
  </c-simple-grid>
</template>

<script lang="js">
import { mapState, mapGetters } from 'vuex'
import {
  CAvatar,
  CBox,
  CBadge,
  CButton,
  CText,
  CFlex,
  CIcon,
  CSimpleGrid
} from '@chakra-ui/vue'

export default {
  name: 'Contract',
  components: {
    CAvatar,
    CBox,
    CBadge,
    CButton,
    CText,
    CFlex,
    CIcon,
    CSimpleGrid
  },
  props: [
    'list'
  ],
  computed: {
    ...mapGetters([
      'getTotalCards',
    ])
  },
  methods: {
    rating (item) {
      return (item.cards_count / this.getTotalCards) * 5
    }
  }
}
</script>
