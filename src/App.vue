<template>
  <section class="cards__container">
    <div class="cards__item">
      <div class="cards__body">
        <div class="cards__body-logo">
          <img src="../src/assets/icons/paysystem/mastercard.svg" alt="" srcset="">
        </div>
        <div class="cards__body-number">
          <p>1234</p>
          <p>1234</p>
          <p>1234</p>
          <p>1234</p>
        </div>
        <div class="cards__body-valid">
          <div>valid/true</div>
          <div>00/00</div>
        </div>
        <div class="cards__body-name">
          <div>adasdad</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
.cards {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 90mm);
    // grid-auto-flow:column;
    grid-gap: 20px;
  }
  &__item {
    padding: 5px;
  }
}
.cards__body {
  height: 55mm;
  width: 86mm;
  border: 1px solid rgb(82 35 84 / 59%);
  background: linear-gradient(35deg, rgb(252 145 45 / 14%), rgba(152, 218, 220, 0.322));
  border-radius: 12px;
  border-radius: 12px;
  display: grid;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  transition: 0.2s ease-in-out;
  &:hover{
    border: 1px solid rgb(82 35 84 / 90%);
    box-shadow: 6px 6px 6px 0px rgba(64, 40, 142, 0.2);
  }
  &-number {
    //     border: 1px solid green;
    align-self: center;
    display: flex;
    justify-content: space-between;
    line-height: 1;
  }
  &-valid {
    //     border: 1px solid rgb(176, 19, 215);
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 2em;
    }
  }
  &-name {
    align-self: center;
    //     border: 1px solid rgb(10, 13, 112);
  }
  &-logo {
    // align-self: center;
    border: 1px solid black;
    text-align: center;
    max-height: 30px;
    //     border: 1px solid rgb(10, 226, 68);
    img{
      max-height: inherit;
    }
  }
}
</style>
