const inputEl = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
let resultPEls = document.getElementsByClassName("result-p")
resultPEls = Array.from(resultPEls);
const inputErrMsgEl = document.getElementById("inputErrMsg");

const CONVERSION_FACTORS = {
    meterToFeet : 3.2808399,
    literToGallon : 0.26417205,
    kilogramToPound : 2.20462262
}

const UNITS = {
    length : {
        unit1 : "meters",
        unit2 : "feet",
        conversionFactor : CONVERSION_FACTORS.meterToFeet,
        unit1To2 : 0,
        unit2To1 : 0
    },
    volume : {
        unit1 : "liters",
        unit2 : "gallons",
        conversionFactor : CONVERSION_FACTORS.literToGallon,
        unit1To2 : 0,
        unit2To1 : 0
    },
    mass : {
        unit1 : "kilos",
        unit2 : "pounds",
        conversionFactor : CONVERSION_FACTORS.kilogramToPound,
        unit1To2 : 0,
        unit2To1 : 0
    }
}


convertBtn.addEventListener("click" , ()=>{
    let value = validateNumberInput(inputEl);
    
    Object.values(UNITS).forEach((values) => {
        let result = convert(value,values.conversionFactor);
        values.unit1To2 = result.mByFactor;
        values.unit2To1 = result.mBy1dFactor;
    });

   resultPEls.forEach((pEl)=>{
        pEl.textContent = getResultString(UNITS[pEl.id],value);
   })

})

function validateNumberInput(input){
    let value = Number(input.value);
    if(isNaN(value)){
        value = 0;
        inputErrMsgEl.textContent = "⚠️Please enter a valid number";
    }else if(value < 0){
        value = 0;
        inputErrMsgEl.textContent = "⚠️The entered number can't be negative";
    }else if( value > 1e9 ){
        value = 1e9;
        inputErrMsgEl.textContent = "⚠️Sorry, can't handle a number greater than a billion";
    }else{
        inputErrMsgEl.textContent = "";
    }

    input.value = value;

    return value;
}

function convert(value , factor){
    return {
        mByFactor : (value*factor).toFixed(3),
        mBy1dFactor : (value/factor).toFixed(3)
    }
}


function getResultString(unitResulted,value){
    return `${value} ${unitResulted.unit1} = ${unitResulted.unit1To2} ${unitResulted.unit2} | ${value} ${unitResulted.unit2} = ${unitResulted.unit2To1} ${unitResulted.unit1}`
}