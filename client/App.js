import React, { Component } from "react";
import axios from "axios";
import SingleContact from "./SingleContact";
import ContactList from "./ContactList";
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selectedItem: {},
    };
    //More info need on this
    this.selectItem = this.selectItem.bind(this);
    this.backButton = this.backButton.bind(this);
  }
  async componentDidMount() {
    const users = (await axios.get("/api/users")).data;
    this.setState({ users });
    console.log(users);
  }

  async selectItem(id) {
    try {
      const selectedItem = (await axios.get(`/api/users/${id}`)).data;
      console.log(`This is it ${selectedItem.name}`);
      this.setState({ selectedItem });
    } catch (error) {
      console.log(error);
    }
  }
  async backButton() {
    try {
      this.setState({ selectedItem: {} });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {this.state.selectedItem.id ? (
          <SingleContact
            contact={this.state.selectedItem}
            back={"true"}
            backButton={this.backButton}
          />
        ) : (
          <ul>
            <ContactList
              list={this.state.users}
              selectItem={this.selectItem}
              back={"false"}
              backButton={this.backButton}
            />
          </ul>
        )}
      </div>
    );
  }
}

export default App;
