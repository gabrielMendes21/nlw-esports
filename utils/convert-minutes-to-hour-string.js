// Ex
// Param => "90"
// hours => 90 / 60 ( with no decimal point ) = 1
// minutes => 90 % 60 = 30
// hoursAmount = 1:30

export function convertMinutesToHourString(minutesAmount) {
    const hours = String(Math.floor(minutesAmount / 60))
    const minutes = String((minutesAmount % 60))
  
    const hoursAmount = hours.padStart(2, '0') + ":" + minutes.padStart(2, '0')
    
    return hoursAmount
}