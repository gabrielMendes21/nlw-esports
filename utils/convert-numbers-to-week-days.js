// Ex
// Arg => ['5', '4', '0', '3', '1', '2', '6']
// OrderedArray => ['0', '1', '2', '3', '4', '5', '6']
// WeekDays => ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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