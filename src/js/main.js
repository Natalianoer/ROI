'use stritc';

let calcNumber, calcCost, calcSaving;

function getResult(parent, selector, res, current) {
    parent = document.querySelector(parent);
    let slider = parent.querySelector(".inputRange");
    let output = parent.querySelector(selector);
    let progress = parent.querySelector('.progress');

    output.innerHTML = slider.value;

    slider.addEventListener('input', function () {
        if (current) {
            output.innerHTML = (this.value+'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,') + " €";
        }
        else {
            output.innerHTML = this.value;
        }

        //Дя дальнейших вычислений
        res = parent.querySelector(selector).textContent;//я не знаю как связаны верние range с вычислениями в калькуляторе
    });

    if (window.innerWidth < 1279) {
        slider.addEventListener("touchmove", function(e) {//mousemove
            progress.style.width = e.offsetX + "px";
        });
    } else {
        slider.addEventListener("mouseup", function(e) {//mousemove
            progress.style.width = e.offsetX + "px";
        });
    }

}

getResult(".range__number", ".resultNumber", calcNumber, false);
getResult(".range__cost", ".resultCost", calcCost, true);
getResult(".range__saving", ".resultSaving", calcSaving, false);

document.querySelector('.resultCost').textContent += " €";

let calculatorInputs = document.querySelector('.calculator__input'),
    inputRois = document.querySelectorAll('.input__roi'),
    implementation = calculatorInputs.querySelector('input[name="implementation"]'),
    monthly = calculatorInputs.querySelector('input[name="monthly"]'),
    roi = calculatorInputs.querySelector('input[name="roi"]');

if (implementation.value && monthly.value) {
    roi.value = implementation.value / monthly.value;
}

inputRois.forEach((item) => {
    item.oninput = function() {
        item.value = (item.value+'').replace(/\D/g, '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1,') + " €";
        if (implementation.value && monthly.value) {
            roi.value = (implementation.value.replace(/\D+/g,"") / monthly.value.replace(/\D+/g,"")).toFixed(2);
        }

    };
});
