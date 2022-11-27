import React from 'react';
import HoteliaImg from './../assets/img/logo.png';

function Navbar() {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container">
					<a className="navbar-brand" href="#">
						<img src={HoteliaImg} alt="Logo Hotelia" width="150px" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link fs-5 active" aria-current="page" href="#">
									Inicio
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link fs-5" href="#">
									Ubicacion
								</a>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link fs-5 dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									Dropdown
								</a>
								<ul className="dropdown-menu">
									<li>
										<a className="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<a className="nav-link fs-5 ">
									<button
										type="button"
										className="btn btn-primary btn-lg"
										data-bs-toggle="modal"
										data-bs-target="#SignIn">
										Iniciar sesi&#243;n
									</button>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
