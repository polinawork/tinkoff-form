import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';

function delay(ms) {
    return new Promise(res => {
        setTimeout(res, ms);
    });
}

function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class App extends Component {
    render() {
        return (
            <FormContainer
                pricePerLot={100123}
                totalLots={12}
                getFullPrice={lots =>
                    delay(rnd(1000, 2000)).then(() => ({
                        fullPrice: { value: lots * rnd(100000, 101000), currency: "RUB" },
                        comission: { value: 100, currency: "RUB" }
                    }))
                }
            />
        );
    }
}

export default App;
