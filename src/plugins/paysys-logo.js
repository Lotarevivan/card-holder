const PAYSYSTEM_LOGOS = ['default','mastercard','mir','visa']
export default {
  install: (app) => {
    app.config.globalProperties.$logos = PAYSYSTEM_LOGOS
   
  }
}