const display = document.getElementById("display");
const historyList = document.getElementById("history");

function appendValue(val) {
  // For functions, auto-close parenthesis if previous char is ) or number
  if (val.endsWith('(') && (display.value.slice(-1).match(/[0-9)]/))) {
    display.value += '*' + val;
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let expr = display.value;
  try {
    // Replace % with /100 for percentage
    expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    // Replace ^ with ** for exponentiation
    expr = expr.replace(/(\d+(?:\.\d+)?)(\^)(\d+(?:\.\d+)?)/g, '($1**$3)');
    // Replace π with Math.PI
    expr = expr.replace(/π/g, 'Math.PI');
    // Replace e^x with Math.exp(x)
    expr = expr.replace(/e\^([\d.]+)/g, 'Math.exp($1)');
    // Evaluate
    let result = eval(expr);
    if (typeof result === 'number' && !isFinite(result)) throw new Error('Math Error');
    historyList.innerHTML = `<li>${display.value} = ${result}</li>` + historyList.innerHTML;
    display.value = result;
  } catch (e) {
    alert("Invalid Expression");
  }
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Save theme preference
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('calc-theme', 'dark');
  } else {
    localStorage.setItem('calc-theme', 'light');
  }
});

// Load theme preference
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('calc-theme') === 'dark') {
    document.body.classList.add('dark');
  }
});