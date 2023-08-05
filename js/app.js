(function() {
    document.getElementById('txtNombre').focus();
})();

let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
const tiempo = 10;
let countdownfunction;

function validarNombre() {
   let nombre = document.getElementById('txtNombre').value;
   if(nombre.length === 0) {
       alert('Por favor ingresa tu nombre');
       document.getElementById('txtNombre').focus();
   } else {
       bienvenida(nombre);
   }
}

function bienvenida(nombre) {

   mostrarDiv('categoria');

   let mensaje = `¡Bienvenida ${nombre}!`;
   document.getElementById('msgHola').innerHTML = mensaje;

}

function cargarPreguntasTipo(tipo) {
   
   let titulo = '';
   reiniciar();

   if(tipo === 'A') {
       preguntas = [
           "1.- ¿Qué se utiliza principalmente para dar estilo y diseño a páginas web?",
           "2.- ¿Cuál de las siguientes etiquetas HTML se utiliza para crear un enlace o hipervínculo?",
           "3.- ¿Cuál es el estándar principal para crear y diseñar sitios web responsivos?"
       ];

       alternativas = [
           ["JavaScript","HTML","CSS"],
           ["link","a","ul"],
           ["CSS Grid","Bootstrap","CSS Flexbox"]
       ];
       

       rptas = [
           2,
           1,
           2
       ];

       titulo = 'Desarrollo Web';

   } else if(tipo === 'B') {
       preguntas = [
           "1.- ¿Qué comando se utiliza para crear una nueva rama (branch) en Git?",
           "2.- ¿Cómo se añaden los cambios al área de preparación (staging area) en Git?",
           "3.- ¿Qué comando se utiliza para combinar una rama con la rama actual en Git?"
       ];

       alternativas = [
           ["git branch nueva-rama","git make-branch nombre-rama","git create nueva-rama"],
           ["git commit cambios.txt","git stage cambios.txt","git add cambios.txt"],
           ["git combine otra-rama","git merge otra-rama","git join otra-rama"]
       ];

       rptas = [
           0,
           2,
           1
       ];

       titulo = 'Controlador de Versiones';

   }

   document.getElementById('msgCategoria').innerHTML = titulo;
   mostrarDiv('jugar');
   cargarPreguntas(index);

}

function siguiente() {
   document.getElementById('divrpta').style.display = 'none';
   index++;
   clearInterval(countdownfunction);
   if(index <= preguntas.length-1) {  
       cargarPreguntas(index);
   }
   
   if(index === preguntas.length) {  
       verResultados();
   }

}

function cargarPreguntas(indice) {
   
       document.getElementById('pregunta').innerHTML = preguntas[indice];
       let opciones = "";
       for(let j=0; j<alternativas[indice].length; j++) {
           opciones += "<p>";
           opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta("+j+")' name='opc' >"+ alternativas[indice][j] +"</label> ";
           opciones += "</p>";
       }
       
       document.getElementById('alternativas').innerHTML = opciones;
       
       iniciarTimer();

}

function iniciarTimer() {
   let trestante = tiempo;
   document.getElementById('timer').innerHTML = trestante;
   countdownfunction = setInterval(function() {
       trestante--;

       if(trestante === 0) {
           document.getElementById("timer").innerHTML = "X";
       } else if(trestante < 0) {
           trestante = tiempo;
           siguiente();
       } else {
           document.getElementById('timer').innerHTML = trestante;
       }
       console.log(trestante);


   },1000);

   
}

function checkRpta(rpta) {
   
   document.getElementById('divrpta').style.display = 'block';
   let mensaje = "RESPUESTA INCORRECTA :(";
   let color='red';
   

   if(rptas[index] === rpta) {
       mensaje = "RESPUESTA CORRECTA :)";
       correctas.push(index);
       color='green';
   }
   document.getElementById('divrpta').style.background =color;
   document.getElementById('divrpta').innerHTML = mensaje;
   deshabilitarRadios('radios');

}

function verResultados() {
   mostrarDiv('resultados');
   let template = '';
   let tempEstado = '';
   
   for(let i=0; i < preguntas.length; i++) {
       template += '<p>';
       
       let estado = 'INCORRECTO';
       let classEstado = 'incorrecto';

       for(let x of correctas) {
           if(x === i) {
               estado = 'CORRECTO';
               classEstado = 'correcto';
               break;
           }
       }

       tempEstado += '<label class="'+classEstado+'">'+estado+'</label>';
       template += '<h3>'+preguntas[i]+' '+tempEstado+'</h3>';

       template += '</p>';
       tempEstado = '';
   }

   document.getElementById('divresultado').innerHTML = template;

}


function mostrarDiv(div) {
   let ocultos = document.getElementsByClassName('box');
   for(var i=0, len=ocultos.length; i<len; i++) {
       ocultos[i].style.display = 'none'
   }
   document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
   let rds = document.getElementsByClassName(radios);
   for(var i=0, len=rds.length; i<len; i++) {
       rds[i].disabled = true;
   }
}

function reiniciar() {
   index = 0;
   correctas = [];
   preguntas = [];
   alternativas = [];
   rptas = [];
}

function cerrarSesion(){
   window.location.reload();
}