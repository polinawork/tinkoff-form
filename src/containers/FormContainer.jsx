import React, { Component } from 'react';

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

    this.state.buttonValue = this.sumOutput(value);
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

  lotsHandler(event) {
    let value = event.target.value.replace(/\D/g, '');

    if (value > this.props.totalLots) {
      value = this.props.totalLots;
    }
    this.setValue(value, value * this.props.pricePerLot);
  }

  sumHandler(event) {
    let value = event.target.value.replace(/\D/g, '');

    if (event.type === 'blur') {
      value = this.state.numOfLots * this.props.pricePerLot;
    }
    if (value > this.props.totalLots * this.props.pricePerLot) {
      value = this.props.totalLots * this.props.pricePerLot;
    }
    this.setValue(Math.floor(value / this.props.pricePerLot), value);
  }

  render() {
    return (
      <form className="form">
        <div className="form__row">
          <div className="form-info">
            <div className="form-info__title">1 лот = 100 акций</div>
            <div className="form-info__value">{this.sumOutput(this.props.pricePerLot)} ₽</div>
          </div>
          <div className="form-info">
            <div className="form-info__title">Доступно для продажи</div>
            <div className="form-info__value">{this.props.totalLots} лотов</div>
          </div>
        </div>
        <div className="form__row">
          <Input
            className="form-input-left"
            label="Количество лотов"
            id="num-of-lots"
            type="text"
            name="lots"
            value={this.state.numOfLots}
            handleInput={this.lotsHandler.bind(this)}
          />
          <Input
            className="form-input-right"
            label="Сумма продажии, ₽"
            id="sum-of-sale"
            type="text"
            name="sum"
            value={this.state.sumOfSale}
            handleInput={this.sumHandler.bind(this)}
          />
        </div>
        <div className="form__row">
          <Button value={this.state.buttonValue} />
          <div className="form-info">
            <div className="form-info__comission">Включая комиссию <span id="comission">45</span> ₽</div>
          </div>
        </div>
      </form>
    );
  }
}

export default FormContainer;
