<template>
  <div id="app" class="d-flex flex-column">
    <the-header :total="total" />
    <div class="container-fluid flex-grow-1">
      <div class="row">
        <div class="col">
          <div class="sticky-top">
            <div class="p-2">
              <label for="sum">Сумма для снятия:</label>
              <b-input-group append-html="&#8372;" class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-input
                id="sum"
                v-model="sum"
                placeholder="Введите сумму для снятия наличных"
                @focus="isEmpty()"
                @blur="isEmpty()"
                @keypress.enter="formCashOut()"
              />
              </b-input-group>
            </div>
            <the-numpad
              v-model="sum"
              @cash-out="cashOut()"
            />
          </div>
        </div>
        <div class="col pt-4">
          <b-alert
            show
            v-for="(message, i) in log"
            :key="i"
            :variant="message.type"
            v-html="message.text"
          />
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
import { BInputGroup, BFormInput, BAlert } from 'bootstrap-vue'
import TheHeader from './components/TheHeader'
import TheFooter from './components/TheFooter'
import TheNumpad from './components/TheNumpad'

import cashOut from './utils/cashout'

export default {
  name: 'App',
  components: {
    TheHeader,
    BInputGroup,
    BFormInput,
    TheNumpad,
    BAlert,
    TheFooter
  },
  mixins: [cashOut],
  data: () => ({
    sum: '0',
    cash: {
      10: 20,
      20: 20,
      50: 20,
      100: 20,
      200: 20,
      500: 20
    },
    log: []
  }),
  computed: {
    total () {
      let total = 0

      for (const denom in this.cash) {
        total += denom * this.cash[denom]
      }

      return total
    },
    denominals () {
      const denominals = []
      for (const denom in this.cash) {
        denominals.push(parseInt(denom))
      }

      return denominals.sort((a, b) => a < b)
    },
    minimum () {
      return this.denominals[this.denominals.length - 1]
    }
  },
  methods: {
    isEmpty () {
      if (this.sum === '0') {
        this.sum = ''
        return
      }
      if (this.sum === '') this.sum = '0'
    },
    formCashOut () {
      this.cashOut()
      this.sum = ''
    }
  }
}
</script>

<style lang="scss">
  #app { height: 100%; }
</style>
