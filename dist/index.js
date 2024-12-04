"use strict";
function showServersResponseOnUsersLocation(locationState) {
    switch (locationState.state) {
        case 'loading':
            console.log(`статус ${locationState.state}: еще загружается, ответа не было `);
            break;
        case "success":
            console.log(`статус ${locationState.state}: запрос был успешен , данные о пользователе получены; широта(lat): ${locationState.coords.lat} , долгота(long): ${locationState.coords.long}`);
            break;
        case "error":
            console.log(`запрос провален: была ошибка . сообщение ошибки: ${locationState.errors.message}`);
            break;
    }
}
const tryingToGetDemidsLocation = {
    state: 'success',
    coords: { lat: 52, long: 56 }
};
let tryingToGetDemidsLocationIn2030 = {
    state: 'loading'
};
tryingToGetDemidsLocationIn2030 = {
    state: 'success',
    coords: { lat: 45, long: 73 }
};
const tryingToGetMrBeastsLocation = {
    state: 'error',
    errors: { message: 'вам не надо следить за этим человеком. он слишком важен для нас, особенно живым и здоровым' }
};
showServersResponseOnUsersLocation(tryingToGetDemidsLocation);
showServersResponseOnUsersLocation(tryingToGetDemidsLocationIn2030);
showServersResponseOnUsersLocation(tryingToGetMrBeastsLocation);
function showServersResponseOnUsersLocationAGAIN(locationState) {
    if (typeof locationState.state === 'string') {
        console.log(locationState.message);
    }
    else if (typeof locationState.state === 'number') {
        console.log(locationState.someCrapKey);
    }
    else if (typeof locationState.state === 'boolean')
        console.log(locationState.errors.message);
}
showServersResponseOnUsersLocationAGAIN({ state: false, errors: { message: 'ошибка в том что ты родился' } });
showServersResponseOnUsersLocationAGAIN({ state: 12312, coords: { lat: 52, long: 56 }, someCrapKey: true });
showServersResponseOnUsersLocationAGAIN({ state: 12312, somekey: "some key value", someCrapKey: true });
//# sourceMappingURL=index.js.map