const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

let resultsArray = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("server/public"));

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);    
})

app.post('/calculate', (req, res) => {
    console.log('/calculate POST req.body ', req.body);
    
    
})

function calculate(input) {
    let result = 0;
    switch (input.operator) {
        case '+':
            result = Number(input.firstNumber) + Number(input.secondNumber);
        break;
        case '-':
            result = Number(input.firstNumber) - Number(input.secondNumber);
        break;
        case '*':
            result = Number(input.firstNumber) * Number(input.secondNumber);
        break;
        case '/':
            result = Number(input.firstNumber) / Number(input.secondNumber);
        break;
    }
console.log(result);

} 