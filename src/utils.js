const currencyFormatter = ({ locale, currency } = { locale: "pt-BR", currency:  "BRL" }) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  })
}


export { currencyFormatter }
