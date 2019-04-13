import React, { Component } from "react";
import Palabra from './Palabra';

import CircularProgress from '@material-ui/core/CircularProgress';

import {transformDataConsulta,transformConjugaciones,procesaPalabras} from '../services/api_consultas';
import {api_consulta_all, api_consulta_conjugaciones } from './../constants/api_url';
import {api_consulta_all_Produccion, api_consulta_conjugaciones_Produccion } from './../constants/api_url';

import './styles.css';



class Consulta extends Component {
  constructor(){
    super();
    this.state = {
      palabrasRecibidas:null,
      conjugacionesRecibidas:null,
      palabras:null,
    };
  }

  async componentDidMount(){
    console.log("consulta.js::componentDidMount::api_consulta_all = " + api_consulta_all);

    //Cuando hago la prueba en mi propio dominio, es decir ejecuto esto desde el port 3000 
    //y el fectch es en el mismo localhost pero otro puerto, he de activar las CORS tanto
    //en servidor como aquí.
    
    /*
      Por razones de seguridad, los exploradores restringen las solicitudes HTTP de origen cruzado
      iniciadas dentro de un script. Por ejemplo, XMLHttpRequest y la API Fetch siguen 
      la política de mismo-origen. Ésto significa que una aplicación que utilice esas APIs XMLHttpRequest
      sólo puede hacer solicitudes HTTP a su propio dominio, a menos que se utilicen cabeceras CORS.
    */

    /*
      the server that hosts the resource needs to have CORS enabled. What you can do on the client side (and probably what you are thinking of) is set the mode of fetch to CORS (although this is the default setting I believe):

      fetch(request, {mode: 'cors'});

      However this still requires the server to enable CORS as well, 
      and allow your domain to request the resource.

      You can also use no-cors mode on the client side, but this will just give you 
      an opaque response (you can't read the body, but the response can still be cached by a 
      service worker or consumed by some API's, like <img>

      Fetch (and XMLHttpRequest) follow the same-origin policy. 
      This means that browsers restrict cross-origin HTTP requests from within scripts. 
      A cross-origin request occurs when one domain (for example http://foo.com/) 
      requests a resource from a separate domain (for example http://bar.com/)

      En el sev(idor crearemos un middleware para activar el cors


    */

    let hayPalabras = false;
    let hayConjugaciones = false;

    //Cargamos las palabras

    let urlApi = api_consulta_all_Produccion;
    if(process.env.NODE_ENV==="dev" || process.env.NODE_ENV==="development"){
      urlApi = api_consulta_all;
    }

    await fetch(urlApi,{mode:'cors'}).then( response => {
      return response.json();
    }).then(data=>{
      const newPalabrasRecibidas = transformDataConsulta(data);
      hayPalabras = true;
      this.setState({
        palabrasRecibidas:newPalabrasRecibidas,
      });
    })
    .catch(error=>{
      console.log("consulta.js::componentDidMount::error = " + error );
    })
    

    //Cargamos las conjugaciones
    console.log("hacemos fetch de las conjugaciones verbales");
    console.log("consulta.js::componentDidMount::api_consulta_conjugaciones = " + api_consulta_conjugaciones);

     urlApi = api_consulta_conjugaciones_Produccion;
    if(process.env.NODE_ENV==="dev" || process.env.NODE_ENV==="development"){
      urlApi = api_consulta_conjugaciones;
    }

    await fetch(api_consulta_conjugaciones,{mode:'cors'}).then( response => {
      console.log("hay respuesta");
      return response.json();
    }).then(data=>{  
      console.log("hay respuesta 2");
      hayConjugaciones = true;
      const newConjugacionesRecibidas = transformConjugaciones(data);
      this.setState({
        conjugacionesRecibidas:newConjugacionesRecibidas,
      });
    })
    .catch(error=>{
      console.log("consulta.js::componentDidMount::error obteniendo conjugaciones = " + error );
    })

    console.log("despues de los dos fetch");
    console.log("hayPalabras = " + hayPalabras);
    console.log("hayConjugaciones = " + hayConjugaciones);
    //procesamos las palabras para juntar las conjugaciones
    if(hayPalabras){
      const palabrasProcesadas = procesaPalabras(this.state.palabrasRecibidas,this.state.conjugacionesRecibidas);
      this.setState({
        palabras:palabrasProcesadas,
      })
    }
  }


  pintaPalabras = palabras => {
    return (
      palabras.map( (palabra,index) => <Palabra key={index} data={palabra}/>)
    );
  }

  pintaNumeroPalabras = palabras => {
    return (
      <div>
        <h4>Anzahl der Wörter =  {palabras.length}</h4>
      </div>
    );
  }


  render() {
    const {palabras} = this.state
    return (
      <div className="consulta">
        {
          palabras?
          this.pintaNumeroPalabras(palabras):
          <div className="espera">
            Warten Sie mal
          </div>
        }
        {
          palabras?
          this.pintaPalabras(palabras):
          <div className="espera"><CircularProgress/></div>
          
        }
      </div>
    );
  }
}
 
export default Consulta;