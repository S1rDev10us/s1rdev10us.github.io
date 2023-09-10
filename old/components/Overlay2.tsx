import { Container, Navbar, Offcanvas, Nav, Row, Col, Breadcrumb } from "react-bootstrap";

export default function Overlay() {
	return (
		<Container
			fluid
			style={{ backdropFilter: "blur(10px)", position: "sticky" }}
		>
			<Navbar
				collapseOnSelect
				expand="md"
				sticky="top"
			>
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Brand href={`/`}>S1rDev10us</Navbar.Brand>
					<Navbar.Offcanvas>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav>
								{/* <!-- {
						links.map((l, i) => (
							<Nav.Link
								key={i}
								active={window.location.pathname.startsWith(l.link)}
								href={l.link}
							>
								{capitaliseWords(l.name)}
							</Nav.Link>
						))
					} --> */}

								<Nav.Link href="#/">Home</Nav.Link>
								<Nav.Link href="#/games">Games</Nav.Link>
								<Nav.Link href="#/feed">Feed</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
					<Navbar.Text>
						<Container>
							<Row>
								<Col md="auto">
									<Breadcrumb>
										{/*
								slug.map((loc, i) => (
									<Breadcrumb.Item
										key={i}
										href={"#" + (path.slice(0, i + 1) + "").replaceAll(",", "/")}
										active={i == path.length - 1}
									>
										{capitaliseWords(loc.replace("_", " "))}
									</Breadcrumb.Item>
								))
							 */}
									</Breadcrumb>
								</Col>
								{/* <Col md="auto">
									<DropdownButton title={"Theme: " + capitaliseWords(theme.state)}>
										<Dropdown.Item onClick={() => theme.set(Themes.DARK)}>
											<i className="bi bi-moon-stars-fill" /> Dark
										</Dropdown.Item>
										<Dropdown.Item onClick={() => theme.set(Themes.LIGHT)}>
											<i className="bi bi-brightness-high-fill" /> Light
										</Dropdown.Item>
										<Dropdown.Item onClick={() => theme.set(Themes.AUTO)}>
											<i className="bi bi-circle-half" /> Auto
										</Dropdown.Item>
									</DropdownButton>
								</Col> */}
							</Row>
						</Container>
					</Navbar.Text>
				</Container>
			</Navbar>
		</Container>
	);
}
