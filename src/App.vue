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
        <card-form></card-form>
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

import cardsItem from './components/cardItem.vue'
import cardForm from './components/cardForm.vue'
export default {
  name: 'App',
  components: {
    cardsItem,
    cardForm
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
    }
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
