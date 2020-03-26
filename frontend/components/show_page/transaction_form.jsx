import React from 'react';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker,
                quantity: 0,
                cost:  0,
                buySell: 'BUY',
                buying_power: this.props.buying_power
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            let holding = {
                user_id: this.props.currentUser.id,
                ticker: this.props.ticker
            }
        }
    }

    componentDidMount() {
        let holding = {
            user_id: this.props.currentUser.id,
            ticker: this.props.ticker
        }
        this.props.getHolding(holding)
        this.props.getUserBP(this.props.currentUser.id)
    }

    handleClick(value) {
        this.setState({ buySell: value });
    }

    update(field) {
        return e => {
            this.setState({
                [field]: parseInt(e.currentTarget.value),
                cost: parseInt(e.currentTarget.value) * this.props.price[this.props.ticker].price,
            });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const holding = Object.assign({}, this.state);
        if (this.state.buySell === 'BUY') {
            holding['buying_power'] = this.props.cash - this.state.cost;
            this.props.receiveHolding(holding);
            this.props.updateUser(holding);
        } else {
            holding['buying_power'] = this.props.cash + this.state.cost;
            holding.quantity = holding.quantity * (-1)
            this.props.receiveHolding(holding);
            this.props.updateUser(holding);
        }
    }

    render() {
        // console.log(this.props.holdings)
        if (this.props.cash.length === 0) return null;
        if (this.props.price[this.props.ticker] === undefined) return null;

        let bottomMessage = '';
        if(this.state.buySell === 'BUY') {
            bottomMessage = `Buying Power: $${this.props.cash.toFixed(2)}`;
        } else {
            let symbol = this.props.ticker;
            if(this.props.holdings[symbol] === undefined) {
                bottomMessage = '0 Shares Available';
            } else {
                bottomMessage = `${this.props.holdings[symbol].quantity} shares available`;
            }
        }
        
        return (
            <form className="transaction-form-wrapper" onSubmit={this.handleSubmit}>
                <div className="buy-sell-button-wrapper">
                    <p onClick={() => this.handleClick('BUY')}>Buy {`${this.props.ticker}`}</p>
                    <p onClick={() => this.handleClick('SELL')}>Sell {`${this.props.ticker}`}</p>
                </div>
                <div className="share-quantity-wrapper">
                    <label>Shares</label>
                    <input
                        type="number"
                        className="share-quantity-input"
                        value={this.state.quantity}
                        onChange={this.update('quantity')}
                        placeholder="quantity"
                    />
                </div>
                <div className="transaction-price">
                    <p>Market Price: ${`${this.props.price[this.props.ticker].price}`}</p>
                    <p>Estimated Cost: ${`${this.state.cost.toFixed(2)}`}</p>
                </div>
                <div className="transaction-submit-info">
                    <p>
                        {this.props.errors}
                    </p>
                    <input type="submit" value={this.state.buySell} className="buy-sell-submit"/>
                    <p className="buying-power-label">
                        {bottomMessage}
                    </p>
                </div>
            </form>
        )
    }
}

export default TransactionForm;
