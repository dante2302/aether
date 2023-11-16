
export const getTimeDifference = (timeOfCreation) => {
  const toc = new Date(timeOfCreation),
  diff = (Date.now() - toc.valueOf),
  cd = 24*60*60*1000,
  ch = 60*60*1000
  let days = Math.floor(diff / cd),
  hours = Math.floor((diff - days * cd) / ch),
  minutes = Math.round((diff - days * cd - hours * ch) / 60000)
  if(minutes===60){minutes = 0;hours++}
  if(hours === 24){hours = 0;days++}


  if(days>0)return  getPluralTimeFormat('day',days) 
  if(hours>0)return getPluralTimeFormat('hour',hours) 
  return getPluralTimeFormat('minute',minutes)
}

const getPluralTimeFormat = (type,time) => {
  // console.log(type,time)
  const isSingular = (time == 1)
    switch(type){
      case 'day':return `${time} ${isSingular?'day':'days'}`
      case 'hour':return `${time} ${isSingular?'hour':'hours'}`
      case 'minute':return `${time} ${isSingular?'hour':'hours'}`
    }
}

export const getFullDateFormat = (ms) => {
  const date = new Date(ms)  
  return String(date).slice(4,15)
} 


