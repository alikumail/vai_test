import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { userActions } from '../../Store/Users/userAction';
import { Button, Form, Alert, Spinner, Container, Row, Col, Card } from 'react-bootstrap';

const AdminLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setLoading(true);
    dispatch(userActions.onSubmit(email, password))
      .then((data:any) => {
        if (data?.access) {
          // Implement your login logic here
        } else if (data?.response?.data?.detail) {
          setError(data?.response?.data?.detail);
        }
        setLoading(false);
      });
  };

  const cardStyle = {
    width: '30rem',
    backgroundColor: '#f8f9fa', // Light grey color for the card background
    border: 'none',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)' // Adding a subtle shadow to the card
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', backgroundColor: '#343a40' }} // Dark grey color for the background
    >
      <Card style={cardStyle}>

        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ color: '#343a40' }}>Admin Login</Card.Title> {/* Dark grey color for the title */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type="email"
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
                placeholder="Enter email" 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                type="password"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
                placeholder="Password" 
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleLogin} disabled={isLoading} className='block'>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
