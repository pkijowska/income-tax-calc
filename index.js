const FREQUENCIES = {yearly: 1, quarterly: 4, monthly: 12, fortnightly: 26.09, weekly: 52.18};

function formatThousands(num) {
    var sep = ",";
    var decpoint = ".";
    var nStr = num;

    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

var deductions = function(income, incomeRanges, rates) {
    let finalTax = 0;
    let findCurrentIncome = incomeRanges.filter(i => i < income);
    let findLastElementInIncomeRange = findCurrentIncome.slice(-1)[0];
    let calcHighestTax = (income-findLastElementInIncomeRange) * rates[incomeRanges.indexOf(findLastElementInIncomeRange)];
    finalTax += calcHighestTax;
    findCurrentIncome.reverse().forEach(function(i){
        const indexIncome = incomeRanges.indexOf(i);
        if (indexIncome >0) {
            const individualTax= (i -incomeRanges[indexIncome-1]) * rates[indexIncome-1];
            finalTax += individualTax;
        }
    });

    return finalTax
}

var calcIncomeTax = function(income) {
   return deductions(income, [0, 12570, 50270, 150000], [0, 0.2, 0.4, 0.45])
}

var calcNationalInsurance = function(income) {
   return deductions(income, [0, 9564, 50268], [0, 0.12, 0.02])
}


// function test(income, tax) {
//     console.log(`when income is ${income}, tax is ${tax}`)
//     if (deductions(income, [0, 12570, 50270, 150000], [0, 0.2, 0.4, 0.45]) == tax) {
//         console.log("success");
//     }
//     else {
//         console.log("fail");
    
//     }
// }

// // test(0,0);
// // test(12570,0);
// // test(50270, 7540);
// test(200000, 69931.40)

$(document).ready(function() {
    $('#income').inputmask().keyup(calculateTax);
    $('#income').val(0).trigger('keypress');
});


function calculateTax() {
    $(this).on('keypress', function(e) {
        const ESCAPE_KEY_CODE = 13
        if (e.keyCode == ESCAPE_KEY_CODE) {
            event.preventDefault();
        }
    })

    var income = parseInt($('#income').inputmask('unmaskedvalue')) 

    let totalTax = calcIncomeTax(income) + calcNationalInsurance(income);
    const net = income - totalTax;
    

    var ftax = '£' + (isNaN(Math.round(net)) ? '0' : formatThousands(Math.round(calcIncomeTax(income))));
    var fni = '£' + (isNaN(Math.round(calcNationalInsurance(income))) ? '0' : formatThousands(Math.round(calcNationalInsurance(income))));
    var fnet = '£' + (isNaN(Math.round(net)) ? '0' : formatThousands(Math.round(net)));
    var fnetWeek = '£' + ((isNaN(Math.round(net / FREQUENCIES.weekly))) ? '0' : formatThousands(Math.round(net / FREQUENCIES.weekly)))
    var fnetMonth = '£' + ((isNaN(Math.round(net / FREQUENCIES.monthly))) ? '0' : formatThousands(Math.round(net / FREQUENCIES.monthly)));


    $('#result-tax').html(ftax);
    $('#result-ni').html(fni);
    $('#result-net-income').html(fnet);
    $('#result-net-income-per-week').html(fnetWeek);
    $('#result-net-income-per-month').html(fnetMonth)
}
