<template>
  <CBox
    as="nav"
    h="60px"
    px="4"
    d="flex"
    align-items="center"
    shadow="sm"
    mb="3"
  >
    <CLink as="nuxt-link" w="160px" to="/" font-weight="bold" font-size="1.2rem">
      <Logo />
      <c-text
        as="span"
        :d="['none', 'none', 'inline']"
        font-size="md"
        ml="auto"
      >
        NFT Explorer
      </c-text>
    </CLink>

    <CDivider orientation="vertical" border-color="green.500" />
    <CBox
      as="ul"
      color="gray.500"
      :d="['none', 'none', 'flex']"
      align-items="end"
      list-style-type="none"
      pl="16px"
    >
      <CBox as="li" mr="2">
        <CButton
          as="nuxt-link"
          to="/shop"
          variant="ghost"
          variant-color="gray"
          aria-label="Explore NFT shop"
        >
          Shop
        </CButton>
      </CBox>
      <CBox as="li" mr="2">
        <CButton
          as="nuxt-link"
          to="/ranking"
          variant="ghost"
          variant-color="gray"
          aria-label="Top sellers and buyers"
        >
          Ranking
        </CButton>
      </CBox>
    </CBox>

    <AlgoliaSearch ml="auto" />

    <CBox
      as="ul"
      color="gray.500"
      d="flex"
      align-items="center"
      list-style-type="none"
      pl="16px"
    >
      <CBox as="li">
        <CButton
          variant="ghost"
          variant-color="green"
          aria-label="Connect Wallet"
          @click="toggleWalletMode"
        >
          Connect
        </CButton>
      </CBox>
      <MobileNav />
    </CBox>
  </CBox>
</template>

<script>
import { CBox, CDivider, CLink, CButton, CText } from '@chakra-ui/vue'
import Logo from './Logo.vue'
import MobileNav from './MobileNav.vue'
import AlgoliaSearch from './AlgoliaSearch.vue'

export default {
  name: 'Navbar',
  components: {
    CBox,
    CDivider,
    CLink,
    CButton,
    CText,
    Logo,
    MobileNav,
    AlgoliaSearch
  },
  computed: {
    walletMode () {
      return {}
    }
  },
  watch: {
    walletMode (newVal) {
      if (!process.client) { return }
      try {
        localStorage.setItem('nft_wallet', newVal)
      } catch (error) {
        console.error(error)
      }
    }
  },
  async mounted () {
    await this.$nextTick()
  },
  created () {
    if (!process.client) { return }
    try {
      const savedWalletMode = localStorage.getItem('nft_wallet')
      if (!savedWalletMode) { return }

      if (this.walletMode !== savedWalletMode) {
        console.log('Wallet mode changed.')
      }
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    toggleWalletMode () {
      console.log('Wallet mode clicked.')
    }
  }
}
</script>
