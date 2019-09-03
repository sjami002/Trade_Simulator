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

class PortfolioDisplay extends Component {
  state = {
    success: false,
    open: false
  };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  handleChange = () => {};

  handleSubmit = () => {};

  render() {
    const { open, dimmer } = this.state;
    return (
      <>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content>
            <Modal.Description>
              <p style={{ color: "teal" }}>
                {this.props.transaction.user.name}' Wallet: $
                {this.props.transaction.user.budget}
              </p>
              <Header size="tiny">
                Sell by Dollar Amount |{" "}
                <span style={{ color: "maroon" }}>
                  {this.props.transaction.stock.name}: $
                  {this.props.transaction.stock.price}
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
                    Total Quantity: {this.props.transaction.quantity}
                  </p>
                </Form.Field>
                <Header size="tiny" style={{ color: "maroon" }}>
                  OR
                </Header>
                <Header size="tiny">Sell by Quantity</Header>
                <Form.Field inline>
                  <Input
                    onChange={this.handleChange}
                    placeholder={this.props.transaction.quantity}
                    type="number"
                    name="quantity"
                  />
                  <p style={{ color: "teal" }}>
                    Total Price: $
                    {this.props.transaction.stock.price *
                      this.props.transaction.quantity}
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
              onClick={null}
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
          <Table.Cell>{this.props.transaction.stock.name}</Table.Cell>
          <Table.Cell>{this.props.transaction.stock.symbol}</Table.Cell>
          <Table.Cell>${this.props.transaction.stock.price}</Table.Cell>
          <Table.Cell>{this.props.transaction.stock.updated_at}</Table.Cell>
          <Table.Cell textAlign="left">
            ${this.props.transaction.purchase_price}
          </Table.Cell>
          <Table.Cell>{this.props.transaction.quantity}</Table.Cell>
          <Table.Cell>
            $
            {this.props.transaction.purchase_price *
              this.props.transaction.quantity}{" "}
          </Table.Cell>
        </Table.Row>
      </>
    );
  }
}

export default PortfolioDisplay;
