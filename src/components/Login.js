import React, { Component } from "react";
import {api_login } from './../constants/api_url';
import swal from 'sweetalert';
import './styles.css';
 
class Login extends Component {

  constructor(props){
    super(props);

    console.log("Login Constructor");

    //vemos si estamos logueados
    let strLogin = 'borrado';
    if(localStorage.getItem('tokenUsuario')!=null){
      strLogin = 'ok';
    }

    this.state = {
      mi_token: strLogin,
      
    }

  }

  clearlogin = () => {
    localStorage.clear();
    swal({
      title: "Erfolgreich abgemeldet!",
      text: '',
      icon: "success",
      button: "schließen",
    });
     
    this.setState({mi_token:'borrado'});
 
  }

  login = () => {
    let user = this.usuarioInput.value.toLowerCase();
    let pwd = this.passwordInput.value.toLowerCase();
    if(user!="" && pwd!=""){
      console.log("LOGIN");

      let strDataBody = `email=${user}&password=${pwd}`;
      let fetchOptions = {
        method:'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        mode:'cors',
        body: strDataBody
      }
      fetch(api_login,fetchOptions).then( response => {
        return response.json();
      }).then(data=>{
        console.log("RESULTADO LOGIN");
        console.log(data);

        if(data.ok){
          swal({
            title: "Super!",
            text: 'Jetzt können Sie neue Wörter hochladen',
            icon: "success",
            button: "Ok",
          });
          let token = data.token;
          localStorage.setItem('tokenUsuario',token);
         
          this.setState( {
            mi_token: 'ok',
          });
         
        }else{
          localStorage.clear();
          this.setState({mi_token:'borrado'});
          swal({
            title: "Benutzer nicht gültig",
            text: '',
            icon: "error",
            button: "schließen",
          });
        }
      })
      .catch(error=>{
        localStorage.clear();
        this.setState({mi_token:'borrado'});
        console.log("post.js::error post = " + error );
        swal({
          title: "Administrator existiert nicht!",
          text: "",
          icon: "error",
          button: "schließen",
        });
      })
    }
  }

  render() {
    return (
      <div className='login'>
        <div>
          <h4>Wenn Sie neue Wörter hochladen möchten, 
          <br></br>
          müssen Sie sich als Admin-Benutzer anmelden.
          <br></br>
          </h4>
          <h5>Zum Beispiel: manolinlao@gmail.com - meloncio25</h5>
        
        </div>
        
        {this.state.mi_token=='borrado'?
          <div className="user">Nutzername: Gast</div>:
          <div className="user">Nutzername: Admin.</div>
        }
        <br></br>
        <form>
          <div className="formulario">
            <div className="fila">
              <div className="columna1">
                Nutzer:
              </div>
              <div className="columna2">
                <input autoFocus ref={(usuario)=>{this.usuarioInput = usuario;}} type="text" name='usuario' id='usuario'/>
              </div>
            </div>
            <div className="fila">
              <div className="columna1">
                Passwort:
              </div>
              <div className="columna2">
                <input ref={(password)=>{this.passwordInput = password;}} type="password" name='password' id='password'/>
              </div>
            </div>
           <br></br>
            
          </div>
        
        </form>
        <button onClick={this.login} className="botonein">Einloggen</button>
        <button onClick={this.clearlogin} className="botonaus">Ausloggen</button>
           
      </div>
    );
  }
}
 
export default Login;