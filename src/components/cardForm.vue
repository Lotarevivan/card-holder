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
            inputmode="numeric"
            :class="newCardNumberError"
          />
          <label for="card-number">Номер карты</label>
          <span
            class="helper-text"
            data-error="Проверьте номер карты"
            data-success=""
          ></span>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input
            v-model="newCardDate"
            v-maska="'##/##'"
            @keyup="checkCadrdsDate"
            inputmode="numeric"
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
            @blur="checkCadrdsCvv"
            id="cvv"
            type="password"
            inputmode="numeric"
            required=''
            :class="newCardCvvError"
          />
          <label for="cvv">CVV/CVV</label>
          <span
            class="helper-text"
            data-error="Проверьте код"
            data-success=""
          ></span>
        </div>
      </div>
       <div class="row">
        <div class="input-field col s12">
          <input
            v-model="newCardName"
        
            @blur="checkCadrdsName"
            placeholder="Введите имя как на карте"
            id="name"
            type="text"
            class=""
            :class="[newCardNameIsValid ? 'valid' :'invalid']"
            inputmode="numeric"
          />
          <label for="name">Имя держателя</label>
          <span
            class="helper-text"
            data-error="Проверьте дату выпуска"
            data-success=""
          ></span>
        </div>
      </div>

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
import  {validateCardNumber,validateCardDate}  from './utils'
export default {
  name: 'cardForm',
  data() {
    return {
      newCardNumber: '', // номер
      newCardNumberPotentialyIsValid: null,
      newCardNumberIsValid: null,

      newCardType: null, // лого

      newCardDate: '', // дата
  
      newCardDatePotentialyIsValid: null,
      newCardDateIsValid: null,

      newCardCvv: '', // CVV
      newCardCvvIsValid: true,

      newCardName: '',
      newCardNameIsValid: true,
    }
  },
  computed: {
    newCardNumberError() {
      if (this.newCardNumber.length <=2&&this.newCardNumberIsValid===null) {
        return ''
      }
      return this.newCardNumberPotentialyIsValid || this.newCardNumberIsValid
        ? 'valid'
        : 'invalid'
    },

    newCardDateError() {
      if (this.newCardDate.length <=2) {
        return ''
      }
      return this.newCardDatePotentialyIsValid || this.newCardDateIsValid
        ? 'valid'
        : 'invalid'
    },
    newCardCvvError() {
      return this.newCardCvvIsValid ? 'valid' : 'invalid'
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
      // TODO деструктр  
      this.newCardNumberPotentialyIsValid = res.isPotentiallyValid
      this.newCardNumberIsValid = res.isValid,
      this.newCardType  = res.newCardType
    },
    ValidateCadrdsNumber() {
      // По блюру приравниваем т.к окончательно валидацию не прошла
      this.newCardNumberPotentialyIsValid = this.newCardNumberIsValid
    },
    checkCadrdsDate() {
      const res = validateCardDate(this.newCardDate)
      // TODO деструктр  
      this.newCardDatePotentialyIsValid = res.isPotentiallyValid
      this.newCardDateIsValid = res.isValid
    },
    checkCadrdsCvv() {
      this.newCardCvvIsValid = this.newCardCvv.length===3
    },
    checkCadrdsName() {
      this.newCardNameIsValid = this.newCardName.length>1
    },
  },
}
</script>

<style></style>
