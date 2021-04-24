<template>
  <c-simple-grid min-child-width="260px" spacing="1rem">
    <c-box v-for="item in list" :key="item.number" rounded="lg" border-width="1px">
        <c-image m="auto" text-align="center" v-lazy="imageSrc(item.nft_data)" :alt="nftName(item.nft_data)" />
      <c-box p="6">
        <c-box d="flex" align-items="baseline">
          <c-box
            color="gray.500"
            font-weight="semibold"
            letter-spacing="wide"
            font-size="xs"
            text-transform="uppercase"
            mr="2"
          >
            Owner
          </c-box>
            <c-badge rounded="full" px="2" variant-color="green">{{ ownerTag(item.nft_data) }}</c-badge>
        </c-box>
        <c-box
          mt="1"
          font-weight="semibold"
          as="h4"
          line-height="tight"
          is-truncated
        >
          {{ nftName(item.nft_data) }}
        </c-box>
        <c-box as="span" color="gray.600" font-size="xs">
          {{ nftDesc(item.nft_data) }}
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-icon
            v-for="(_, i) in Array(5).fill('')"
            :key="i"
            name="star"
            :color="i < item.rating ? 'green.500' : 'gray.300'"
          />
          <c-box as="span" ml="2" color="gray.600" font-size="sm" font-weight="semibold">
            #{{ item.token_id.slice(0, 7) }} Token ID
          </c-box>
        </c-box>
      </c-box>
    </c-box>
  </c-simple-grid>
</template>

<script lang="js">
import {
  CBox,
  CBadge,
  CIcon,
  CImage,
  CSimpleGrid
} from '@chakra-ui/vue'

export default {
  name: 'Token',
  components: {
    CBox,
    CBadge,
    CIcon,
    CImage,
    CSimpleGrid
  },
  props: [
    'list'
  ],
  methods: {
    imageSrc (nft_data) {
      if (nft_data.external_data) {
      let data = nft_data.external_data
        return data.image || data.small_image
      }
      return 'https://via.placeholder.com/300'
    },
    nftName (nft_data) {
      if (nft_data.external_data && nft_data.external_data.name) {
        return nft_data.external_data.name
      }
      return 'Unnamed'
    },
    nftDesc (nft_data) {
      if (nft_data.external_data && nft_data.external_data.description) {
        return nft_data.external_data.description.slice(0, 145)
      }
      return ''
    },
    ownerTag (nft_data) {
      if (nft_data.owner) {
        return nft_data.owner.slice(0, 7)
      }
      return 'New'
    }
  }
}
</script>
