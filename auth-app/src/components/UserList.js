import React, { Component } from "react";
import axios from "axios";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL

    this.fetchUsers();
  }

  fetchUsers = () => {
    axios
      .get(`http://localhost:4000/api/users`, {
        headers: { username: "bob", password: "pw" }
      })
      .then(response => {
        console.log(response);
        this.setState(() => ({ users: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  // componentWillReceiveProps(newProps) {
  //   if (this.props.match.params.id !== newProps.match.params.id) {
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.users) {
      return <div>Loading users information...</div>;
    }

    const users = this.state.users;
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>The users are.....</h2>
          {users.map(user => (
            <div key={user.id} className="user">
              {user}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
