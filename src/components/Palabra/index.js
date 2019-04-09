import React, { Component } from "react";
import './styles.css';
 
class Palabra extends Component {

  constructor(props){
    super(props);
   
    const {data} = props;
   
    this.state = {
      data,
    }

  }

  pintaPalabra(data){
    let literalAle = `Deutsch: ${data.ale}`;
    let literalCas = 'Spanien: ' + data.cas;
    let literalPlural = 'Plural: ' +data.plural;
    let literalPresente = '';
    let literalPasado = '';
    if(data.presente!='')
      literalPresente = 'Präsens: ' + data.presente;
    if(data.pasado!='')
      literalPasado =  'Vergangenheitsform: ' + data.pasado;
    
    if(data.sustantivo){
      return(
        <div>
          {literalAle}<br></br>
          {literalCas}<br></br>
          {literalPlural}<br></br>
          <br></br>
        </div>
      );
    }

    if(!data.verbo){
      return(
        <div>
          {literalAle}<br></br>
          {literalCas}<br></br>
          <br></br>
          <br></br>
        </div>
      );
    }

    //es un verbo
    return(
      <div>
        {literalAle}<br></br>
        {literalCas}<br></br>
        {literalPresente}<br></br>
        {literalPasado}<br></br>
      </div>
    );
    
  }

  render() {
    const{data} = this.state;
    return (
      <div className="palabra">
        {this.pintaPalabra(data)}
      </div>
    );
  }
}
 
export default Palabra;