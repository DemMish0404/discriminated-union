//! discriminated union 
// нужен чтобы typescript знал наверняка с чем ты работаешь - сам наверняка (на все 100%) знаешь с чем работаешь, не будет ошибок и команде легче читать
// с типами тоже работает но если будет что-то общее , то будет советовать только то что эти общие имеют вместе (то есть объединение)
//? когда использовать когда есть различные типы - просто создаешь подтипы и все чтобы typrscript тебе все подсказывал (методы , ключи и тд)

//* №1 (описать состояние запроса и соответствующие данные присущие каждому типу запроса)


type LoadingLocationState = {
  // state: string // так typescript разницу не поймет если будем сравнивать по этому параметру
  state: 'loading'
}

type SuccessLocationState = {
  // state: number // так typescript разницу не поймет если будем сравнивать по этому параметру
  state: 'success',
  coords : {lat : number , long: number},
}

type ErrorLocationState = {
  state: 'error',
  errors: { message : string}
}


type LocationState = LoadingLocationState | SuccessLocationState | ErrorLocationState // наше состояние запроса может принимать 3 состояния (type allias от состояния загрузки или успеха или провала ) 


function showServersResponseOnUsersLocation(locationState: LocationState): void{
  switch(locationState.state){
    case 'loading': 
      console.log(`статус ${locationState.state}: еще загружается, ответа не было `)
      break;
    
    case "success":
      console.log(`статус ${locationState.state}: запрос был успешен , данные о пользователе получены; широта(lat): ${locationState.coords.lat} , долгота(long): ${locationState.coords.long}`);
      break
    case "error":
      console.log(`запрос провален: была ошибка . сообщение ошибки: ${locationState.errors.message}`)
      break;
  }

}

const tryingToGetDemidsLocation: LocationState = {
  state: 'success',
  coords: {lat: 52 , long: 56}
}
let tryingToGetDemidsLocationIn2030: LocationState = {
  state: 'loading'
}
tryingToGetDemidsLocationIn2030 = {
  state: 'success',
  coords: {lat: 45, long: 73}
}
const tryingToGetMrBeastsLocation: LocationState = {
  state: 'error',
  errors : { message : 'вам не надо следить за этим человеком. он слишком важен для нас, особенно живым и здоровым'}
}

showServersResponseOnUsersLocation(tryingToGetDemidsLocation)
showServersResponseOnUsersLocation(tryingToGetDemidsLocationIn2030)
showServersResponseOnUsersLocation(tryingToGetMrBeastsLocation)


// с типами тоже работает но если будет что-то общее , то будет советовать только то что эти общие имеют вместе (то есть объединение):

type LoadingLocationStateAGAIN = {
  state: string 
  message: 'подождите: идет загрузка, ответа от сервера еще не последовало'
}

type SuccessLocationStateAGAIN = {
  state: number , 
  coords : {lat : number , long: number},
  someCrapKey: boolean
}

type NewLocationStateAGAIN = {
  state: number, 
  somekey: string,
  someCrapKey: boolean
}

type ErrorLocationStateAGAIN = {
  state: boolean,
  errors: { message : string}
}


type LocationStateAGAIN = LoadingLocationStateAGAIN | SuccessLocationStateAGAIN | ErrorLocationStateAGAIN | NewLocationStateAGAIN // наше состояние запроса может принимать 4 состояния (type allias от состояния загрузки или успеха или провала или чего-то нового ) 


function showServersResponseOnUsersLocationAGAIN(locationState: LocationStateAGAIN): void{
  if ( typeof locationState.state === 'string'){
    console.log(locationState.message) // работает . оно подсказывает (it works!)
  } 
  else if (typeof locationState.state === 'number'){
    console.log(locationState.someCrapKey) // работает оно подсказывает, но если будет пересекаться , то будет показывать только общие (у нас есть 2 подтипа у которых ключ state принимает числовое значение и он советует только его и еще одно общее)
  }
  else if (typeof locationState.state === 'boolean')
    console.log(locationState.errors.message) // выводим сообщение если тип у запроса ошибка (ведь только у данного типа ключ state принимает булевые значения)

}

showServersResponseOnUsersLocationAGAIN({state: false, errors: {message: 'ошибка в том что ты родился'}})
showServersResponseOnUsersLocationAGAIN({state: 12312,coords: {lat: 52 , long: 56} , someCrapKey: true})
showServersResponseOnUsersLocationAGAIN({state: 12312, somekey : "some key value" , someCrapKey: true})