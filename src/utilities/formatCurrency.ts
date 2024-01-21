const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
})

export function formatCurrency(number: number | undefined){
    if(number!== undefined){
        return CURRENCY_FORMATTER.format(number)
    }
    else{
        return formatCurrency(number)
    }
}