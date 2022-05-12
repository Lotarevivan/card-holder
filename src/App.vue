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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          odio non, porro ipsa mollitia quo eius eum rem earum cupiditate animi
          iste necessitatibus nesciunt facere ducimus laboriosam molestias ut
          dolore.
        </p>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="newCardNumber"
                  v-maska="'#### #### #### #### ####'"
                  @keyup="checkCadrdsNumber"
                  :style="{
                    background:
                      'url(' +
                      require(`@logo/paysystem/${inputLogo}.svg`) +
                      ') no-repeat right',
                    backgroundSize: '50px',
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
              </div>
            </div>
            <div class="row">
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
            </div>
            <div class="row">
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
            </div>

            <div class="row">
              <div class="input-field col s12">
                <p>
                  <label>
                    <input type="checkbox" />
                    <span>Согласен</span>
                  </label>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn left"
          >Отмена</a
        >
        <a href="#!" class="modal-close waves-effect waves-green btn disabled"
          >Ок</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import CardValidator from 'card-validator'
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
          validMonth: '11',
          validYear: '22',
          holderName: 'Ivan Lotarev',
        },
        {
          id: '2',
          paysystem: 'mir',
          cardNumber: '1234123412341234',
          validMonth: '11',
          validYear: '22',
          holderName: 'Ivan Lotarev',
        },
        {
          id: '3',
          paysystem: 'visa',
          cardNumber: '1234123412341234',
          validMonth: '11',
          validYear: '22',
          holderName: 'Ivan Lotarev',
        },
      ],
      modalInstance: '',

      newCardNumber: '', // номер
      newCardNumberPotentialyIsValid: null,

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
      if (this.newCardNumber.length < 1) {
        return ''
      } else {
        return this.newCardNumberPotentialyIsValid
          ? 'validate valid'
          : 'validate invalid'
      }
    },

    newCardDateError() {
      if (this.newCardDate.length < 1) {
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
      return this.newCardType ? this.newCardType : 'default'
    },
  },
  mounted() {
    this.modalInit()
  },
  methods: {
    modalInit() {
      // переопределим валидацию materialcss, затирает классы
      this.$material.validate_field = () => {}
      // сИнициалиируем и сохраняем ссылку на модальное окно
      const modalElements = this.$material.Modal.init(
        document.querySelectorAll('.modal')
      )
      this.modalInstance = modalElements[0]
    },
    modalOpen() {
      this.modalInstance.open()
    },
    checkCadrdsNumber() {
      if (this.newCardNumber.length === 0) {
        return
      }
      const candidateCard = CardValidator.number(
        //отдаем на проверку npm пакету card-validator
        this.newCardNumber
      )
      this.newCardNumberPotentialyIsValid = candidateCard.isPotentiallyValid //1 флаг isPotentiallyValid
      if (candidateCard.card !== null) {
        //2 тип карты
        this.newCardType = candidateCard.card.type
      } else {
        this.newCardType = null
      }
    },
    checkCadrdsDate() {
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

.input__logo {
  padding-right: 25px;

  background-size: 20px;
}
</style>
