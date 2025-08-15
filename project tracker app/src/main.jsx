import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { BrowserRouter } from "react-router-dom";



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>



)


{/* <Provider store={store}> */}
{/*   <StrictMode> */}
{/*     <App /> */}
{/*   </StrictMode> */}
{/* </Provider> */}