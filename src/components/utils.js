// в этом файле валидируем, общаемся с апи

// принимаем на вход номер карты
// отдаем на проверку npm пакету card-validator
// возвращаем  pont.valid, valid,  paysystem, valid от бека
import valid from 'card-validator'
function validateCardNumber(number) {
  const card = valid.number(number)
  const { isPotentiallyValid, isValid } = card
  let newCardType = null
  if (card.card !== null) {
    newCardType = card.card.type
  }
  return{isPotentiallyValid,isValid,newCardType}
}
export default validateCardNumber
