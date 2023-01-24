export default function convertNumbersToWeekDays(stringArray) {
    const orderedArray = stringArray.sort()
    const weekDays = stringArray.map(day => {
        switch(day) {
            case '0':
                return 'Dom'
            case '1':
                return 'Seg'
            case '2':
                return 'Ter'
            case '3':
                return 'Qua'
            case '4':
                return 'Qui'
            case '5':
                return 'Sex'
            case '6':
                return 'Sáb'
            default:
                return ''
        }
    })

    return weekDays.join(', ')
}