import React from 'react';

export default function Header() {
	return (
		<>
			<header className="header" id="header">
				<a href="http://jhoncamargo.000webhostapp.com/" className="header__enlace">
					<img src="imagenes/logo_jhon_camargo.png" loading="lazy" alt="" className="header__logo" />
				</a>
				<p id="error__ie"></p>
				<nav className="header__nav">
					<p className="header__enlaces" id="sobre_mi">
						<i className="icono__nav fas fa-user"></i>Sobre mí
					</p>
					<p className="header__enlaces" id="habilidades">
						<i className="icono__nav fas fa-toolbox"></i>Habilidades
					</p>
					<p className="header__enlaces" id="contacto">
						<i className="icono__nav fas fa-id-badge"></i>Contacto
					</p>
				</nav>
				<div className="hamburguesa">
					<i className="icono icono__hamburguesa fas fa-bars" id="hamburguesa"></i>
				</div>
			</header>
		</>
	);
}
