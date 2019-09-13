import React, { Component } from "react";
import ConsolidatedPortfolio from "./ConsolidatedPortfolio";

import {
  Table,
  Button,
  Modal,
  Image,
  Header,
  Input,
  Label
} from "semantic-ui-react";

class NewsContainer extends Component {
  balanceFor = stockId => {
    return this.props.transactions
      .filter(trans => trans.stock_id === stockId)
      .map(trans => trans.quantity)
      .reduce((a, b) => a + b, 0);
  };

  portfolio = () => {
    return this.props.stocks.map(stock => ({
      ...stock,
      balance: this.balanceFor(stock.id)
    }));
  };

  arrayOfAllTransactions = () => {
    return this.props.transactions.map(
      tran => tran.quantity * tran.purchase_price
    );
  };

  arrayOfPortfolioValue = () => {
    return this.props.transactions.map(
      tran => tran.quantity * tran.stock.price
    );
  };

  findDuplicates = data => {
    let result = [];

    data.forEach(function(element, index) {
      // Find if there is a duplicate or not
      if (data.indexOf(element, index + 1) > -1) {
        // Find if the element is already in the result array or not
        if (result.indexOf(element) === -1) {
          result.push(element);
        }
      }
    });

    return result;
  };

  render() {
    let port = this.portfolio();

    let sumOfAllTransactions = this.arrayOfAllTransactions().reduce(
      (a, b) => a + b,
      0
    );

    let sumOfPortfolioValue = this.arrayOfPortfolioValue().reduce(
      (a, b) => a + b,
      0
    );

    console.log(sumOfAllTransactions);
    console.log(sumOfPortfolioValue);

    return (
      <div>
        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {this.props.user.name}'s Portfolio'
              </Table.HeaderCell>
              <Table.HeaderCell>
                Wallet: $
                {this.props.user.budget
                  .toFixed(2)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}{" "}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Portfolio Value:$
                {sumOfPortfolioValue
                  .toFixed(2)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Transaction Total:$
                {sumOfAllTransactions
                  .toFixed(2)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                Wallet Value(if any transactions): {this.props.budget}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Market Price</Table.HeaderCell>

              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Transaction Value</Table.HeaderCell>
              <Table.HeaderCell>Trade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {port
              .filter(trans => trans.balance > 0)
              .map(transaction => (
                <ConsolidatedPortfolio
                  key={transaction.id}
                  transaction={transaction}
                  user={this.props.user}
                />
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default NewsContainer;

// this.props.transactions
//   .filter(trans => trans.stock.name === "XRP")
//   .map(trans => trans.quantity)
//   .reduce((a, b) => a + b, 0);
