import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <FormContainer
        pricePerLot={10000}
        totalLots={25}
        getFullPrice={() => Promise.resolve({
          fullPrice: { value: 100000, currency: 'RUB' },
          comission: { value: 100, currency: 'RUB' }
        })}
      />
    );
  }
}

export default App;
