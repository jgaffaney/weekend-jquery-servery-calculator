$(readyNow);

function readyNow() {
    //declare global variables
    let op = '';

    // click listeners
    $('#addition').on('click', addAddition);
    $('#subtract').on('click', addSubtract);
    $('#multiply').on('click', addMultiply);
    $('#divide').on('click', addDivide);
    $('#compute').on('click', calculateClient);
    $('#clearHistoryButton').on('click', clearHistory)
    $('#clearButton').on('click', clearInputs)
    $('#firstNumberIn').on('click', clearInputs);
    $('.calculatorButtons').on('click', function() {
        console.log(this.data);
        
    })

    render();
}
// a function to clear inputs
function clearInputs() {
    $('#inputs').children('input').val('');
    $('#resultDisplay').text('')
}

// a function to record the operator
function addAddition(event) {
    event.preventDefault();
    $('#secondNumberIn').focus();
    console.log('add clicked');
    op='+';
}

function addSubtract(event) {
    event.preventDefault();
    $('#secondNumberIn').focus();
    console.log('subtract clicked');
    op = '-';
}

function addMultiply(event) {
    event.preventDefault();
    $('#secondNumberIn').focus();
console.log('multiply clicked');
    op = '*';
}
function addDivide(event) {
    event.preventDefault();
    $('#secondNumberIn').focus();
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
                    <td class="calcResult">${calc.result}</td>
            `)
            $('#resultDisplay').text(calc.result)
        }
    })
    // reset op to empty string for verification of inputs
    op = '';
}
// a function to send inputs and operator to server for processing
function calculateClient() {
    // console.log(op);
    if($('#firstNumberIn').val() === '' || $('#secondNumberIn').val() === '' || op === '') {
        alert('Must fill out all values including a mathematical operator!')
    } else {
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
            // $('#inputs').children('input').val(''); 
        }).catch(function(response) {
            console.log('POST failed response ', response);
            
        })    
    }
}

// a function to delete all history on the server
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/clear-history',
        success: function(response) {
            render();
                }
        }
    )}