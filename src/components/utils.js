// в этом файле валидируем, общаемся с апи

// принимаем на вход номер карты
// отдаем на проверку npm пакету card-validator
// возвращаем  pont.valid, valid,  paysystem, valid от бека
import valid from 'card-validator'




/**
 * Возвращает результа валидации по номеру карты.
 *
 * @param {number} number номер карты.
 * @return {object} сосятоние валидации
 */

function validateCardNumber(number) {
  const card = valid.number(number)
  const { isPotentiallyValid, isValid } = card
  let newCardType = null
  if (card.card !== null) {
    newCardType = card.card.type
  }
  return{isPotentiallyValid,isValid,newCardType}
}

async function customValidateCardNumber(){
  //  тут будет запрос к серверу
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if ( Math.random() < 0.5){
        resolve('valid')
      }else {
        reject('invalid')
      }
    },1500)
  })
}

async function sendCardinfo(cardInfo){
  return fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cardInfo)
  })
}



function validateCardDate(date) {
  return valid.expirationDate(date)
}

function validateCardCvv(cvv) {
  return valid.cvv(cvv)
}

function validateCardName(name) {
  return valid.cardholderName(name)
}
 


export  {validateCardNumber,validateCardDate,validateCardCvv,validateCardName,customValidateCardNumber,sendCardinfo}
