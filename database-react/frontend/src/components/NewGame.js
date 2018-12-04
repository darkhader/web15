import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from '../axios';
import NavBar from "../components/NavBar";
import { ROOT_API } from '../statics';

export default class NewGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			cmt: '',
			password: '',
			dob: '',
			address: '',
			job: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();


		const newCitizen = {
			// ["player1", "player2", "player3", "player4"]
			name: this.state.name,
			cmt: this.state.cmt,
			password: this.state.password,
			dob: this.state.dob,
			address: this.state.address,
			job: this.state.job

		}
		// yarn add
		axios({
			url: `${ROOT_API}/api/citizens`,
			method: "POST",
			data: newCitizen
		}).then(response => {
			if (response.data.success) {
				window.location.href = `http://localhost:3000/ `
			}
			// toggleLoading(false);
		}).catch(error => {
		
			console.log(error)


		});
	}

	handleInputChange(event) {
		// console.log(event.target);
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return (

			<Form className="container" onSubmit={this.handleSubmit}>
				<NavBar
				  onNameSignin={this.props.onNameSignin}
				  onCMTSignin={this.props.onCMTSignin}
					onSearchChanged={this._onSearchChanged}
					username={this.props.username}
					onLogin={this.props.onLogin}
				/>
				
				<FormGroup>
					<Input
						name="name"
						placeholder="Họ và Tên"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="cmt"
						placeholder="Chứng Minh Thư"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="dob"
						placeholder="Ngày Sinh"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="address"
						placeholder="Địa Chỉ"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<FormGroup>
					<Input
						name="job"
						placeholder="Nghề Nghiệp"
						onChange={this.handleInputChange}
					/>
				</FormGroup>
				<Button>Tạo Người Dân</Button>
			</Form>
		);
	}
}