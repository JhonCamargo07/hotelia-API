import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as API from '../services/users';
import axios from 'axios';
import reactDotenv from 'react-dotenv';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function SignUp() {
	const [message, setMessage] = useState(null);
	const [status, setStatus] = useState(null);
	const [img, setImg] = useState(null);

	const subirFile = (e) => {
		setImg(e.target.files[0]);
	};
	const expresions = {
		name: /^[a-zA-ZÀ-ÿ\s]{7,60}$/,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		motive: /^[a-zA-ZÀ-ÿ0-9_.\',+-\s/¿?!:@?()\uD800-\uDBFF\u2702-\u27B0\uF680-\uF6C0\u24C2-\uF251]{10,100}$/,
		message: /^[a-zA-ZÀ-ÿ0-9_.\',+-\s$%/¿?¡#^!:@*?(&)\uD800-\uDBFF\u2702-\u27B0\uF680-\uF6C0\u24C2-\uF251]{10,50}$/,
	};

	return (
		<>
			<div className="modal fade" id="SignUp" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Registrarse
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<Formik
								initialValues={{
									name: '',
									email: '',
									image: null,
									password: '',
									passwordConfirm: '',
								}}
								validate={(values) => {
									let errors = {};

									if (!values.image) {
										errors.image = 'Seleccione una imagen';
									}

									if (!values.name) {
										errors.name = 'Por favor ingrese su nombre';
									} else if (!expresions.name.test(values.name)) {
										errors.name = 'El nombre debe ser valido';
									}

									if (!values.email) {
										errors.email = 'Por favor ingrese su correo';
									} else if (!expresions.email.test(values.email)) {
										errors.email = 'El correo debe ser valido';
									}

									if (!values.password) {
										errors.password = 'Por favor ingrese su contrase\u00f1a';
									} else if (!expresions.message.test(values.password)) {
										errors.password = 'Ingrese una contrase\u00f1a valida (10-50 caracteres)';
									}

									if (!values.passwordConfirm) {
										errors.passwordConfirm = 'Por favor repita la contrase\u00f1a';
									} else if (!expresions.message.test(values.passwordConfirm)) {
										errors.passwordConfirm = 'Ingrese una contrase\u00f1a valida (10-50 caracteres)';
									}

									if (values.password != values.passwordConfirm) {
										errors.passwordConfirm = 'Las contrase\u00f1as no coinciden';
									}

									return errors;
								}}
								onSubmit={(values, { resetForm }) => {
									const data = new FormData();
									let { name, email, password, passwordConfirm } = values;
									data.append('image', img);
									data.append('name', name);
									data.append('email', email);
									data.append('password', password);
									data.append('confirm_password', passwordConfirm);
									data.append('nameAdmin', import.meta.env.VITE_USER_MONGODB);
									data.append('passwordAdmin', import.meta.env.VITE_PASSWORD_MONGODB);
									axios
										.post(`${API.API_URL}/signup`, data)
										.then(function (response) {
											setStatus(response.data.success);
											setMessage(response.data.message);
											setTimeout(() => {
												setMessage(null);
											}, 10000);
										})
										.catch(function (error) {
											console.log('Ocurrio un error: ' + error);
										});
									// resetForm();
								}}>
								{({ errors }) => (
									<Form encType="multipart/form-data">
										<div className="mb-3">
											<label htmlFor="image" className="form-label">
												Imagen
											</label>
											<input
												type="file"
												className="form-control"
												id="image"
												name="image"
												onChange={(e) => {
													subirFile(e);
												}}
												accept="image/jpeg,image/png,image/jpg"
												aria-describedby="inputGroupFileAddon04"
												aria-label="Upload"
											/>
											<ErrorMessage
												name="image"
												component={() => <span className="text-danger">{errors.image}</span>}
											/>
											{'Imagen=' + img}
											{img != null && 'La imagen: ' + img[0]}
										</div>
										<div className="mb-3">
											<label htmlFor="name" className="form-label">
												Nombre
											</label>
											<Field type="text" name="name" className="form-control" id="name" />
											<ErrorMessage
												name="name"
												component={() => <span className="text-danger">{errors.name}</span>}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="emailSignUp" className="form-label">
												Correo
											</label>
											<Field type="email" name="email" className="form-control" id="emailSignUp" />
											<ErrorMessage
												name="email"
												component={() => <span className="text-danger">{errors.email}</span>}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="passwordSignUp" className="form-label">
												Contrase&#241;a
											</label>
											<Field type="password" name="password" className="form-control" id="passwordSignUp" />
											<ErrorMessage
												name="password"
												component={() => <span className="text-danger">{errors.password}</span>}
											/>
										</div>
										<div className="mb-3">
											<label htmlFor="passwordConfirmSignUp" className="form-label">
												Confirmar contrase&#241;a
											</label>
											<Field
												type="password"
												name="passwordConfirm"
												className="form-control"
												id="passwordConfirmSignUp"
											/>
											<ErrorMessage
												name="passwordConfirm"
												component={() => <span className="text-danger">{errors.passwordConfirm}</span>}
											/>
										</div>
										{message !== null && !status && <div className="fw-bold text-danger mb-2">{message}</div>}
										{message !== null && status && <div className="fw-bold text-success mb-2">{message}</div>}
										<div className="modal-footer p-1 mt-3">
											<button
												type="button"
												className="btn btn-secondary"
												data-bs-toggle="modal"
												data-bs-target="#SignIn">
												Iniciar sesi&#243;n
											</button>
											<button type="submit" className="btn btn-primary">
												Registrarme
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

export default SignUp;
