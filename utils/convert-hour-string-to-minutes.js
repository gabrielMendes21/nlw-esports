// Ex
// Param => "18:00"
// Array => ["18", "00"]
// Minutes amount => (18 * 60) + 00

export function convertHourStringToMinutes(hourString) {
    const [hours, minutes] = hourString.split(':').map(Number)
  
    const minutesAmount = (hours * 60) + minutes
  
    return minutesAmount
  }