export default function currencyFilter (value, currency = 'BYN') {
    return Intl.NumberFormat('ru-RU',  {
        style: 'currency',
        currency
    }).format(value)
}