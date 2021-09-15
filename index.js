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
            console.log(individualTax, 'tax')
            finalTax += individualTax;
        }
    });

    return finalTax
}

var calcIncomeTax = function() {
   return deductions(200000, [0, 12571, 50271, 150001], [0, 0.2, 0.4, 0.45])
}

var calcNationalInsurance = function() {
   return deductions(200000, [0, 9564, 50268], [0, 0.12, 0.02])
}

let totalTax = calcIncomeTax()+calcNationalInsurance();