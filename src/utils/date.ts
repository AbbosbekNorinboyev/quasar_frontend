import {date as quasarDate} from 'quasar'

export const formatDate = (value: string | null | undefined) => {
    if (!value) return ''

    return quasarDate.formatDate(value, 'DD.MM.YYYY HH:mm')
}