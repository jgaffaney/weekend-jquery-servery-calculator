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

    // click listener with function to empty inputs
    $('#clearButton').on('click', function() {
        $('#inputs').children('input').val('');
    })

    render();
}

// a function to record the operator
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
            $('#inputs').children('input').val(''); 
        })    
    }
}

// a function to delete all history on the server
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/clear-history'
    }).then(render())
    }

