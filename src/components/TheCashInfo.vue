<template>
  <b-list-group class="p-2">
    <b-list-group-item
      v-for="(qty, key) in cash"
      :key="key"
      :variant="indicateQty(qty)"
      class="d-flex justify-content-between align-items-center"
    >
    {{ key }}&#8372;:
    <b-badge variant="light">{{ qty }}шт.</b-badge>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { BListGroup, BListGroupItem, BBadge } from 'bootstrap-vue'

export default {
  name: 'TheCashInfo',
  props: {
    cash: {
      type: Object,
      required: true
    }
  },
  components: {
    BListGroup,
    BListGroupItem,
    BBadge
  },
  methods: {
    indicateQty (qty) {
      if (qty === 0) return 'secondary'
      if (qty <= 3) return 'danger'
      if (qty <= 10) return 'warning'
      return 'light'
    }
  }
}
</script>

<style lang="scss">

</style>
