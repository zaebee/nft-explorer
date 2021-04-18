<template>
  <c-simple-grid min-child-width="260px" spacing="1rem">
    <c-box v-for="item in list" :key="item.number" rounded="lg" border-width="1px">
      <c-image :src="item.imageUrl" :alt="item.imageAlt" />
      <c-box p="6">
        <c-box d="flex" align-items="baseline">
          <c-badge rounded="full" px="2" variant-color="green">
            New
          </c-badge>
          <c-box
            color="gray.500"
            font-weight="semibold"
            letter-spacing="wide"
            font-size="xs"
            text-transform="uppercase"
            ml="2"
          >
            {{ item.beds }} beds &bull; {{ item.baths }} baths
          </c-box>
        </c-box>
        <c-box
          mt="1"
          font-weight="semibold"
          as="h4"
          line-height="tight"
          is-truncated
        >
          {{ item.title }}
        </c-box>
        <c-box>
          {{ item.formattedPrice }}
          <c-box as="span" color="gray.600" fontSize="sm">
            / wk
          </c-box>
        </c-box>
        <c-box d="flex" mt="2" align-items="center">
          <c-icon
            v-for="(_, i) in Array(5).fill('')"
            name="star"
            :key="i"
            :color="i < item.rating ? 'green.500' : 'gray.300'"
          />
          <c-box as="span" ml="2" color="gray.600" font-size="sm">
            {{ item.reviewCount }} reviews
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
    CText,
    CIcon,
    CImage,
    CSimpleGrid
  } from '@chakra-ui/vue'

  export default {
    name: 'Contracts',
    components: {
      CBox,
      CBadge,
      CText,
      CIcon,
      CImage,
      CSimpleGrid
    },
    props: [
      'list'
    ],
    methods: {
    }
  }
</script>
