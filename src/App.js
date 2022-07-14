import { BrowserRouter } from "react-router-dom";
import MainComponents from "./MainComponents";
import axios from 'axios'


function App() {
  ;

  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.message.includes('401')) {
      // setModal(true)
      window.location.href = "/"
      localStorage.clear()
    }
    if (error.response.data.message == 'Not found') {
      // setModalother(true)
      // setMessage('Sorry The Request Can not be Fullfilled Now')

    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  return (
    <BrowserRouter>
      <MainComponents />
    </BrowserRouter>
  );
}

export default App;
