
//when income 0 
// tax is 0

//when income 12,570
//tax is 0

function calcTax(income) {
    return 0;
}

function test(income, tax) {
    console.log(`when income is ${income}, tax is ${tax}`)
    if (calcTax(income) == tax) {
        console.log("success");
    }
    else {
        console.log("fail");
        console.log(calcTax(income))
    }
}

// test(0,0);
// test(12570,0);
// test(50270, 7540);
// test(200000, 69931.40)


var deductions = function(income, incomeRanges, rates) {
    let finalTax = 0;
    var findCurrentIncome = incomeRanges.filter(i => i < income);
    var calcHighestTax = (income-findCurrentIncome[findCurrentIncome.length-1]) * rates[incomeRanges.indexOf(findCurrentIncome[findCurrentIncome.length-1])];
    finalTax += calcHighestTax;
    findCurrentIncome.reverse().forEach(function(i){
        var indexIncome = incomeRanges.indexOf(i);
        if (indexIncome >0) {
            var individualTax=  (i -incomeRanges[indexIncome-1]) * rates[indexIncome-1];
            finalTax += individualTax;
        }
    });

    return finalTax
}
// tax(190000)

var calcIncomeTax = function() {
   return deductions(50270, [0, 12570, 50270, 150000], [0, 0.2, 0.4, 0.45])
}

var calcNationalInsurance = function() {
   return deductions(50270, [0, 9564, 50268], [0, 0.12, 0.02])
}

let totalTax = calcIncomeTax()+calcNationalInsurance();
console.log(calcIncomeTax())