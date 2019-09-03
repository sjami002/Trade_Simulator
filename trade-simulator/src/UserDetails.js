import React, { Component } from "react";
import { Card, Icon, Image, Button, Label } from "semantic-ui-react";

const extra = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);

class UserDetails extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>{this.props.user.name}</Card.Header>
            <Card.Meta>@{this.props.user.username}</Card.Meta>

            <Card.Description>
              Wallet: ${this.props.user.budget}
            </Card.Description>
            <Button as="div" labelPosition="right">
              <Button icon>
                <Icon name="credit card" />
                MasterCard
              </Button>
              <Label as="a" basic pointing="left">
                Add Balance
              </Label>
            </Button>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              Member since 2016
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserDetails;
