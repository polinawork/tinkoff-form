const pricePerLot = 100000;
const totalLots = 25;

window.addEventListener('DOMContentLoaded', () => {
  const inputLots = document.querySelector('#num-of-lots');
  const inputSum = document.querySelector('#sum-of-sale');
  const buttonValue = document.querySelector('#full-price');

  function setValue(numOfLots, sumOfSale) {
    inputLots.value = numOfLots;
    inputSum.value = String(sumOfSale).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }

  function lotsHandler(event) {
    const value = (this.value < totalLots) ? this.value : totalLots;

    setValue(value, value * pricePerLot);
  }

  function sumHandler(event) {
    let value = this.value.replace(/\D/g, '');

    if (event.type === 'blur') {
      value = inputLots.value * pricePerLot;
    }
    if (value > totalLots * pricePerLot) {
      value = totalLots * pricePerLot;
    }
    setValue(Math.floor(value / pricePerLot), value);
  }

  function getFullPrice() {
    return Promise.resolve({
      fullPrice: { value: 100000, currency: 'RUB' },
      comission: { value: 100, currency: 'RUB' }
    });
  }

  async function fullPriceHandler() {
    const { fullPrice: { value } } = await getFullPrice();

    buttonValue.innerText = String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }

  inputSum.addEventListener('blur', sumHandler, false);
  inputSum.addEventListener('input', sumHandler, false);
  inputLots.addEventListener('input', lotsHandler, false);

  inputSum.addEventListener('input', fullPriceHandler, false);
  inputLots.addEventListener('input', fullPriceHandler, false);
});
