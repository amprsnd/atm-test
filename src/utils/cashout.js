export default {
  methods: {
    cashOut () {
      let sum = parseInt(this.sum)
      const cash = {}
      let additionalMessage

      if (isNaN(sum)) {
        this.log.unshift({
          type: 'danger',
          text: 'Значение должно быть числовым'
        })
        return
      }

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
          text: `Минимальная доступная купюра для снятия <strong>${this.minimum}&#8372;</strong>`
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
          text: `В банкомате недостаточно купюр что бы выдать <strong>${this.sum}&#8372;</strong>${additionalMessage}`
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
