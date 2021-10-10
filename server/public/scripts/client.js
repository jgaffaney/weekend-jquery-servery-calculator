$(readyNow);

function readyNow() {

    // render();

    // click listeners
    $('#addition').on('click', addAddition);
    $('#subtract').on('click', addSubtract);
    $('#multiply').on('click', addMultiply);
    $('#divide').on('click', addDivide);
    $('#compute').on('click', calculateClient);

    // click listener with function to empty inputs
    $('#clearButton').on('click', function() {
        $('#inputs').children('input').val('');
    })
}
let op = '';

// a function to add addition attribute to equals
function addAddition() {
    console.log('add clicked');
    op='+';
}

function addSubtract() {
    console.log('subtract clicked');
    op = '-';
}

function addMultiply() {
    console.log('multiply clicked');
    op = '*';
}
function addDivide() {
    console.log('Divide clicked');
    op = '/';
}

function render() {
    $.ajax({
        method: 'GET', 
        url: '/results'
    }).then(function(response) {
        console.log(('/get response ', response));
        
        // empty the DOM history table
        $('#history').empty();
        for(let calc of response) {
            $('#history').append(`
                <tr>
                    <td>${calc.firstNumber}</td>
                    <td>${calc.operator}</td>
                    <td>${calc.secondNumber}</td>
                    <td>=</td>
                    <td>${calc.result}</td>
            `)
        }
    })
}
// a function to send inputs and operator to server for processing
function calculateClient() {
    console.log(op);
    
    
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            firstNumber: $('#firstNumberIn').val(),
            secondNumber: $('#secondNumberIn').val(),
            operator: op
        }
    }).then(function(response) {
        console.log('/POST response ', response);
        render();
        $('#inputs').children('input').val('');
        
    })
}
