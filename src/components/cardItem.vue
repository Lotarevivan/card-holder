<template>
  <div class="cards__item">
    <div class="cards__body">
      <div class="cards__body-logo">
        <img
          :src="require(`@logo/paysystem/${paysystem}.svg`)"
          alt=""
          srcset=""
        />
        <button class="dismiss" title="Dismiss">
          <svg
            aria-hidden="true"
            class="svg-icon iconClear"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M15 4.41 13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9 15 4.41Z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="cards__body-number" v-html="maskedNumber"></div>
      <div class="cards__body-valid">
        <div>
          valid/ <br>
          true
        </div>
        <div>{{ validMonth }}/{{ validYear }}</div>
      </div>
      <div class="cards__body-name">
        <div>{{ holderName }}</div>
         <div class="cards__body-default-card">
     <label>
      <input class="with-gap" name="group3" type="radio" checked />
      <span></span>
    </label>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-item',
  props: {
    paysystem: {
      type: String,
      default: 'visa',
    },
    cardNumber: {
      type: String,
      default: '1234123412341234',
    },
    validMonth: {
      type: String,
      default: '01',
    },
    validYear: {
      type: String,
      default: '22',
    },
    holderName: {
      type: String,
      default: 'Person Name',
    },
  },
  computed: {
    maskedNumber() {
      const arrayGroup = this.cardNumber.match(/.{1,4}/g)
      arrayGroup.splice(1, 2, 'XXXX', 'XXXX')
      return arrayGroup.map((el) => `<span>${el}</span>`).join('')
    },
  },
}
</script>

<style lang="scss">

.dismiss {
  border:none;
  background: none;
  position: absolute;
  left:90%;
  bottom:85%;
  cursor: pointer;
    &:focus {
      background: none;
  }
} 
</style>
