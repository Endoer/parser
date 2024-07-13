const fs = require('fs');

const filter = [
    { key: "speciality", value: "09.04.01 Информатика и вычислительная техника" },
    { key: "compensation", value: "бюджетная основа" },
    { key: "program", value: "Инженерия искусственного интеллекта" }];

function checkValues(elem) {
    for (let i = 0; i < filter.length; i++) {
        if (elem[filter[i].key] !== filter[i].value) {
            return false
        }
    }
    return true
}
const data = JSON.parse(fs.readFileSync('response.json', 'utf8'));
console.log(data[2][0].applications[0]);
const filtredData = [];

data.forEach((elem) => {
    elem.forEach((elem) => {
        elem.applications.forEach((elem) => {
            if (checkValues(elem)) {
                filtredData.push(elem);
            }
        })
    })
})

console.log("Найдено записей: " + filtredData.length);
fs.writeFile('filtredData.json', JSON.stringify(filtredData.sort((a, b) => b.total_mark - a.total_mark), null, 2), (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('JSON data saved to filtredData.json');
    }
});