const billInput = document.getElementById('bill-amount');
const peopleInput = document.getElementById('num-people');
const tipButtons = document.querySelectorAll('.calculator__btn');
const customTipInput = document.getElementById('custom-tip');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetButton = document.querySelector('.calculator__reset-btn');
const errorMessage = document.getElementById('error-message');

let billValue = 0;
let tipValue = 0;
let peopleValue = 1;

// Function to calculate tip and total per person
function calculateTip() {
  if (peopleValue === 0) {
    errorMessage.textContent = "Can't be zero";
    errorMessage.style.display = 'block';
    tipAmountDisplay.value = '$0.00';
    totalAmountDisplay.value = '$0.00';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  let tipAmount = (billValue * tipValue) / peopleValue;
  let totalAmount = (billValue * (1 + tipValue)) / peopleValue;

  tipAmountDisplay.value = `$${tipAmount.toFixed(2)}`;
  totalAmountDisplay.value = `$${totalAmount.toFixed(2)}`;
}

// Event Listeners
billInput.addEventListener('input', (e) => {
  billValue = parseFloat(e.target.value) || 0;
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active class from all buttons first
    tipButtons.forEach((btn) => btn.classList.remove('active'));

    // Add active class to the selected tip button
    e.target.classList.add('active');

    tipValue = parseFloat(e.target.innerText) / 100;
    calculateTip();
  });
});

// Ensure active class is retained after entering number of people
peopleInput.addEventListener('input', (e) => {
  peopleValue = parseInt(e.target.value) || 0;

  // Keep the button with the selected tip percentage active
  tipButtons.forEach((button) => {
    if (parseFloat(button.innerText) / 100 === tipValue) {
      button.classList.add('active');
    }
  });

  calculateTip();
});

customTipInput.addEventListener('input', () => {
  tipValue = parseFloat(customTipInput.value) / 100 || 0;
  calculateTip();
});

resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipAmountDisplay.value = '$0.00';
  totalAmountDisplay.value = '$0.00';
  tipButtons.forEach((btn) => btn.classList.remove('strong-cyan'));
  tipValue = 0;
  billValue = 0;
  peopleValue = 1;
  errorMessage.style.display = 'none';
});

calculateTip(); // Initial calculation
