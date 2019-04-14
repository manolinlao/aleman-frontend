import React, { Component } from "react";
import {getApi} from '../services/api_consultas';



 
class Post extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      tipoElegido: 's',
      generoElegido: 'm',
      resultadoGrabacion: ''
    }

    
  }

  setType = (event) => {
    let tipo = event.target.value;
    this.setState( {
      tipoElegido: tipo,
    });
  }

  setGenero = (event) => {
    let genero = event.target.value;
    this.setState( {
      generoElegido: genero,
    });
  }

  borraFormulario = (event) => {
    try{
      event.preventDefault();
      this.setState({resultadoGrabacion:''});
      this.spanienInput.value = '';
      this.deutschInput.value = '';
      if(this.state.tipoElegido=='s'){
        this.pluralInput.value = '';
      }
      this.spanienInput.focus();
    }catch(e){}
  }

  graba = (event) => {

    event.preventDefault();

    //this.setState({resultadoGrabacion:''});

    let spanien = (this.spanienInput.value).trim().toLowerCase();
    let deutsch = (this.deutschInput.value).trim().toLowerCase();
    let tipo = (this.state.tipoElegido).trim().toLowerCase();
    let genero = '';
    let plural = '';
    if(tipo==='s'){
      genero = this.state.generoElegido;
      plural = (this.pluralInput.value).trim().toLowerCase();;
    }

    if(spanien=="" || deutsch==""){
     return;
    }

    console.log("DIUSPUESTO A GRABAR");

    let strDataBody = `cas=${spanien}&ale=${deutsch}&tipo=${tipo}&genero=${genero}&plural=${plural}&nivel=1`;

    if(this.puedoGrabar()){

      let tokenUsuario = localStorage.getItem('tokenUsuario');
      console.log("TOKENUSUARIO");
      console.log(tokenUsuario);

      let httpHeaders;
      httpHeaders = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json',
        'token': `${tokenUsuario}`
      }

      console.log(httpHeaders);

      let fetchOptions = {
        method:'POST',
        headers: httpHeaders,
        mode:'cors',
        body: strDataBody
      }



      let urlApi = getApi("grabapalabra","dev");

      fetch(urlApi,fetchOptions).then( response => {
        console.log("RESPONMSE");
        console.log(response);
        return response.json();
      }).then(data=>{
        console.log("RSEULTADO GRABACION");
        console.log(data);
        this.borraFormulario();
        if(data.ok){
         

         this.setState({resultadoGrabacion:'ok'});

        }else{
          let mensajeError = 'Wort existiert bereits';
          if(data.err.name=="JsonWebTokenError"){
            mensajeError = "Sie müssen sich anmelden, um Wörter hochladen zu können";
            this.setState({resultadoGrabacion:'nok3'});
          }else{
            this.setState({resultadoGrabacion:'nok1'});
          }
         

         
        }
      })
      .catch(error=>{
        this.borraFormulario();
        console.log("post.js::error post = " + error );
       
        this.setState({resultadoGrabacion:'nok2'});
      })
    }

  }


  graba2 = (event) => {

   alert();
   event.preventDefault();
  }

  puedoGrabar = () => {
    //TO_DO:: usar jsonwebtoken para autenticarse como administrador
    return true;
  }

  pintaResultadoGrabacion = () => {

    let htmlRetorno = '';
    if(this.state.resultadoGrabacion==''){
      htmlRetorno = (
        <div>
         
        </div>
      );
    }
    if(this.state.resultadoGrabacion=='ok'){
      htmlRetorno = (
        <div className="resultadoGrabacion">
          Wort richtig gespeichert
        </div>
      );
    }
    if(this.state.resultadoGrabacion=='nok1'){
      htmlRetorno = (
        <div className="resultadoGrabacion">
          Wort existiert bereits
        </div>
      );
    }
    if(this.state.resultadoGrabacion=='nok2'){
      htmlRetorno = (
        <div className="resultadoGrabacion">
          Fehler beim Speichern des Wortes
        </div>
      );
    }
    if(this.state.resultadoGrabacion=='nok3'){
      htmlRetorno = (
        <div className="resultadoGrabacion">
          Sie müssen sich anmelden, um Wörter hochladen zu können
        </div>
      );
    }

    return(
      <div >
        {htmlRetorno}
      </div>      
    );
  }

  render() {
    return (
      <div className="post">
        <div className="details">Schreibe die Details des Wortes</div>
        <form>
       <br></br>
        <div className="formulario">
            <div className="fila">
              <div className="columna1">
                Spanien:
              </div>
              <div className="columna2">
              <input autoFocus ref={(spanien)=>{this.spanienInput = spanien;}} type="text" name='spanien' id='spanien'/>
              </div>
            </div>
            <div className="fila">
              <div className="columna1">
                Deutsch:
              </div>
              <div className="columna2">
              <input  ref={(deutsch)=>{this.deutschInput = deutsch;}} type="text" name='deutsch' id='deutsch'/>
              </div>
            </div>
        </div>
       
       <br></br>
      
        <div onChange={this.setType} className="bolderiza">
          <input type="radio" value="s" name="tipo" defaultChecked/> Nomen
          <input type="radio" value="v" name="tipo"/> Verb
          <input type="radio" value="o" name="tipo"/> Andere
        </div>

        {
          this.state.tipoElegido=='s'?
          <div>
            <div onChange={this.setGenero} className="bolderiza">
              <input type="radio" value="m" name="genero" defaultChecked/> Männlich
              <input type="radio" value="n" name="genero"/> Neutral
              <input type="radio" value="f" name="genero"/> Weiblich
            </div>
            <br></br>

            <div className="fila">
              <div className="columna1">
                Plural:
              </div>
              <div className="columna2">
              <input ref={(plural)=>{this.pluralInput = plural;}} type="text" name='plural' id='plural'/>
              </div>
            </div>
          </div>:
          ''
        }

        <br></br><br></br>
       
        <button onClick={this.graba} className="botonein">Speichern</button>
        <button onClick={this.borraFormulario} className="botonaus">Löschen</button>
        
        </form>

       {this.pintaResultadoGrabacion()}


      </div>
    );
  }
}
 
export default Post;