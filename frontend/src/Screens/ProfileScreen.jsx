import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import {Form, Button} from "react-bootstrap";
import {useUpdateUserMutation} from "../slices/usersApiSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";



const ProfileScreen = () => {
  
  const {userInfo} = useSelector((state) => state.auth)

  const  [name ,setName] = useState('')
  const  [email ,setEmail] = useState('')
  const  [password ,setPassword] = useState('')
  const  [confirmPassword ,setConfirmPassword] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [update, {isLoading}] = useUpdateUserMutation();
  

  useEffect(()=>{
    setName(userInfo.name),
    setEmail(userInfo.email)
  },[userInfo.name, userInfo.email])


  const submitHandler = async(e) => {
    e.preventDefault();
  
      if(password !== confirmPassword) {
        toast.error('Passwords do not match')
      }else{
        try {
          const response = await update({name, email, password}).unwrap()
          dispatch(setCredentials(response))
          toast.success("Profile updated")
          navigate('/')
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
      }
    } 
   


  return (

    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
          { isLoading && <Loader/>  }

      </Form>
    </FormContainer>

  )
}

export default ProfileScreen