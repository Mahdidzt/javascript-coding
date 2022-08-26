function snake_case(obj) {
    return Object.fromEntries
        (
            Object.entries(obj).map(([key, value]) => {
                const newKey = key.replace(/[A-Z]/g, (letter) => '_' + letter.toLowerCase());
                return [newKey, value]
            })
        )
}

function camelCase(obj) {
    return Object.fromEntries
        (
            Object.entries(obj).map(([key, value]) => {
                const newKey = key.replace(/[-_][a-z]/g, (letter) => letter.toUpperCase().replace(/-|_/g, ''))
                return [newKey, value]
            })
        )
}
const obj = {
    fullName: 'Mahdi Rezazadeh',
    birthDate: '1996/12/28'

}
// const snake_case_obj = snake_case(obj);
// console.log('snake_case_obj: ', snake_case_obj);
// const newSample = {
//     'full-name': 'Mahdi Rez',
//     'birth-date': '12313 123123'
// }
// const camelCaseObj = camelCase(newSample);
// console.log('camelCaseObj: ', camelCaseObj);

console.log(mahdi);


var mahdi = function ali() {
    return 'mahdi function'
}