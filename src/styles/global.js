import { createGlobalStyle } from 'styled-components';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  html, body, #root {
     height: 100%;
  }
  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Roboto', sans-serif;
  }
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Roboto, sans-serif;
  }
  button {
      cursor: pointer;
  }
   a {
     text-decoration: none;
   }

   ul {
     list-style: none;
   }
`;

export default GlobalStyle;
