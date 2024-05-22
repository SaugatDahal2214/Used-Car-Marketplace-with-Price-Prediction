import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Add Google Fonts
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, #172547 0%, #0a75ad 100%);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
`;

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user'); // Replace 'user' with your actual key used in localStorage

    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Welcome to CarRevs</Title>
      </Container>
    </>
  );
};

export default Dashboard;
