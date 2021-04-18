<template>
  <div class="container">
    <c-heading mx="3rem" mt="8" mb="4">{{ contract.name }}</c-heading>
    <c-box mx="3rem" rounded="lg" border-width="1px">
      <c-box p="6">
        <c-box d="flex" align-items="baseline">
          <c-box
            color="gray.500"
            font-weight="semibold"
            letter-spacing="wide"
            font-size="xs"
            text-transform="uppercase"
          >
          #{{contract.number}} &bull; NFT &bull; BSC
          </c-box>
        </c-box>
        <c-flex
          mt="1"
          font-weight="semibold"
          as="h4"
          line-height="tight"
          is-truncated
        >
          <c-avatar :src="contract.img" :alt="contract.number" />
          <c-box ml="3">
            <c-text size="md" font-weight="bold">
              {{ contract.name }}
            </c-text>
            <c-text as="span">
              <c-badge rounded="full" px="2" variant-color="green">
                {{ contract.symbol }}
              </c-badge>
              {{ contract.marketCap }}
              <c-text as="span" color="gray.600" fontSize="sm">
                / Cap
              </c-text>
            </c-text>
          </c-box>
        </c-flex>
        <c-box d="flex" mt="2" align-items="center">
          <c-box as="span" mr="2" color="gray.600" font-size="sm">
            {{ contract.holders }} holders
          </c-box>
          <c-icon
            v-for="(_, i) in Array(5).fill('')"
            name="star"
            :key="i"
            :color="i < contract.rating ? 'green.500' : 'gray.300'"
          />
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-button :isLoading="loading == true ? true : false" @click="loadTokens" color="gray.600" font-size="sm">
            Load Tokens
          </c-button>
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-text as="span">
            Loaded tokens: 
            <c-badge rounded="full" px="2" variant-color="green">
            {{ tokens_metadata.length }} / {{ pagination.total_count }}
            </c-badge>
          </c-text>
        </c-box>
      </c-box>
    </c-box>

    <c-box mx="3rem" mt="1rem">
      <c-box p="6">
          <Pagination :pages="[1, 2, 3, 4, 5]" />
      </c-box>
    </c-box>

    <c-box mx="3rem">
      <c-box px="6" pb="6">
        <Token :list="tokens_metadata"/>
      </c-box>
    </c-box>
  </div>
</template>

<script lang="js">
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import {
    CAvatar,
    CBox,
    CBadge,
    CButton,
    CText,
    CStack,
    CGrid,
    CFlex,
    CIcon,
    CImage,
    CHeading
  } from '@chakra-ui/vue'
  import Pagination from '../../../components/Pagination'
  import Token from '../../../components/Token'

  export default {
    name: 'ContractDetail',
    head () {
      return {
        title: `${this.contract.name} - NFT Explorer»`,
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: this.contract.name},
          { property: 'og:title', content: `${this.contract.name} - NFT Explorer` },
          { property: 'og:description', content: this.contract.name},
        ],
        bodyAttrs: {
          class: 'app app-contract'
        }
      }
    },
    scrollToTop: true,
    async fetch ({ store, params, error }) {
      if (store.state.contracts.length == 0) {
        await store.dispatch('GET_CONTRACTS')
      }
      await store.dispatch('CONTRACT_DETAIL', params.id)

      if (!store.state.contract.id) {
        return error({ message: 'Contract not found', statusCode: 404 })
      }
    },
    components: {
      CBox,
      CAvatar,
      CBadge,
      CButton,
      CText,
      CStack,
      CGrid,
      CFlex,
      CIcon,
      CImage,
      CHeading,
      Pagination,
      Token
    },
    data () {
      return {
        loading: false,
        showModal: false,
      }
    },
    computed: {
      ...mapState([
        'contracts',
        'contract',
        'tokens',
        'tokens_metadata',
        'pagination',
      ]),
      ...mapGetters([
        'filterTokenByType',
        'getContractByID',
      ]),
    },
    methods: {
      loadTokens() {
        console.log('tokens')
        this.loading = true
        this.$store.dispatch('GET_TOKENS_METADATA')
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    }
  }
</script>
