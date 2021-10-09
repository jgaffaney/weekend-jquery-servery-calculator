$(readyNow);

function readyNow() {

    // render();

    // click listeners
    // $('#addition').on('click', addAddition);
    // $('#subtract').on('click', addSubtract);
    // $('#multily').on('click', addMultily);
    // $('#divide').on('click', adddivide);
    $('#compute').on('click', compute);
}

// a function to send inputs and operator to server for processing
function compute(operator) {
    console.log('equals clicked');
    
    // $.ajax({
    //     method: 'POST',
    //     url: '/compute',
    //     data: {
    //         firstNumber: $('#firstNumberIn').val(),
    //         secondNumber: $('#secondNumberIn').val(),
    //         operator: $
    //     }
    // })
}
