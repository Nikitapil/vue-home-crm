import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'
const locales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localazeFilter(key, defaultLocale = 'ru-RU') {
    const locale = store.getters.info.locale || defaultLocale
    return locales[locale][key] || `[localize error]: key ${key} not found`
}