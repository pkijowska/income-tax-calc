const FREQUENCIES = { yearly: 1, quarterly: 4, monthly: 12, fortnightly: 26.09, weekly: 52.18 };

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


function calc(income, incomeRanges, deductions) {

    let tax = 0;

    for (let i = 0; i < incomeRanges.length; i++) {
        if (income < incomeRanges[i]) {
            continue;
        }

        tax += (income - incomeRanges[i]) * deductions[i];

        income = incomeRanges[i];
    }
    return tax
}


var calcIncomeTax = function (income) {
    return calc(income, [150001, 50271, 12571, 0], [0.45, 0.4, 0.2, 0])
}

var calcNationalInsurance = function (income) {
    return calc(income, [50269, 9564, 0], [0.02, 0.12, 0])
}

$(document).ready(function () {
    $('#income').inputmask().keyup(calculateTax);
    $('#income').val(0).trigger('keypress');
});


function calculateTax() {
    $(this).on('keypress', function (e) {
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
