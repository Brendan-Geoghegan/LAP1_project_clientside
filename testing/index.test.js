// const { describe } = require('yargs')
// const changeToLightMode = require('../index')


// describe('testing the front-end', () => {
//     it('changes the screen to light mode', () => {
//         expext()
//     })
// })

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let index;


describe('index.html', () => {
    let body;

    beforeAll(() => {
        document.documentElement.innerHTML = html
        body = document.querySelector('body')
        index = require('../static/js/darkMode');
    })

    describe('switchMode', () => {
        test('it turns on light mode if box is unchecked', () => {
            index.changeToLightMode();
            styleLink = document.getElementById("styleLink");
            expect(styleLink.href).toBe('style_light.css');
        })
    })
})
