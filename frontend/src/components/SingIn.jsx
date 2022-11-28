import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as API from './../services/users';
import axios from 'axios';
import reactDotenv from 'react-dotenv';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function SingIn() {
	const [message, setMessage] = useState(null);
	const [status, setStatus] = useState(null);

	const expresions = {
		name: /^[a-zA-ZÀ-ÿ\s]{7,60}$/,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		motive: /^[a-zA-ZÀ-ÿ0-9_.\',+-\s/¿?!:@?()\uD800-\uDBFF\u2702-\u27B0\uF680-\uF6C0\u24C2-\uF251]{10,100}$/,
		message: /^[a-zA-ZÀ-ÿ0-9_.\',+-\s$%/¿?¡!:@?()\uD800-\uDBFF\u2702-\u27B0\uF680-\uF6C0\u24C2-\uF251]{10,50}$/,
	};

	return (
		<>
			<div className="modal fade" id="SignIn" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Iniciar sesi&#243;n
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={{
									email: '',
									password: '',
								}}
								validate={(values) => {
									let errors = {};
									// Validate email
									if (!values.email) {
										errors.email = 'Por favor ingrese su correo';
									} else if (!expresions.email.test(values.email)) {
										errors.email = 'El correo debe ser valido';
									}

									// Validate message
									if (!values.password) {
										errors.password = 'Por favor ingrese su contrase\u00f1a';
									} else if (!expresions.message.test(values.password)) {
										errors.password = 'Ingrese una contrase\u00f1a valida (10-50 caracteres)';
									}
									return errors;
								}}
								onSubmit={(values, { resetForm }) => {
									let { email, password } = values;
									axios
										.post(`${API.API_URL}/signin`, {
											email,
											password,
											passwordAdmin: import.meta.env.VITE_REACT_APP_PASSWORD_MONGODB,
											nameAdmin: import.meta.env.VITE_REACT_APP_USER_MONGODB,
										})
										.then(function (response) {
											setStatus(response.data.success);
											setMessage(response.data.message);
											setTimeout(() => {
												setMessage(null);
											}, 10000);
										})
										.catch(function (error) {
											console.log(error);
										});
									// resetForm();
								}}>
								{({ errors }) => (
									<Form>
										<div className="mb-3">
											<label htmlFor="email" className="form-label">
												Correo
											</label>
											<Field
												type="email"
												name="email"
												className="form-control"
												id="email"
												aria-describedby="emailHelp"
											/>
											<ErrorMessage
												name="email"
												component={() => <span className="text-danger">{errors.email}</span>}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="password" className="form-label">
												Contrase&#241;a
											</label>
											<Field type="password" name="password" className="form-control" id="password" />
											<ErrorMessage
												name="password"
												component={() => <span className="text-danger">{errors.password}</span>}
											/>
										</div>
										{message !== null && !status && <div className="fw-bold text-danger mb-2">{message}</div>}
										{message !== null && status && <div className="fw-bold text-success mb-2">{message}</div>}
										<div className="modal-footer p-1 mt-3 ">
											<button
												type="button"
												className="btn btn-secondary"
												data-bs-toggle="modal"
												data-bs-target="#SignUp">
												Registrarse
											</button>
											<button type="submit" className="btn btn-primary">
												Ingresar
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SingIn;
