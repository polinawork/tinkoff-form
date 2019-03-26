import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Info from '../components/Info';
import Input from '../components/Input';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonValue: '100 000',
      numOfLots: 1,
      sumOfSale: '100 000'
    };
  }

  async setFullPrice() {
    const { fullPrice: { value } } = await this.props.getFullPrice();

    this.setState({
      buttonValue: this.sumOutput(value)
    });
  }

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
    const { totalLots, pricePerLot } = this.props;
    let value = event.target.value.replace(/\D/g, '');

    if (value > totalLots) {
      value = totalLots;
    }
    this.setValue(value, value * pricePerLot);
  };

  sumHandler = event => {
    const { totalLots, pricePerLot } = this.props;
    const { numOfLots } = this.state;
    let value = event.target.value.replace(/\D/g, '');

    if (event.type === 'blur') {
      value = numOfLots * pricePerLot;
    }
    if (value > totalLots * pricePerLot) {
      value = totalLots * pricePerLot;
    }
    this.setValue(Math.floor(value / pricePerLot), value);
  };

  render() {
    const { totalLots, pricePerLot } = this.props;
    const { numOfLots, buttonValue, sumOfSale } = this.state;

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
            label="Сумма продажии, ₽"
            id="sum-of-sale"
            type="text"
            name="sum"
            value={sumOfSale}
            handleInput={this.sumHandler}
          />
        </div>
        <div className="form__row">
          <div className="form-info">
            <Button value={buttonValue} />
          </div>
          <div className="form-info">
            <div className="form-info__comission">Включая комиссию <span id="comission">45</span> ₽</div>
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
