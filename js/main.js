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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaXRjJztcclxuXHJcbmxldCBjYWxjTnVtYmVyLCBjYWxjQ29zdCwgY2FsY1NhdmluZztcclxuXHJcbmZ1bmN0aW9uIGdldFJlc3VsdChwYXJlbnQsIHNlbGVjdG9yLCByZXMsIGN1cnJlbnQpIHtcclxuICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50KTtcclxuICAgIGxldCBzbGlkZXIgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dFJhbmdlXCIpO1xyXG4gICAgbGV0IG91dHB1dCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgIGxldCBwcm9ncmVzcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MnKTtcclxuXHJcbiAgICBvdXRwdXQuaW5uZXJIVE1MID0gc2xpZGVyLnZhbHVlO1xyXG5cclxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY3VycmVudCkge1xyXG4gICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MID0gKHRoaXMudmFsdWUrJycpLnJlcGxhY2UoLyhcXGQpKD89KFxcZFxcZFxcZCkrKFteXFxkXXwkKSkvZywgJyQxLCcpICsgXCIg4oKsXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvdXRwdXQuaW5uZXJIVE1MID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v0JTRjyDQtNCw0LvRjNC90LXQudGI0LjRhSDQstGL0YfQuNGB0LvQtdC90LjQuVxyXG4gICAgICAgIHJlcyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS50ZXh0Q29udGVudDsvL9GPINC90LUg0LfQvdCw0Y4g0LrQsNC6INGB0LLRj9C30LDQvdGLINCy0LXRgNC90LjQtSByYW5nZSDRgSDQstGL0YfQuNGB0LvQtdC90LjRj9C80Lgg0LIg0LrQsNC70YzQutGD0LvRj9GC0L7RgNC1XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMjc5KSB7XHJcbiAgICAgICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24oZSkgey8vbW91c2Vtb3ZlXHJcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLndpZHRoID0gZS5vZmZzZXRYICsgXCJweFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZnVuY3Rpb24oZSkgey8vbW91c2Vtb3ZlXHJcbiAgICAgICAgICAgIHByb2dyZXNzLnN0eWxlLndpZHRoID0gZS5vZmZzZXRYICsgXCJweFwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZ2V0UmVzdWx0KFwiLnJhbmdlX19udW1iZXJcIiwgXCIucmVzdWx0TnVtYmVyXCIsIGNhbGNOdW1iZXIsIGZhbHNlKTtcclxuZ2V0UmVzdWx0KFwiLnJhbmdlX19jb3N0XCIsIFwiLnJlc3VsdENvc3RcIiwgY2FsY0Nvc3QsIHRydWUpO1xyXG5nZXRSZXN1bHQoXCIucmFuZ2VfX3NhdmluZ1wiLCBcIi5yZXN1bHRTYXZpbmdcIiwgY2FsY1NhdmluZywgZmFsc2UpO1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdENvc3QnKS50ZXh0Q29udGVudCArPSBcIiDigqxcIjtcclxuXHJcbmxldCBjYWxjdWxhdG9ySW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbGN1bGF0b3JfX2lucHV0JyksXHJcbiAgICBpbnB1dFJvaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRfX3JvaScpLFxyXG4gICAgaW1wbGVtZW50YXRpb24gPSBjYWxjdWxhdG9ySW5wdXRzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpbXBsZW1lbnRhdGlvblwiXScpLFxyXG4gICAgbW9udGhseSA9IGNhbGN1bGF0b3JJbnB1dHMucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm1vbnRobHlcIl0nKSxcclxuICAgIHJvaSA9IGNhbGN1bGF0b3JJbnB1dHMucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInJvaVwiXScpO1xyXG5cclxuaWYgKGltcGxlbWVudGF0aW9uLnZhbHVlICYmIG1vbnRobHkudmFsdWUpIHtcclxuICAgIHJvaS52YWx1ZSA9IGltcGxlbWVudGF0aW9uLnZhbHVlIC8gbW9udGhseS52YWx1ZTtcclxufVxyXG5cclxuaW5wdXRSb2lzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGl0ZW0ub25pbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGl0ZW0udmFsdWUgPSAoaXRlbS52YWx1ZSsnJykucmVwbGFjZSgvXFxEL2csICcnKS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyhbXlxcZF18JCkpL2csICckMSwnKSArIFwiIOKCrFwiO1xyXG4gICAgICAgIGlmIChpbXBsZW1lbnRhdGlvbi52YWx1ZSAmJiBtb250aGx5LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJvaS52YWx1ZSA9IChpbXBsZW1lbnRhdGlvbi52YWx1ZS5yZXBsYWNlKC9cXEQrL2csXCJcIikgLyBtb250aGx5LnZhbHVlLnJlcGxhY2UoL1xcRCsvZyxcIlwiKSkudG9GaXhlZCgyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=
