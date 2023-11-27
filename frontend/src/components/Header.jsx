import {Navbar, Nav, Container ,NavDropdown ,Badge } from "react-bootstrap";
import {FaSignInAlt, FaSignOutAlt } from  "react-icons/fa"
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {useLogoutMutation} from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import {toast} from "react-toastify";

const Header = () => {

  const {userInfo} = useSelector((state)=> state.auth)

  const [logoutApi , {isError}] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }
  },[userInfo,navigate])

  const logoutHandler = async(e) => {
    try {
      e.preventDefault();
      await logoutApi().unwrap()
      dispatch(logout())
      navigate('/')
      toast.success(`Bye ${userInfo.name}`)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <header>
      <Navbar bg="secondary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
           <Navbar.Brand>Mern App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username' className="ms-auto">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/logout" onClick={logoutHandler}>
                  <NavDropdown.Item>
                    Logout
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                      <FaSignInAlt/> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                      <FaSignOutAlt/> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header