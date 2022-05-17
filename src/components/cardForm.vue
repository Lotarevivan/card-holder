<template>
  <div class="row">
    <form class="col s12"
      @keyup.enter="SendToServer"
    >
      <div class="row">
        <div class="input-field col s12">
          <input
            v-model.trim="newCardNumber"
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
            v-model.trim="newCardDate"
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
            @keyup="checkCadrdsCvv"
            @blur="validateCadrdsCvv"
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
            v-model.trim="newCardName"
            @blur="validateCadrdsName"
            @keyup="checkCadrdsName"
            placeholder="Введите имя как на карте"
            id="name"
            type="text"
            class=""
            :class="newCardNameError"
            inputmode="numeric"
          />
          <label for="name">Имя держателя</label>
          <span
            class="helper-text"
            data-error="Проверьте имя"
            data-success=""
          ></span>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <p>
            <label>
              <input
              v-model="rules"
               type="checkbox" />
              <span>Согласен</span>
            </label>
          </p>
        </div>
      </div>
    </form>
         <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn left"
          >Отмена</a
        >
        <button   
        :disabled="allFormValid"
        @click.prevent="SendToServer"
        class="waves-effect waves-green btn"
          >Ок</button>
      </div>
  </div>
</template>

<script>
import  {validateCardNumber, validateCardDate, validateCardCvv, validateCardName,sendCardinfo}  from './utils'
export default {
  name: 'cardForm',
  emits: ['newCardOnSuccess','newCardOnError'],
  data() {
    return {
      newCardNumber: '4276835011348750', // номер
      newCardNumberPotentialyIsValid: null,
      newCardNumberIsValid: null,

      newCardType: null, // лого

      newCardDate: '0424', // дата
      newCardDatePotentialyIsValid: null,
      newCardDateIsValid: null,

      newCardCvv: '654', // CVV
      newCardCvvPotentialyIsValid:null,
      newCardCvvIsValid:null,

      newCardName: 'asdasd asd ',
      newCardNamePotentialyIsValid:null,
      newCardNameIsValid: true,
      
      rules:false,
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
      if (this.newCardCvv.length <2) {
        return ''
      }
      return this.newCardCvvPotentialyIsValid || this.newCardCvvIsValid
        ? 'valid'
        : 'invalid'
    },
    newCardNameError() {
      if (this.newCardName.length <2) {
        return ''
      }
      return this.newCardNamePotentialyIsValid || this.newCardNameIsValid
        ? 'valid'
        : 'invalid'
    },
    inputLogo() {
      //this.$logos константа в плагинах
      return this.$logos.includes(this.newCardType)
        ? this.newCardType
        : 'default'
    },

    allFormValid(){
      return !this.newCardNumberIsValid||!this.newCardDateIsValid||!this.newCardCvvIsValid||!this.newCardNameIsValid||!this.rules
    }
  },
  mounted(){
   
  },
  methods: {
    checkCadrdsNumber() {
      // отдаем на проверку в файл utils.js
      const res = validateCardNumber(this.newCardNumber)
      this.newCardNumberPotentialyIsValid = res.isPotentiallyValid
      this.newCardNumberIsValid = res.isValid
      this.newCardType  = res.newCardType
    },
    ValidateCadrdsNumber() {
      // По блюру приравниваем т.к окончательно валидацию не прошла
      this.newCardNumberPotentialyIsValid = this.newCardNumberIsValid
    },
    checkCadrdsDate() {
      const res = validateCardDate(this.newCardDate)
      this.newCardDatePotentialyIsValid = res.isPotentiallyValid
      this.newCardDateIsValid = res.isValid
    },
    checkCadrdsCvv() {
      const res = validateCardCvv(this.newCardCvv)
      this.newCardCvvPotentialyIsValid = res.isPotentiallyValid
      this.newCardCvvIsValid = res.isValid
    },
    validateCadrdsCvv(){
      this.newCardCvvPotentialyIsValid = this.newCardCvvIsValid
    },
    checkCadrdsName() {
      const res = validateCardName(this.newCardName)
      this.newCardNamePotentialyIsValid = res.isPotentiallyValid
      this.newCardNameIsValid = res.isValid
    },
    validateCadrdsName(){
      this.newCardNamePotentialyIsValid = this.newCardNameIsValid
    },
    resetForm(){
      this.newCardNumber=''
      this.newCardDate=''
      this.newCardCvv=''
      this.newCardName=''
    },
    async SendToServer(){
      if(this.allFormValid){
        return
      }
      const paylaod = {
        number:this.newCardNumber,
        date:this.newCardDate,
        cvv:this.newCardCvv,
        name:this.newCardName,
        paysystem:this.newCardType
      }
      sendCardinfo(paylaod).then(result=>{
        this.$emit('newCardOnSuccess',result,paylaod)
        // console.log(result)
      }).catch((err=>{
        this.$emit('newCardOnError',err)
        // console.log(e)
      }))
     
    }
  },
}
</script>


