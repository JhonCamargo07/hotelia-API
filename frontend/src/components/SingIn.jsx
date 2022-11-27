import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as API from './../services/users';
import axios from 'axios';

function SingIn() {
	const [message, setMessage] = useState(null);

	async function singIn(API_URL) {
		axios
			.post(`${API_URL}/signin?name=JhonCamargo`)
			.then(function (response) {
				console.log(response.data);
				setMessage(response.data.message);
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function () {
				// always executed
			});
	}

	return (
		<>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Iniciar sesi&#243;n
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="exampleInputEmail1" className="form-label">
										Correo
									</label>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="exampleInputPassword1" className="form-label">
										Contrase&#241;a
									</label>
									<input type="password" className="form-control" id="exampleInputPassword1" />
								</div>
							</form>
							{message !== null && <div className="form-text">{message}</div>}
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Cerrar
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => {
									singIn(API.API_URL);
								}}>
								Ingresa
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SingIn;
