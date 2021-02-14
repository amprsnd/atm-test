<template>
  <div class="container">
    <div
      v-for="(rows, r) in numpad"
      :key="r"
      class="row d-flex p-1"
    >
      <b-button
        v-for="button in numpad[r]"
        :key="button"
        class="flex-fill m-1"
        size="lg"
        variant="outline-dark"
        @click="setButtonValue(button)"
      >{{ button }}</b-button>
    </div>
    <div class="row d-flex p-1">
      <b-button
        class="flex-fill m-1"
        size="lg"
        variant="danger"
        @click="setButtonValue('X')"
      >X</b-button>
      <b-button
        class="flex-fill m-1"
        size="lg"
        variant="outline-dark"
        @click="setButtonValue(0)"
      >0</b-button>
      <b-button
        class="flex-fill m-1"
        size="lg"
        variant="warning"
        @click="setButtonValue('<')"
      >&lt;</b-button>
    </div>
    <div class="row d-flex p-2">
      <b-button
        class="col"
        size="lg"
        variant="success"
        @click="cashOut()"
      >Обналичить</b-button>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  name: 'TheNumpad',
  props: {
    sum: {
      type: String,
      default: '0'
    }
  },
  components: {
    BButton
  },
  model: {
    prop: 'sum',
    event: 'change'
  },
  data: () => ({
    numpad: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
  }),
  methods: {
    setButtonValue (val) {
      val = val.toString()
      if (val === 'X') {
        this.sum = '0'
      } else if (val === '<') {
        this.sum = this.sum.length > 1
          ? this.sum.slice(0, -1)
          : '0'
      } else {
        this.sum = this.sum === '0' ? val : this.sum + val
      }
      this.$emit('change', this.sum)
    },
    cashOut () {
      this.$emit('cash-out')
      this.sum = '0'
      this.$emit('change', this.sum)
    }
  }
}
</script>

<style lang="scss">

</style>
