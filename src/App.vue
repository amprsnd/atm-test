<template>
  <div class="container-fluid">
    <h1>Доступная сумма для снятия: {{ total }}</h1>
    <label for="sum">Сумма для снятия:</label>
      <b-form-input
      id="sum"
      v-model="sum"
      placeholder="Введите сумму для снятия наличных"
      @focus="checkZero()"
      @blur="checkEmpty()"
    />
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(1)"
    >1</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(2)"
    >2</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(3)"
    >3</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(4)"
    >4</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(5)"
    >5</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(6)"
    >6</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(7)"
    >7</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(8)"
    >8</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(9)"
    >9</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="setButtonValue(0)"
    >0</b-button>
    <b-button
      class="m-2"
      size="lg"
      variant="outline-dark"
      @click="cashOut()"
    >Обналичить</b-button>
    <div>
      <b-alert
        show
        v-for="(message, i) in log"
        :key="i"
        :variant="message.type"
        v-html="message.text"
      >
      </b-alert>
    </div>
  </div>
</template>

<script>
import { BFormInput, BButton, BAlert } from 'bootstrap-vue'

export default {
  name: 'App',
  components: {
    BFormInput,
    BButton,
    BAlert
  },
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
    checkZero () { if (this.sum === '0') this.sum = '' },
    checkEmpty () { if (this.sum === '') this.sum = '0' },
    setButtonValue (val) {
      val = val.toString()
      this.sum = this.sum === '0' ? val : this.sum + val
    },
    cashOut () {
      let sum = parseInt(this.sum)
      const cash = {}
      let additionalMessage

      if (sum < 0) {
        this.log.unshift({
          type: 'warning',
          text: 'К сожалению это не CashIn банкомат, деньги можно только снимать'
        })
        return
      }

      if (sum === 0) {
        this.log.unshift({
          type: 'warning',
          text: 'Введите сумму для снятия'
        })
        return
      }
      if (sum % this.minimum !== 0) {
        this.log.unshift({
          type: 'warning',
          text: `Минимальная доступная сумма для снятия <strong>${this.minimum}&#8372;</strong>`
        })
        return
      }
      if (sum > this.total) {
        this.log.unshift({
          type: 'danger',
          text: `В банкомате недостаточно средств, максимально доступная сумма <strong>${this.total}&#8372;</strong>`
        })
        return
      }

      this.denominals.forEach(denom => {
        cash[denom] = sum >= denom ? (sum - sum % denom) / denom : 0
        cash[denom] = cash[denom] < this.cash[denom] ? cash[denom] : this.cash[denom]
        sum -= denom * cash[denom]
      })

      if (sum !== 0) {
        additionalMessage = this.sum - sum !== 0
          ? `, но вы можете снять <strong>${this.sum - sum}&#8372;</strong>`
          : '. Попробуйте ввести сумму побольше'

        this.log.unshift({
          type: 'danger',
          text: `В банкомате недостаточно купюр что бы выдать нужную сумму${additionalMessage}`
        })
        return
      }

      for (const denom in cash) { this.cash[denom] -= cash[denom] }

      sum = this.sum
      additionalMessage = this.total !== 0
        ? ', можно повторить операцию'
        : '. Это всё, больше банкомат выдать денег не сможет'

      this.log.unshift({
        type: 'success',
        text: `Вы успешно сняли <strong>${sum}&#8372;</strong>${additionalMessage}`
      })

      this.sum = '0'
    }
  }
}
</script>

<style lang="scss">
</style>
