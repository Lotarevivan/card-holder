<template>
  <div style="height: 100vh; background-color: rgba(170, 126, 227, 0.1)">
    <section class="cards__container">
      <div class="cards__add">
        <div class="cards__body-add">
          <div class="cards__body-button">
            <a
              @click="modalOpen"
              class="btn-floating btn-large waves-effect waves-light teal darken-1"
              ><i class="material-icons">add</i></a
            >
          </div>
        </div>
      </div>
      <cards-item
        v-for="card in cardsArray"
        :key="card.id"
        v-show="cardsArray.length > 0"
        :paysystem="card.paysystem"
        :cardNumber="card.cardNumber"
        :validMonth="card.validMonth"
        :validYear="card.validYear"
        :holderName="card.holderName"
      >
      </cards-item>
    </section>

     <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Lorem ipsum dolor sit amet.</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique odio non, porro ipsa mollitia quo eius eum rem earum cupiditate animi iste necessitatibus nesciunt facere ducimus laboriosam molestias ut dolore.</p>
        <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
           <!-- <i class="material-icons prefix">mode_edit</i> -->
          <input 
           v-model="newCardNumber" 
           v-maska="'#### #### #### #### ####'" 
           @keyup="checkCadrdsNumber"
           placeholder="Введите номер карты" 
           id="card-number" 
           type="text" 
           class="validate">
          <label for="card-number">Номер карты</label>
          <!-- {{testCardNumber}} -->
          {{newCardNumberPotentialyIsValid}}
          <!-- <span class="helper-text" data-error="wrong" data-success="right">Helper text</span> -->
        </div>
      </div>
      <div class="row">
        <div class="input-field col s4">
          <input  
          placeholder="месяц" 
          id="month"
          type="text"
          class="validate"
          >
          <label for="month">Месяц</label>
        </div>
        <div class="input-field col s4">
          <input
            value=""
            id="year"
            type="text"
            class="validate">
          <label for="year">Год</label>
        </div>
        <div class="input-field col s4">
          <input  value="" id="CVV" type="password" class="validate">
          <label for="cvv">CVV</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input
            placeholder="Введите имя как на карте"
           id="name" type="text" class="validate">
          <label for="name">Имя держателя</label>
        </div>
      </div>
    </form>
  </div>
    </div>
    <div class="modal-footer">
       <a href="#!" class="modal-close waves-effect waves-green btn left">Отмена</a>
      <a href="#!" class="modal-close waves-effect waves-green btn disabled">Ок</a>
    </div>
  </div>
  </div>
</template>

<script>
import CardValidator  from 'card-validator'
import cardsItem from './components/cardItem.vue'
export default {
  name: 'App',
  components: {
    cardsItem,
  },
  data() {
    return {
      cardsArray: [
        {
          id: '1', // айди токена карты в нашей системе
          paysystem: 'mastercard',
          cardNumber: '1234123412341234',
          validMonth: '',
          validYear: '',
          holderName: 'Ivan Lotarev',
        },
        {
          id: '2',
          paysystem: 'mir',
          cardNumber: '1234123412341234',
          validMonth: '',
          validYear: '',
          holderName: 'Ivan Lotarev',
        },
        {
          id: '3',
          paysystem: 'visa',
          cardNumber: '1234123412341234',
          validMonth: '',
          validYear: '',
          holderName: 'Ivan Lotarev',
        },
      ],
      modalInstance: '',

      newCardNumber:'',
      newCardNumberPotentialyIsValid:null,
      newCardType:null
      
    }
  },
  // computed:{
  //   testCardNumber() {
  //     return CardValidator.number(this.newCardNumber)
  //   }
  // },
  mounted() {
    this.modalInit()
   
  },
  methods: {
    modalInit() {
      //Инициалиируем и сохраняем ссылку на модальное окно
      const modalElements = this.$material.Modal.init(
        document.querySelectorAll('.modal'),
        {
          startingTop: '10%',
        }
      )
      this.modalInstance = modalElements[0]
    },
    modalOpen() {
      this.modalInstance.open()
    },
    checkCadrdsNumber(){
      // console.log(this.newCardNumber)
      // console.log(this.newCardNumber.length)
      // console.log(CardValidator.number(this.newCardNumber).card)
      if(this.newCardNumber.length===0||CardValidator.number(this.newCardNumber).card===null){
        return
      }
      console.log(CardValidator.number(this.newCardNumber))
      this.newCardNumberPotentialyIsValid = CardValidator.number(this.newCardNumber).card.isPotentiallyValid
    }
  },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.css';
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');

.cards {
  &__container {
    font-family: 'Titillium Web', sans-serif;
    font-size: 20px;

    display: grid;
    grid-template-columns: repeat(auto-fill, 90mm);
    grid-gap: 20px;
    padding: 5%;
  }
  &__item {
    padding: 5px;
    height: min-content;
  }
}
// кнопка добавить - начало
.cards__body {
  &-add {
    border-radius: 12px;
    border-radius: 12px;
    display: grid;
    row-gap: 5px;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
    height: 55mm;
    width: 86mm;
    line-height: 0.7;
    text-align: center;
    border: 1px solid rgb(0 0 0 / 10%);
    background: linear-gradient(
      25deg,
      rgb(77 180 94 / 3%),
      rgb(0 179 229 / 6%)
    );
    &:hover {
      border: 1px solid rgb(82 35 84 / 90%);
      box-shadow: 6px 6px 6px 0px rgba(64, 40, 142, 0.2);
      & button {
        border: 1px solid rgb(82 35 84 / 90%);
      }
    }
  }
  &-button {
    width: 100%;
    align-self: center;
    & button {
      transition: 0.2s ease-in-out;
      border: 1px solid rgb(0 0 0 / 10%);
      padding: 40px;
      border-radius: 50%;
      :hover {
        border: 1px solid rgb(82 35 84 / 90%);
        box-shadow: 6px 6px 6px 0px rgba(64, 40, 142, 0.2);
      }
    }
  }
}

// кнопка добавить - конец
.cards__body {
  height: 55mm;
  width: 86mm;
  line-height: 0.7;
  //мир
  border: 1px solid rgb(0 0 0 / 10%);
  background: linear-gradient(
    25deg,
    rgb(77 180 94 / 10%),
    rgb(0 179 229 / 12%)
  );
  border-radius: 12px;
  border-radius: 12px;
  display: grid;
  row-gap: 5px;
  position: relative;
  padding: 20px 30px;
  box-sizing: border-box;
  transition: 0.2s ease-in-out;
  &:hover {
    border: 1px solid rgb(82 35 84 / 90%);
    box-shadow: 6px 6px 6px 0px rgba(64, 40, 142, 0.2);
  }
  &-number {
    align-self: center;
    display: flex;
    justify-content: space-between;
  }
  &-valid {
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > *:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
  &-name {
    align-self: end;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
  }
  &-default-card {
    position: absolute;
    left: 90%;
    top: 85%;
  }
  &-logo {
    text-align: center;
    max-height: 30px;
    img {
      max-height: inherit;
    }
  }
}
</style>
