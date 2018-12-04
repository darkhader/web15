import React, { Component } from "react";

import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../components/NavBar";
import MainContent from "../components/MainContent";
import { withRouter } from 'react-router-dom'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizens: [],
      citizenid: null,
      searchString: ""
    };
    console.log("props", props);

  }



  componentDidMount() {
    axios
      .get(`${ROOT_API}/api/citizens`)
      .then(response => {

        if (response.data.success) {

          this.setState({ citizens: response.data.citizens });



        }


      }).catch(error => {

        axios({
          url: `${ROOT_API}/api/auth`,
          method: "GET",
        }).then(response => {
          this.setState({
            citizenid: response.data.citizenFound.id
          })
          console.log("citiid", this.state.citizenid);
          axios
            .get(`${ROOT_API}/api/citizens/${this.state.citizenid}`)
            .then(response => {

              console.log("r", response.data.citizen);
              this.setState({ citizen1: response.data.citizen });



            }).catch(error => {
              console.log(error)
            });
        }).catch(error => {
          console.log(error)
        });
        console.log(error)
      });

  }

  _onSearchChanged = text => this.setState({ searchString: text });

  render() {

    if (this.state.citizens != null) {
      const displayedCitizens = this.state.citizens.filter(
        citizen =>
          citizen.name.includes(this.state.searchString) ||
          citizen.cmt.includes(this.state.searchString) ||
          citizen.dob.includes(this.state.searchString) ||
          citizen.job.includes(this.state.searchString) ||
          citizen.address.includes(this.state.searchString)
      );



      return (
        <div>
          <NavBar
            onNameSignin={this.props.onNameSignin}
            onCMTSignin={this.props.onCMTSignin}
            onSearchChanged={this._onSearchChanged}
            username={this.props.username}
            onLogin={this.props.onLogin}
          />






          {this.state.citizen1 ?
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Họ và Tên</th>
                  <th scope="col">Chứng Minh Thư</th>
                  <th scope="col">Ngày Sinh</th>
                  <th scope="col">Địa Chỉ</th>
                  <th scope="col">Nghề Nghiệp</th>

                </tr>
              </thead>
              <tbody>
                <tr >
                  <th scope="col"></th>
                  <th scope="col" >{this.state.citizen1.name}</th>
                  <th scope="col" >{this.state.citizen1.cmt}</th>
                  <th scope="col">{this.state.citizen1.dob}</th>
                  <th scope="col" >{this.state.citizen1.address}</th>
                  <th scope="col">{this.state.citizen1.job}</th>
                </tr>
              </tbody>
            </table>
            : <MainContent citizens={displayedCitizens} history={this.props.history} />
          }


        </div>
      );
    }
  }
}

export default withRouter(HomeScreen);
