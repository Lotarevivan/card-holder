<template>
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input
            v-model="newCardNumber"
            v-maska="'#### #### #### #### ####'"
            @keyup="checkCadrdsNumber"
            @blur="ValidateCadrdsNumber"
            :style="{ // тут подумать
              background:
                'url(' +
                require(`@logo/paysystem/${inputLogo}.svg`) +
                ') no-repeat right',
                backgroundSize: '50px',
                transition:'150ms'
            }"
            id="card-number"
            type="text"
            class="input__logo"
            :class="newCardNumberError"
          />
          <label for="card-number">Номер карты</label>
          <span
            class="helper-text"
            data-error="Проверьте номер карты"
            data-success=""
          ></span>
          {{ newCardNumberIsValid }}
        </div>
      </div>
      <!-- <div class="row">
        <div class="input-field col s6">
          <input
            v-model="newCardDate"
            v-maska="'##/##'"
            @keyup="checkCadrdsDate"
            @blur="checkCadrdsDate"
            placeholder="00/00"
            id="card-date"
            type="text"
            class=""
            :class="newCardDateError"
          />
          <label for="card-date">Месяц/Год</label>
          <span
            class="helper-text"
            data-error="Проверьте дату выпуска"
            data-success=""
          ></span>
        </div>
        <div class="input-field col s6">
          <input
            v-model="newCardCvv"
            v-maska="'###'"
            @keyup="checkCadrdsCvv"
            @blur="checkCadrdsCvv"
            id="cvv"
            type="password"
            class=""
            :class="newCardCvvError"
          />
          <label for="cvv">CVV/CVV</label>
          <span
            class="helper-text"
            data-error="Проверьте код"
            data-success=""
          ></span>
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="input-field col s12">
          <input
            v-model="newCardName"
            v-maska="'###'"
            @keyup="checkCadrdsName"
            @blur="checkCadrdsCvv"
            placeholder="Введите имя как на карте"
            id="name"
            type="text"
            class=""
          />
          <label for="name">Имя держателя</label>
          <span
            class="helper-text"
            data-error="Проверьте дату выпуска"
            data-success=""
          ></span>
        </div>
      </div> -->

      <!-- <div class="row">
        <div class="input-field col s12">
          <p>
            <label>
              <input type="checkbox" />
              <span>Согласен</span>
            </label>
          </p>
        </div>
      </div> -->
    </form>
  </div>
</template>

<script>
import CardValidator from 'card-validator'
import  validateCardNumber  from './utils'
export default {
  name: 'cardForm',
  data() {
    return {
      newCardNumber: '', // номер
      newCardNumberPotentialyIsValid: null,
      newCardNumberIsValid: null,

      newCardType: null, // лого

      newCardDate: '', // дата
      newCardDateIsValid: null,

      newCardCvv: '', // CVV
      newCardCvvIsValid: null,

      newCardName: '',
      newCardNameIsValid: '',
    }
  },
  computed: {
    newCardNumberError() {
      if (this.newCardNumber.length <=2&&this.newCardNumberIsValid===null) {
        return ''
      }
      return this.newCardNumberPotentialyIsValid || this.newCardNumberIsValid
        ? 'validation valid'
        : 'validation invalid'
    },

    newCardDateError() {
      if (this.newCardDate.length <=1) {
        return ''
      }
      return this.newCardDateIsValid.isValid
        ? 'validate valid'
        : 'validate invalid'
    },
    newCardCvvError() {
      if (this.newCardCvv.length < 1) {
        return ''
      }
      return this.newCardCvvIsValid ? 'validate valid' : 'validate invalid'
    },
    inputLogo() {
      //this.$logos константа в плагинах
      return this.$logos.includes(this.newCardType)
        ? this.newCardType
        : 'default'
    },
  },
  mounted(){
    
  },
  methods: {
    checkCadrdsNumber() {
      // отдаем на проверку в файл utils.js
      const res = validateCardNumber(this.newCardNumber)
      this.newCardNumberPotentialyIsValid = res.isPotentiallyValid
      this.newCardNumberIsValid = res.isValid,
      this.newCardType  = res.newCardType
    },
    ValidateCadrdsNumber() {
      // По блюру приравниваем т.к окончательно валидацию не прошла
      this.newCardNumberPotentialyIsValid = this.newCardNumberIsValid
    },
    checkCadrdsDate() {
      this.checkCadrdsNumber
      const candidateCard = CardValidator.expirationDate(
        //отдаем на проверку npm пакету card-validator
        this.newCardDate
      )
      console.log(candidateCard)
      this.newCardDateIsValid = candidateCard
    },
    checkCadrdsCvv() {
      const candidateCard = CardValidator.cvv(
        //отдаем на проверку npm пакету card-validator
        this.newCardCvv
      )
      this.newCardCvvIsValid = candidateCard.isValid
    },
    checkCadrdsName() {
      // не пустое
    },
  },
}
</script>

<style></style>
