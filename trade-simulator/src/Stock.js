import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  Image,
  Header,
  Input,
  Label,
  Form,
  Message
} from "semantic-ui-react";

class Stock extends Component {
  state = {
    success: false,
    open: false,
    user_id: this.props.user.id,
    stock_id: this.props.stock.id,
    onBuy: false,
    quantity: 0,
    purchase_price: this.props.stock.price,
    dollarAmnt: 0,
    budget: this.props.user.budget
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleChange = event => {
    console.log(this.state.quantity);
    if (event.target.name === "quantity") {
      this.setState({
        quantity: event.target.value,
        dollarAmnt: this.props.stock.price * event.target.value,
        budget:
          this.props.user.budget - this.props.stock.price * event.target.value
      });
    } else if (event.target.name === "dollarAmnt") {
      this.setState({
        dollarAmnt: event.target.value,
        quantity: event.target.value / this.props.stock.price,
        budget: this.props.user.budget - event.target.value
      });
    }
  };

  handleSubmit = (event, obj) => {
    event.preventDefault();
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        stock_id: this.state.stock_id,
        onBuy: true,
        quantity: this.state.quantity,
        purchase_price: this.state.purchase_price
      })
    })
      .then(res => res.json())
      .then(data => this.props.handleBuy(data));

    fetch("http://localhost:3000/users/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        budget: this.state.budget
      })
    })
      .then(res => res.json())
      .then(data => this.props.handleBudgetPatch(data));

    this.setState({
      success: true
    });
  };

  render() {
    // console.log("hello", this.state);
    const { open, dimmer } = this.state;
    return (
      <>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              <p style={{ color: "teal" }}>
                {this.props.user.name}' Wallet: ${this.state.budget}
              </p>
              <Header size="tiny">
                Buy by Dollar Amount |{" "}
                <span style={{ color: "maroon" }}>
                  {this.props.stock.name}: ${this.props.stock.price}
                </span>
              </Header>

              <Form>
                <Form.Field inline>
                  <Input
                    onChange={this.handleChange}
                    name="dollarAmnt"
                    labelPosition="right"
                    type="number"
                    placeholder={this.state.dollarAmnt}
                  >
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                  <p style={{ color: "teal" }}>
                    Total Quantity: {this.state.quantity}
                  </p>
                </Form.Field>
                <Header size="tiny" style={{ color: "maroon" }}>
                  OR
                </Header>
                <Header size="tiny">Buy by Quantity</Header>
                <Form.Field inline>
                  <Input
                    onChange={this.handleChange}
                    placeholder={this.state.quantity}
                    type="number"
                    name="quantity"
                  />
                  <p style={{ color: "teal" }}>
                    Total Price: ${this.props.stock.price * this.state.quantity}
                  </p>
                </Form.Field>
              </Form>

              {this.state.success ? (
                <Message info>
                  <p>
                    Purchase Successful.{" "}
                    <span
                      style={{ color: "salmon", cursor: "pointer" }}
                      onClick={this.close}
                    >
                      Click Here
                    </span>{" "}
                    to Exit
                  </p>
                </Message>
              ) : null}
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              primary
              icon="checkmark"
              labelPosition="right"
              content="Execute Trade"
              onClick={event => this.handleSubmit(event, this.state)}
            />
            <Button
              negative
              icon="close"
              labelPosition="right"
              content="Exit"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>

        <Table.Row>
          <Table.Cell>{this.props.stock.id}</Table.Cell>
          <Table.Cell>{this.props.stock.symbol}</Table.Cell>
          <Table.Cell>{this.props.stock.name}</Table.Cell>
          <Table.Cell>{this.props.stock.market_cap}</Table.Cell>
          <Table.Cell>${this.props.stock.price.toFixed(4)}</Table.Cell>
          <Table.Cell>{this.props.stock.volume}</Table.Cell>
          {this.props.stock.change_24hr.toString().includes("-") ? (
            <Table.Cell style={{ color: "#cc0000" }}>
              {this.props.stock.change_24hr}%
            </Table.Cell>
          ) : (
            <Table.Cell style={{ color: "#198686" }}>
              {this.props.stock.change_24hr}%
            </Table.Cell>
          )}
          {this.props.stock.change_7d.toString().includes("-") ? (
            <Table.Cell style={{ color: "#cc0000" }}>
              {this.props.stock.change_7d}%
            </Table.Cell>
          ) : (
            <Table.Cell style={{ color: "#198686" }}>
              {this.props.stock.change_7d}%
            </Table.Cell>
          )}
          <Table.Cell>
            <Button size="mini" onClick={this.show("blurring")}>
              Buy
            </Button>
          </Table.Cell>
        </Table.Row>
      </>
    );
  }
}

export default Stock;

// <Button floated="right" content={this.state.budget} />

// <Button size="tiny">Execute</Button>

// <p>
//   {this.props.stock.name}: ${this.props.stock.price}
// </p>

// <Table.Row>
//   <Table.Cell>{this.props.stock.name}</Table.Cell>
//   <Table.Cell>{this.props.stock.symbol}</Table.Cell>
//   <Table.Cell textAlign="left">{this.props.stock.price}</Table.Cell>
//   <Table.Cell>{this.props.stock.market_cap}</Table.Cell>
//   <Table.Cell>{this.props.stock.volume}</Table.Cell>
//   <Table.Cell>
//     <Button size="mini">Buy</Button>
//   </Table.Cell>
// </Table.Row>

// <Table.Row>
//   <Table.HeaderCell>Name</Table.HeaderCell>
//   <Table.HeaderCell>Status</Table.HeaderCell>
//   <Table.HeaderCell>Notes</Table.HeaderCell>
// </Table.Row>
