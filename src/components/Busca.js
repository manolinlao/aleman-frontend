import React, { Component } from "react";
import {transformDataConsultaPalabra} from '../services/api_consultas';
import {api_consulta_ale,api_consulta_cas } from './../constants/api_url';
import {api_consulta_ale_Produccion,api_consulta_cas_Produccion} from './../constants/api_url';
import Palabra2 from './Palabra2';

 
class Busca extends Component {

    constructor(props){
        super(props);
        

      
        this.state = {
            palabrasEncontradas: null,
            valorFormulario:'',
        }

        let idiomaElegido = 'ale';
        
    }
  

    handleSubmit = (event) => {       
        event.preventDefault();
        //alert("busca palabra por return = " + this.state.valorFormulario);
    }

    handleChange = (event) => {
        this.setState({valorFormulario: event.target.value});
    }

    borraFormulario = () => {
        this.setState({valorFormulario:''});
        this.nameInput.focus();
    }

  

    busca = () => {
        let palabraABuscar = this.state.valorFormulario.trim();
        
        let idioma = this.idiomaElegido;
        console.log("BUSCAAAAA:::"+idioma);
        if(palabraABuscar !== '' ) {
            this.buscaPalabra(palabraABuscar,idioma);
        }
        this.nameInput.focus();
    }

    async buscaPalabra(palabra,idioma){


        let strApiAle = api_consulta_ale_Produccion;
        let strApiCas = api_consulta_cas_Produccion;

        console.log("MLAO::PROCESS=" + process.env.NODE_ENV);

        if(process.env.NODE_ENV==="dev" || process.env.NODE_ENV==="development"){
            strApiAle = api_consulta_ale;
            strApiCas = api_consulta_cas;
        } 

        console.log("MLAO::strApiAle=" + strApiAle);
        
        let urlBusqueda = strApiAle+palabra;
        if(idioma==="cas"){
            urlBusqueda = strApiCas+palabra;
        }

        let palabras = null;
        await fetch(urlBusqueda,{mode:'cors'}).then( response => {
            return response.json();
          }).then(data=>{
            palabras = transformDataConsultaPalabra(data);
          })
          .catch(error=>{
            alert("excecpion = " + error);
            console.log("consulta.js::componentDidMount::error = " + error );
          })

       

        console.log("BUSQUEDA");
        console.log(palabras);
        
        if(palabras.length===0){
            palabras = null;
        }else{
            
        }

        this.setState({
            palabrasEncontradas:palabras,
        });
        
    }

    setGender = (event) => {
        this.idiomaElegido = event.target.value;
        this.nameInput.focus();
    }

    resultadoBusqueda = () => {
        console.log("RESULTADO BUSQUEDA");
        if(this.state.palabrasEncontradas!=null){
            console.log(this.state.palabrasEncontradas);
            console.log("IDIOMA = " + this.idiomaElegido);
           
            return(
               <div className="busca">
                   <Palabra2 key={this.state.palabrasEncontradas[0].cas} palabras={this.state.palabrasEncontradas}></Palabra2>
               </div>
            );
        }else{
            return(
                ""
            );
        }
    }


    render() {
        
        return (
            <div>
          <div className="busca">
            
            <form onSubmit={this.handleSubmit}>
              
                <div className="fila">
                    <div className="columna1">
                        Wort:
                    </div>
                    <div className="columna2">
                    <input autoFocus ref={(input)=>{this.nameInput = input;}} type="text" name='palabra' id='palabra' value={this.state.valorFormulario} onChange={this.handleChange}/>
                    </div>
                    <div className="columna3">
                        <div onChange={this.setGender}>
                            <input type="radio" value="cas" name="gender"/> Spanien
                            <input type="radio" value="ale" name="gender" defaultChecked/> Deutsch
                        </div>
                    </div>
                </div>
                
                <div className="botones">
                    <button onClick={this.busca} className="botonein">Suche</button>
                    <button onClick={this.borraFormulario} className="botonaus">Löschen</button>
                </div>
            </form>
            <br></br>
            
          </div>

            
            {this.resultadoBusqueda()}
            

          </div>
        );
    }
}
 
export default Busca;