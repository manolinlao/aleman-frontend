//crea un array de json con el formato para el componente de Palabra

/*
const datoPalabra = {
    cas:'libro',
    ale:'das buch',
    plural:'die bücher',
    verbo:false,
    sustantivo:false,
    presente:'',
    pasado:'',
  }
*/

const transformDataConsulta = (data) => {
    let result = null;
    try{
        if(data.ok){
            if(data.cuantos>0){
                console.log("api_consultas::cuantos = " + data.cuantos);
                let palabras = [];
                for(let i in data.palabras){
                    let ale = data.palabras[i].ale;
                    let cas = data.palabras[i].cas;
                    let genero = data.palabras[i].genero;
                    let plural = data.palabras[i].plural;
                    let tipo = data.palabras[i].tipo;
                    let verbo = false;
                    let sustantivo = false;

                    if(tipo==='s'){
                        if(genero==='n') ale = "das " + ale;
                        if(genero==='f') ale = "die " + ale;
                        if(genero==='m') ale = "der " + ale;
                        if(plural===''){ 
                            plural = ale
                        }else{
                            plural = "die " + plural;
                        }                        
                        sustantivo = true;
                    }
                    if(tipo==='v'){
                        verbo = true;
                    }
                   
                    let palabra = {
                        'ale': ale,
                        'cas': cas,
                        'plural': plural,
                        'verbo': verbo,
                        'sustantivo':sustantivo,
                        'presente':'',
                        'pasado': '',
                    }

                    palabras.push(palabra);
                }
                return palabras;
            }
        }
    }catch(e){
        console.log("excepcion en transformDataConsulta",e);
    }
    return result;
};


const transformConjugaciones = (data)=>{
    let result = null;
    try{
        if(data.ok){
            return data.verbos;
        }
    }catch(e){
        console.log("excepcion en transformConjugaciones",e);
    }
    return result;
}


const procesaPalabras = (palabras,conjugaciones) => {
    //crea un array de jsons con las palabras y sus conjugaciones
    let palabrasProcesadas = [];
    for(let i in palabras){

        let presente = "";
        let pasado = "";
        if(conjugaciones!=null){
            if(palabras[i].verbo){
                for(let j in conjugaciones){
                    if(conjugaciones[j].ale===palabras[i].ale){
                        presente = conjugaciones[j].presente;
                        pasado = conjugaciones[j].pasado;
                        break;
                    }
                }
            }
        }

        let palabra = {
            ale:palabras[i].ale,
            cas:palabras[i].cas,
            plural:palabras[i].plural,
            sustantivo:palabras[i].sustantivo,
            verbo:palabras[i].verbo,
            presente:presente,
            pasado:pasado,
        }
        palabrasProcesadas.push(palabra);
    }
    return palabrasProcesadas;
}

const transformDataConsultaPalabra = (data) =>{
    let result = null;
    try{
        if(data.ok){
            let palabras = data.palabras;
            let palabrasProcesadas = [];
            for(let i in data.palabras){
                let ale = data.palabras[i].ale;
                let cas = data.palabras[i].cas;
                let genero = data.palabras[i].genero;
                let plural = data.palabras[i].plural;
                let tipo = data.palabras[i].tipo;
                let verbo = false;
                let sustantivo = false;

                if(tipo==='s'){
                    if(genero==='n') ale = "das " + ale;
                    if(genero==='f') ale = "die " + ale;
                    if(genero==='m') ale = "der " + ale;
                    if(plural===''){ 
                        plural = ale
                    }else{
                        plural = "die " + plural;
                    }                        
                    sustantivo = true;
                }
                if(tipo==='v'){
                    verbo = true;
                }
               
                let palabra = {
                    'ale': ale,
                    'cas': cas,
                    'plural': plural,
                    'verbo': verbo,
                    'sustantivo':sustantivo,
                    'presente':'',
                    'pasado': '',
                }

                palabrasProcesadas.push(palabra);
            }
            return palabrasProcesadas;
        }    
    }catch(e){
        result = null;
        console.log("transforDataConsultaPalabra. excepcion",e);
    }
    return result;
}

module.exports = {
    transformDataConsulta,
    transformConjugaciones,
    procesaPalabras,
    transformDataConsultaPalabra,
}


