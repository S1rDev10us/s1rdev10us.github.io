import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import { capitaliseWords } from "../lib";
// import { home } from "../App";
// import { useContext } from "react";
// import { ThemeContext, Themes } from "../Context";
export default function Overlay(props: { path: string }) {
	// const theme = {get:"dark",set:()=>{}}//useContext(ThemeContext);
	const links: { link: string; name: string }[] = [
		{ link: ``, name: "Home" },
		{ link: "/tools", name: "Tools" },
		{ link: "/socials", name: "Extenal links" },
		{ link: "/works", name: "My Works" },
		{ link: "/posts", name: "Feed" },
	];

	// const location = useLocation();
	// const path = window.location.pathname.split("/");
	const path = props.path.split("/");
	return (
		<>
			<Container
				fluid
				style={{ backdropFilter: "blur(10px)", position: "sticky" }}
			>
				<Navbar
					collapseOnSelect
					expand="md"
					sticky="top"
					// bg={resolveTheme()}
				>
					<Container>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Brand href={`/`}>S1rDev10us</Navbar.Brand>
						{/* <Navbar.Offcanvas> */}
						<Navbar.Collapse>
							{/* <Offcanvas.Header closeButton>
								<Offcanvas.Title>Menu</Offcanvas.Title>
							</Offcanvas.Header> */}
							{/* <Offcanvas.Body> */}
							<Nav>
								{links.map((l, i) => (
									<Nav.Link
										key={i}
										active={props.path.startsWith(l.link)}
										href={l.link}
									>
										{capitaliseWords(l.name)}
									</Nav.Link>
								))}
								{/* <Nav.Link href="#/">Home</Nav.Link>
							<Nav.Link href="#/games">Games</Nav.Link>
							<Nav.Link href="#/feed">Feed</Nav.Link> */}
							</Nav>
							{/* </Offcanvas.Body> */}
							{/* </Navbar.Offcanvas> */}
						</Navbar.Collapse>
						<Navbar.Text>
							<Container>
								<Row>
									<Col md="auto">
										<Breadcrumb>
											{path.map((loc, i) => (
												<Breadcrumb.Item
													key={i}
													href={
														"#" +
														(path.slice(0, i + 1) + "").replaceAll(",", "/")
													}
													active={i == path.length - 1}
												>
													{capitaliseWords(loc.replace("_", " "))}
												</Breadcrumb.Item>
											))}
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
									{}
								</Row>
							</Container>
						</Navbar.Text>
					</Container>
				</Navbar>
			</Container>
			<slot />
		</>
	);
}

/*import Container from "./bootstrap/Container";
import Navbar from "./bootstrap/Navbar";

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
					} --> * /}

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
							 * /}
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
								</Col> * /}
							</Row>
						</Container>
					</Navbar.Text>
				</Container>
			</Navbar>
		</Container>
	);
}
*/
