import React, { Component } from "react";
import PortfolioDisplay from "./PortfolioDisplay";

import {
  Table,
  Button,
  Modal,
  Image,
  Header,
  Input,
  Label
} from "semantic-ui-react";

class MainContainer extends Component {
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

  render() {
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
              <Table.HeaderCell>Current Holdings</Table.HeaderCell>
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
                Transaction Total: ${sumOfAllTransactions}{" "}
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
              <Table.HeaderCell>Updated at</Table.HeaderCell>
              <Table.HeaderCell>Purchase Price</Table.HeaderCell>
              <Table.HeaderCell>Purchase Quantity</Table.HeaderCell>
              <Table.HeaderCell>Transaction Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.transactions
              .filter(trans => trans.onBuy === true)
              .map(transaction => (
                <PortfolioDisplay
                  key={transaction.id}
                  transaction={transaction}
                  totalVal={this.totalVal}
                />
              ))}
          </Table.Body>
        </Table>

        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Past Holdings</Table.HeaderCell>
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
                Transaction Total: ${sumOfAllTransactions}{" "}
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
              <Table.HeaderCell>Updated at</Table.HeaderCell>
              <Table.HeaderCell>Purchase Price</Table.HeaderCell>
              <Table.HeaderCell>Purchase Quantity</Table.HeaderCell>
              <Table.HeaderCell>Transaction Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.transactions
              .filter(trans => trans.onBuy === false)
              .map(transaction => (
                <PortfolioDisplay
                  key={transaction.id}
                  transaction={transaction}
                  totalVal={this.totalVal}
                />
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default MainContainer;

// {this.props.transactions.map(transaction => (
//   <PortfolioDisplay
//     key={transaction.id}
//     transaction={transaction}
//     totalVal={this.totalVal}
//   />
// ))}

// <h1>{this.props.user.name}'s Portfolio </h1>

// <Table.Row>
//   <Table.Cell>Microsoft</Table.Cell>
//   <Table.Cell>MSFT</Table.Cell>
//   <Table.Cell textAlign="left">1964.37</Table.Cell>
//   <Table.Cell>50</Table.Cell>
//   <Table.Cell>
//     <Button size="mini" onClick={this.show("blurring")}>
//       Sell
//     </Button>
//   </Table.Cell>
// </Table.Row>
