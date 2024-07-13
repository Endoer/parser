const axios = require('axios');
const fs = require('fs');

const url = 'https://urfu.ru/api/entrant/?size=100&page=';

const fullData = [];

function tryParse(i) {
    console.log("try parsing  page " + i);
    axios.get(url + i)
        .then(response => {
            const data = response.data;
            fullData.push(data.items);
            console.log("parsed page " + i);
            if (data.items.length) {
                tryParse(i + 1);
            }
            else {
                fs.writeFile('response.json', JSON.stringify(fullData, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing to file', err);
                    } else {
                        console.log('JSON data saved to response.json');
                    }
                });
            }

        })
        .catch(error => {
            console.error('Error fetching data', error);
        });
}

tryParse(1);

