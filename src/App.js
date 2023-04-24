import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import addNotification from "react-push-notification";
import {getAuth, signInAnonymously} from 'firebase/auth';
import {getToken, onMessage} from "firebase/messaging";
import { messaging } from './firebase';
import {ToastContainer, toast} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';  




function App() {

  const login= () => {
    signInAnonymously(getAuth()).then(usuario=> console.log(usuario));
  }

  const activarMensajes = async ()=>{
    const token = await getToken.messaging(messaging, {
      vapidKey:"BJGhOi4mAMgnFVKlOFy3jAipMNJCGToZoMyhWEUWFNXgf0ADsNODRvOIErW_2y6jJaOREWvkS-L5Oq30SkE7EFY"
    }).catch(error => console.log("Error"));

    if (token)console.log("Este es tu token " + token);
    if(!token)console.log("No tienes token");
  }

  const notificacion =() =>{
    addNotification({
        title: 'Notificación de prueba',
        message: 'Notificacin esde firebase',
        duration: 4000,
        native: true,
    });
}

  useEffect(()=>{
    onMessage(messaging, message=>{
      console.log("tu mensaje ",message);
      toast(message.notification.title)
    })
  }, []);

  //consultas individuales
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=London%2Cuk&APPID=34515c14f718ee1dc3599ce93715ff3f`;
  //consultas grupo de ciudades
  const API_URL2 = 'https://api.openweathermap.org/data/2.5/group?id=3171193,1699896,524901,1699805,703448,2643743Cuk&APPID=34515c14f718ee1dc3599ce93715ff3f';
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get(API_URL2)
    //consultas individuales
    //.then(response => setWeatherData(response.data))
      //consultas grupo de ciudades
      .then(response => setWeatherData(response.data.list))
      .catch(error => console.error(error));
  }, []);


  //consultas grupo de ciudades
  return (
    <>


        <nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
        <a class="navbar-brand" href="#">Mi App De Clima</a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation"></button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            
                <button onClick={login} class="btn btn-outline-light my-2 my-sm-0 m-2">Ingresar</button>
                <button onClick={notificacion} class="btn btn-outline-light my-2 my-sm-0">Generar</button>
            
        </div>
    </nav>
    <div class="p-2 mb-4 bg-light rounded-3">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="container">
                        <div class="row">

                        {weatherData.map((art, index) => {
                          if (index === weatherData.length - 1) {
                            // Si es el último elemento, renderizamos el elemento con la función adicional
                            return (
                              <div class="col-md-12">
                                <div class="card">
                                  <img class="card-img-top p-2 mx-auto" src="https://i0.wp.com/climaya.com/wp-content/uploads/2019/06/cy-logo-512-512.png?fit=512%2C512&ssl=1" style={{width: 50}} alt="Title"/>
                                  <div class="card-body">
                                    <h4 class="card-title text-center">Ciudad: {art.name}</h4>
                                    <p class="card-text text-center">Temperatura: {art.main.temp} k</p>
                                  </div>
                                </div>
                              <a type="button" class="btn btn-primary d-block mx-auto ">Obtener Diferentes</a>
                              </div>
                              
                            );
                          }
                            return (
                              <>
                              <div class="col-md-6 p-2">
                                <div class="card text-start">
                                  <img class="card-img-top mx-auto p-2" src="https://i0.wp.com/climaya.com/wp-content/uploads/2019/06/cy-logo-512-512.png?fit=512%2C512&ssl=1" style={{width: 50}} alt="Title"/>
                                  <div class="card-body">
                                    <h4 class="card-title text-center">Ciudad: {art.name}</h4>
                                    <p class="card-text text-center">Temperatura: {art.main.temp} k</p>
                                  </div>
                                </div>
                            </div>

                              </>
                            );
                          })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
      <ToastContainer/>
      <button onClick={login}>Login</button>
      <button onClick={notificacion}>Generar token</button>  
    </div>  
        <table>
          <thead>
            <td>ID</td>
            <td>Nombre</td>
            <td>Temp</td>
          </thead>
          <tbody>
          {weatherData.map(art => {
            return (
              <>
                <tr>
                  <td>{art.id}</td>
                  <td>{art.name}</td>
                  <td>{art.main.temp}</td>
                </tr>
              </>
            );
          })}
          </tbody>
        </table>


    </>
      
  );

  

  //consultas individuales

  /*return (
    <>  
        <table>
          <thead>
            <td>ID</td>
            <td>Nombre</td>
            <td>Temp</td>
          </thead>
          <tbody>
                <td>{weatherData.id}</td>
                <td>{weatherData.name}</td>
                <td>{weatherData.main.temp}</td>
          </tbody>
        </table>
    </>
      
  );*/
}

export default App;
