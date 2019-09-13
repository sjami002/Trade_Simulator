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

class ConsolidatedPortfolio extends Component {
  state = {
    success: false,
    open: false,
    user_id: this.props.user.id,
    stock_id: this.props.transaction.id,
    onBuy: true,
    quantity: 0,
    purchase_price: this.props.transaction.price,
    dollarAmnt: 0,
    budget: this.props.user.budget,
    balance: this.props.transaction.balance
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleChange = event => {
    console.log(this.state.quantity);
    if (event.target.name === "quantity") {
      this.setState({
        quantity: -event.target.value,
        balance: this.state.balance - event.target.value,
        dollarAmnt: this.props.transaction.price * event.target.value,
        budget:
          this.props.user.budget +
          this.props.transaction.price * event.target.value
      });
    } else if (event.target.name === "dollarAmnt") {
      this.setState({
        dollarAmnt: event.target.value,
        quantity: event.target.value / this.props.transaction.price,

        budget: this.props.user.budget + event.target.value
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
        onBuy: false,
        quantity: this.state.quantity,
        purchase_price: this.state.purchase_price
      })
    })
      .then(res => res.json())
      .then(data => this.setState({ quantity: data.quantity }));

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
      .then(data => this.setState({ budget: data.budget }));

    this.setState({
      success: true
    });
  };

  render() {
    const { open, dimmer } = this.state;
    return (
      <>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              <p style={{ color: "teal" }}>
                {this.props.user.name}' Wallet: ${this.props.user.budget}
              </p>
              <Header size="tiny">
                Sell by Dollar Amount |{" "}
                <span style={{ color: "maroon" }}>
                  {this.props.transaction.name}: ${this.props.transaction.price}
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
                    Total Quantity:{this.state.quantity}
                  </p>
                </Form.Field>
                <Header size="tiny" style={{ color: "maroon" }}>
                  OR
                </Header>
                <Header size="tiny">Sell by Quantity</Header>
                <Form.Field inline>
                  <Input
                    onChange={this.handleChange}
                    type="number"
                    name="quantity"
                    placeholder={this.state.quantity}
                  />
                  <p style={{ color: "teal" }}>
                    Total Price: $
                    {this.props.transaction.price * this.state.quantity}
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
              positive
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
          <Table.Cell>{this.props.transaction.name}</Table.Cell>
          <Table.Cell>{this.props.transaction.symbol}</Table.Cell>
          <Table.Cell>${this.props.transaction.price}</Table.Cell>

          <Table.Cell>{this.state.balance}</Table.Cell>
          <Table.Cell>
            ${this.props.transaction.price * this.props.transaction.balance}{" "}
          </Table.Cell>
          <Table.Cell>
            <Button size="mini" onClick={this.show("blurring")}>
              Sell
            </Button>
          </Table.Cell>
        </Table.Row>
      </>
    );
  }
}

export default ConsolidatedPortfolio;

// <Modal dimmer={dimmer} open={open} onClose={this.close}>
//   <Modal.Content>
//     <Modal.Description>
//       <p style={{ color: "teal" }}>
//         {this.props.user.name}' Wallet: $
//         {this.props.user.budget}
//       </p>
//       <Header size="tiny">
//         Sell by Dollar Amount |{" "}
//         <span style={{ color: "maroon" }}>
//           {this.props.transaction.name}: $
//           {this.props.transaction.price}
//         </span>
//       </Header>
//
//       <Form>
//         <Form.Field inline>
//           <Input
//             onChange={this.handleChange}
//             name="dollarAmnt"
//             labelPosition="right"
//             type="number"
//
//           >
//             <Label basic>$</Label>
//             <input />
//             <Label>.00</Label>
//           </Input>
//           <p style={{ color: "teal" }}>
//             Total Quantity:
//           </p>
//         </Form.Field>
//         <Header size="tiny" style={{ color: "maroon" }}>
//           OR
//         </Header>
//         <Header size="tiny">Sell by Quantity</Header>
//         <Form.Field inline>
//           <Input
//             onChange={this.handleChange}
//
//             type="number"
//             name="quantity"
//           />
//           <p style={{ color: "teal" }}>
//             Total Price: $
//
//           </p>
//         </Form.Field>
//       </Form>
//
//       {this.state.success ? (
//         <Message info>
//           <p>
//             Purchase Successful.{" "}
//             <span
//               style={{ color: "salmon", cursor: "pointer" }}
//               onClick={this.close}
//             >
//               Click Here
//             </span>{" "}
//             to Exit
//           </p>
//         </Message>
//       ) : null}
//     </Modal.Description>
//   </Modal.Content>
//
//   <Modal.Actions>
//     <Button
//       positive
//       icon="checkmark"
//       labelPosition="right"
//       content="Execute Trade"
//       onClick={null}
//     />
//     <Button
//       negative
//       icon="close"
//       labelPosition="right"
//       content="Exit"
//       onClick={this.close}
//     />
//   </Modal.Actions>
// </Modal>
//
//
//
// balance:
//   this.state.balance -
//   event.target.value / this.props.transaction.price,
