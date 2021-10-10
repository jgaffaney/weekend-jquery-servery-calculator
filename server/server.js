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
    // convert inputs to numbers
    let firstNumber = Number(req.body.firstNumber);
    let secondNumber = Number(req.body.secondNumber);
    //create new object with numbers as values
    let result = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: req.body.operator
    }
    calculate(result);
    
    res.sendStatus(201); 
})

function calculate(input) {
    switch (input.operator) {
        // add key value of result and calculation to the object based on operator
        case '+':
            input.result = input.firstNumber + input.secondNumber;
        break;
        case '-':
            input.result = input.firstNumber - input.secondNumber;
        break;
        case '*':
            input.result = input.firstNumber * input.secondNumber;
            
        break;
        case '/':
            input.result = input.firstNumber / input.secondNumber;
        break;
    }
    // push the object to the results array
    resultsArray.push(input)
}

