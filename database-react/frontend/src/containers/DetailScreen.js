import React, { Component } from "react";
import axios from "../axios";
import { ROOT_API } from '../statics';
import NavBar from "../components/NavBar";
import { withRouter } from 'react-router-dom'
import {  Input } from 'reactstrap';

class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",

      citizen: {}


    };
    // this.handleClick = this.handleClick.bind(this);
    // this.handleClick1 = this.handleClick1.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
   
  }


  componentDidMount() {
    axios({
      url: `${ROOT_API}/api/auth`,
      method: "GET",

    }).then(response => {
      console.log(response);
    }).catch(error => {

      console.log(error)


    });
    if (window.location.pathname) {
      const pathParams = window.location.pathname.slice(1).split("/");
      if (pathParams[1] && pathParams[0] === "citizens") {
        const citizenId = pathParams[1];
        axios
          .get(`${ROOT_API}/api/citizens/${citizenId}`)
          .then(data => {
            this.setState({
              citizen: data.data

            });


          })
          .catch(err => console.error(err));

      }
    }
    this.handleClick = (event) => {
      event.preventDefault();
      if (window.location.pathname) {
        const pathParams = window.location.pathname.slice(1).split("/");
        if (pathParams[1] && pathParams[0] === "citizens") {
          const citizenId = pathParams[1];
  
          // yarn add
          axios({
            url: `${ROOT_API}/api/citizens/${citizenId}`,
            method: "DELETE",
  
          }).then(response => {
            if (response.data.success) {
              window.location.href = `http://localhost:3000/ `
  
            }
            // toggleLoading(false);
          }).catch(error => {
  
            console.log(error)
  
  
          });
        }
      }
    }
    this.handleClick1 = (event) => {
      event.preventDefault();
      if (window.location.pathname) {
        const pathParams = window.location.pathname.slice(1).split("/");
        if (pathParams[1] && pathParams[0] === "citizens") {
          const citizenId = pathParams[1];
  
          const newChangeCitizen = {
            name: this.state.name,
            password: this.state.password,
            dob: this.state.dob,
            address: this.state.address,
            job: this.state.job
  
          }
          axios({
            url: `${ROOT_API}/api/citizens/${citizenId}`,
            method: "PUT",
            data: newChangeCitizen
          }).then(response => {
            if (response.data.success) {
              window.location.href = `http://localhost:3000/ `
            }
          }).catch(error => {
            console.log(error)
          });
        }
      }
    }
  }
  
  handleInputChange(event) {
    // console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {


    return (
      <div>
        <NavBar
          onNameSignin={this.props.onNameSignin}
          onCMTSignin={this.props.onCMTSignin}
          onSearchChanged={this._onSearchChanged}
          username={this.props.username}
          onLogin={this.props.onLogin}
        />
        <div className="main_content container">
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
              {
                this.state.citizen.citizen
                  ? <tr >
                    <th scope="col"></th>
                    <th scope="col" >{this.state.citizen.citizen.name}</th>
                    <th scope="col" >{this.state.citizen.citizen.cmt}</th>
                    <th scope="col">{this.state.citizen.citizen.dob}</th>
                    <th scope="col" >{this.state.citizen.citizen.address}</th>
                    <th scope="col">{this.state.citizen.citizen.job}</th>
                  </tr>
                  : ""
              }
              <tr>
                <th scope="col"></th>
                <th>
                  <Input

                    name="name"
                    placeholder="Họ và Tên"
                    onChange={this.handleInputChange}
                  />
                </th>
                <th scope="col">
                  <Input

                    name="cmt"
                    placeholder="Chứng Minh Thư"
                    onChange={this.handleInputChange}
                  />
                </th>
                <th scope="col">
                  <Input

                    name="dob"
                    placeholder="Ngày Sinh"
                    onChange={this.handleInputChange}
                  />
                </th>
                <th scope="col">
                  <Input

                    name="address"
                    placeholder="Địa Chỉ"
                    onChange={this.handleInputChange}
                  />
                </th>
                <th scope="col">
                  <Input

                    name="job"
                    placeholder="Nghề Nghiệp"
                    onChange={this.handleInputChange}
                  />
                </th>





              </tr>
            </tbody>



          </table>

          <div className="d-flex justify-content-center ">
            <button onClick={this.handleClick} type="button" className="btn btn-danger btn-lg mr-5">Xoa</button>
            <button onClick={this.handleClick1} type="button" className="btn btn-warning btn-lg">Chinh Sua</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DetailScreen);
