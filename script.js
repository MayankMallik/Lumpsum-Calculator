// 1. Formatting for the input fields as you type
function formatNumber(input) {
    let value = input.value.replace(/,/g, '');
    value = value.replace(/[^0-9.]/g, ''); 
    
    if (value.length > 3) {
        let parts = value.split('.');
        let integer = parts[0];
        let decimal = parts.length > 1 ? '.' + parts[1] : '';
        
        let lastThree = integer.slice(-3);
        let otherNumbers = integer.slice(0, -3);
        
        if (otherNumbers) {
            otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
            integer = otherNumbers + "," + lastThree;
        }
        value = integer + decimal;
    }
    input.value = value;
}

// Attach formatting to all inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() { formatNumber(this); });
});

// 2. The original Calculation Logic
function calculateLumpsum() {
    // Helper to get raw number
    const getVal = id => parseFloat(document.getElementById(id).value.replace(/,/g, '')) || 0;

    const p = getVal('principal');
    const r = getVal('rate') / 100;
    const n = getVal('years');

    if (p <= 0 || r <= 0 || n <= 0) {
        alert("Please enter valid numbers");
        return;
    }

    // Formula: A = P(1 + r)^n
    const totalValue = p * Math.pow((1 + r), n);
    const estReturns = totalValue - p;

    // 3. Output with Indian Commas
    const formatIndian = num => {
        let integer = Math.round(num).toString();
        if (integer.length > 3) {
            let lastThree = integer.slice(-3);
            let otherNumbers = integer.slice(0, -3);
            otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
            integer = otherNumbers + "," + lastThree;
        }
        return integer;
    };

    document.getElementById('display-principal').innerText = "₹" + formatIndian(p);
    document.getElementById('display-profit').innerText = "₹" + formatIndian(estReturns);
    document.getElementById('display-total').innerText = "₹" + formatIndian(totalValue);

    document.getElementById('result-section').style.display = 'block';
}