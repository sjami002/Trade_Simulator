import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import Stock from "./Stock";

class StockDisplayContainer extends Component {
  render() {
    return (
      <div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Market Cap</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Volume (24hr)</Table.HeaderCell>
              <Table.HeaderCell>% Change Daily</Table.HeaderCell>
              <Table.HeaderCell>% Change Weekly</Table.HeaderCell>
              <Table.HeaderCell>Trade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stocks.map(stock => {
              return (
                <Stock
                  stock={stock}
                  key={stock.id}
                  user={this.props.user}
                  handleBuy={this.props.handleBuy}
                  handleBudgetPatch={this.handleBudgetPatch}
                />
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default StockDisplayContainer;

// <Table.Row>
//   <Table.Cell>Microsoft</Table.Cell>
//   <Table.Cell>MSFT</Table.Cell>
//   <Table.Cell textAlign="left">1964.37</Table.Cell>
//   <Table.Cell>50</Table.Cell>
//   <Table.Cell>
//     <Button size="mini">Buy</Button>
//   </Table.Cell>
// </Table.Row>

// <Table celled inverted selectable>
//   <Table.Header>
//     <Table.Row>
//       <Table.HeaderCell>Market Watch</Table.HeaderCell>
//       <Table.HeaderCell> </Table.HeaderCell>
//       <Table.HeaderCell> </Table.HeaderCell>
//       <Table.HeaderCell> </Table.HeaderCell>
//       <Table.HeaderCell> </Table.HeaderCell>
//       <Table.HeaderCell> </Table.HeaderCell>
//     </Table.Row>
//   </Table.Header>
//   <Table.Header>
//     <Table.Row>
//       <Table.HeaderCell>Name</Table.HeaderCell>
//       <Table.HeaderCell>Symbol</Table.HeaderCell>
//       <Table.HeaderCell>Price</Table.HeaderCell>
//       <Table.HeaderCell>Market Cap</Table.HeaderCell>
//       <Table.HeaderCell>Volume</Table.HeaderCell>
//       <Table.HeaderCell>Trade</Table.HeaderCell>
//     </Table.Row>
//   </Table.Header>
//   <Table.Body>
//     {this.props.stocks.map(stock => {
//       return <Stock stock={stock} key={stock.id} />;
//     })}
//   </Table.Body>
// </Table>
