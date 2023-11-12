export const getCurrentTime = () => {
  let b = new Date(currentTime-a)
}

export const getTimeDifference = (timeOfCreation) => {
  const toc = new Date(timeOfCreation),
  diff = (Date.now() - toc),
  cd = 24*60*60*1000,
  ch = 60*60*1000
  let days = Math.floor(diff / cd),
  hours = Math.floor((diff - days * cd) / ch),
  minutes = Math.round((diff - days * cd - hours * ch) / 60000)

  if(minutes===60){minutes = 0;hours++}
  if(hours === 24){hours = 0;days++}

  if(days>0)return  getTimeFormat('day',days) 
  if(hours>0)return getTimeFormat('hour',hours) 
  return getTimeFormat('minute',minutes)
}

const getTimeFormat = (type,time) => {
  const isSingular = (time == 1)
    switch(type){
      case 'day':return `${time} ${isSingular?'day':'days'}`
      case 'hour':return `${time} ${isSingular?'hour':'hours'}`
      case 'minute':return `${time} ${isSingular?'hour':'hours'}`
    }
}
