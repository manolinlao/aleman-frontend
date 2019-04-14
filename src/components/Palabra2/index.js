import React, { Component } from "react";
import {getApi} from './../../services/api_consultas';
import './styles.css';
import swal from 'sweetalert';
 
class Palabra2 extends Component {

  constructor(props){
    super(props);
   
    const {palabras} = props;
   
    this.state = {
      palabras,
    }

  }

  dameDivSustantivo(palabra){
    return(
      <div className="textoPalabra">
        Spanien: {palabra.cas}<br></br>
        Deutsch: {palabra.ale}<br></br>
        Plural: {palabra.plural}<br></br>
      </div>
    );
  }

  dameDivVerbo(palabra){
    return(
      <div className="textoPalabra">
        Spanien: {palabra.cas}<br></br>
        Deutsch: {palabra.ale}<br></br>
        <button className="botonInfo" onClick={(evento)=>{this.onVerboClick(evento,palabra.ale)}}>Mehr Informationen</button>
      </div>
    );
  }

  dameDivOtro(palabra){
   
    return(
      <div className="textoPalabra">
        Spanien: {palabra.cas}<br></br>
        Deutsch: {palabra.ale}<br></br>
      </div>
    );
  }

  async onVerboClick(event,palabra){
    //busca la conjugación para la palabra
    let verbo = await this.getVerboInfo(palabra);
    console.log("VERBO CLICKED for " + palabra);
    console.log(verbo);
    this.muestraConjugacion(verbo);
  }

  muestraConjugacion(verbo){
    if(verbo==null){
      swal({
        title: "Tut mir leid!",
        text: "Es gibt keine Informationen",
        icon: "error",
        button: "schließen",
      });
    }else{
      
      let presente = verbo.presente.split(',');
      let pasado = verbo.pasado.split(',');
      let participioperfecto = verbo.participioperfecto;
      let participiopresente = verbo.participiopresente;
      let irregular = verbo.irregular;
      let tipoVerbo = "regular";
      if(irregular) tipoVerbo = "Irregular";


      let textoAMostrar=`Art des Verbs: ${tipoVerbo}
      Partizip präsentieren: ${participiopresente}
      perfektes Partizip:   ${participioperfecto}
      Präsens: ${presente}
      Vergangenheit: ${pasado}`;
     
      swal({
        title: "Mehr Informationen",
        text: textoAMostrar,
        icon: "success",
        button: "Ok",
      });
    }
    
  }
  

  async getVerboInfo(palabra){
    let result = null;
    
    let strApi = getApi("verbo","dev");

    let urlBusqueda = strApi + "/" + palabra;
    let verbos = null;
    await fetch(urlBusqueda,{mode:'cors'}).then( response => {
      return response.json();
    }).then(data=>{
      verbos = data;
    })
    .catch(error=>{
      console.log("consulta.js::componentDidMount::error = " + error );
    })
 
    console.log("RESULTADO BUSQUEDA CONJUGACION");
    console.log(verbos);
    try{
      if(verbos.ok){
        if(verbos.verbos.length>0){
          console.log("existe  conjugacon");
          result = verbos.verbos[0];
        }else{
          console.log("NO existe  conjugacon 1");
        }
      }else{
        console.log("NO existe  conjugacon 2");
      }
    }catch(e){
      console.log("NO existe  conjugacon. 3");
    }

    return result;
  }
 

  pintaPalabra(palabras){
    console.log("PINTAPALABRA");
    console.log(palabras);
   
    /* palabras es un array de json
   "verbos":[{"_id":"5c69461692af6d22f84fbc97","ale":"essen","presente":"essend,esse,isst,isst,essen,esst,essen","pasado":"","futuro":"","irregular":true,"participiopresente":"essend","participioperfecto":"gegessen","__v":0}]}
    */

    let htmlResult = "";

    let htmlResultArray = [];
    for(let i in palabras){
      let htmlPalabra = "";
      if(palabras[i].sustantivo){
        htmlPalabra = this.dameDivSustantivo(palabras[i]);
      }else{
        if(palabras[i].verbo){
          htmlPalabra = this.dameDivVerbo(palabras[i]);
        }else{
          htmlPalabra = this.dameDivOtro(palabras[i]);
        }
      }
      htmlResultArray[i] = htmlPalabra;
    }

    htmlResult = (
      <div>
        {htmlResultArray.map((result,index)=><div  key={index} className='palabrita'>{result}</div>)}
      </div>
    );

      
    let htmlRetorno = (
      <div>
        <h4>Ergebnis der Suche</h4>
        {htmlResult}
      </div>
    );

    return(
     htmlRetorno
    );

   
 
  }

  render() {
    const{palabras} = this.state;
    return (
      <div className="resultado">
        {this.pintaPalabra(palabras)}
      </div>
    );
  }
}
 
export default Palabra2;