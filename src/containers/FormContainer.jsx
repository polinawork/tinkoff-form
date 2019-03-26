import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';

import Info from '../components/Info';
import Input from '../components/Input';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullPrice: {},
      comission: {},
      numOfLots: '',
      sumOfSale: ''
    };
  }

  setFullPrice = debounce(async() => {
    const { getFullPrice } = this.props;
    const { numOfLots } = this.state;
    const { fullPrice, comission } = await getFullPrice(numOfLots);

    this.setState({
      fullPrice,
      comission
    });
  }, 1000);

  setValue(num, sum) {
    this.setState({
      numOfLots: num,
      sumOfSale: this.sumOutput(sum)
    });
    this.setFullPrice();
  }

  sumOutput(sum) {
    return String(sum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }

  lotsHandler = event => {
    const { pricePerLot } = this.props;
    const valueLots = event.target.value.replace(/\D/g, '');
    const valueSum = (valueLots) ? valueLots * pricePerLot : '';

    this.setValue(valueLots, valueSum);
  };

  sumHandler = event => {
    const { pricePerLot } = this.props;
    const valueSum = event.target.value.replace(/\D/g, '');
    const valueLots = (valueSum) ? Math.floor(valueSum / pricePerLot) : '';

    this.setValue(valueLots, valueSum);
  };

  render() {
    const { totalLots, pricePerLot } = this.props;
    const { numOfLots, sumOfSale, fullPrice, comission } = this.state;

    return (
      <form className="form">
        <div className="form__row">
          <Info
            title="1 лот = 100 акций"
            value={this.sumOutput(pricePerLot)}
            cur="₽"
          />
          <Info
            title="Доступно для продажи"
            value={totalLots}
            cur="лотов"
          />
        </div>
        <div className="form__row">
          <Input
            className="form-input-left"
            label="Количество лотов"
            id="num-of-lots"
            type="text"
            name="lots"
            value={numOfLots}
            handleInput={this.lotsHandler}
          />
          <Input
            className="form-input-right"
            label="Сумма продажи, ₽"
            id="sum-of-sale"
            type="text"
            name="sum"
            value={sumOfSale}
            handleInput={this.sumHandler}
          />
        </div>
        <div className="form__row">
          <div className="form-info">
            <Button value={(fullPrice.value) ? this.sumOutput(fullPrice.value) : ''} />
          </div>
          <div className="form-info">
            <div className="form-info__comission">{(comission.value) ? `Включая комиссию ${comission.value} ₽` : ''}</div>
          </div>
        </div>
      </form>
    );
  }
}

FormContainer.propTypes = {
  pricePerLot: PropTypes.number.isRequired,
  totalLots: PropTypes.number.isRequired,
  getFullPrice: PropTypes.func.isRequired
};

export default FormContainer;
