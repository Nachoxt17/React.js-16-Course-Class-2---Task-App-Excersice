import React from 'react';
import './App.css';
/**+-(11)-React Router:_Nos Sirve Para que Con Una Misma Página Podamos "Dividirla" en 2 o más Páginas y así mostrar sus Contenidos de Forma Separada Según Corresponda, por Ejemplo en Nuestra TaskApp vamos a querer
 * mostrar La Lista de Tareas y Los Post en "Sub-Páginas" Separadas. Acá Abajo Mostramos Cómo Importar React Router, el cual Antes Tenemos que Instalar a parte Codeando "npm install react-router-dom" en La Consola
 * en La Carpeta del Proyecto y Después Volver a Lanzar la App con "npm start".*/
import { BrowserRouter, Route, Link } from 'react-router-dom';

/**+-(1)-Acá vamos a Simular una Importación de Datos(de Tareas en este caso) desde un Servidor o Una API Creando la Constante "tasks" cuyos Datos Importamos del Archivo "tasks.json" que nosotros
 *  mismos creamos en La Carpeta "sample" en la misma Carpeta "src donde se Encuentra este Archivo "App.js".*/
import tasks from './sample/tasks.json';

/**+-(6)-Las PropType son la Forma de Especificar Qué Tipo de Dato esperamos Como Entrada(Input) en Ciertos Lugares, lo que ayuda a prevenir Errores de Tipeo. Para Poder Usarlas, debemos
 *  Importar la Biblioteca "PropTypes" desde 'prop-types' así:_.*/
import PropTypes from 'prop-types';

/**+-(8)-Acá Importamos el Componente "TaskForm" desde el Archivo "TaskForm.js" de la Carpeta "components"(Ir ahí para Seguir Leyendo y Aprendiendo).*/
import TaskForm from './components/TaskForm.js'

/**+-(10)-Acá Importamos el Componente "Posts" desde el Archivo "Posts.js" de la Carpeta "components" con el que Practicamos y Aprendemos Fetching Data(Solicitar Datos), Ir ahí para Seguir Leyendo y Aprendiendo.*/
import Posts from './components/Posts.js'

class App extends React.Component {

  state = {
    tasks: tasks
  }

/**+-(9)-Passing Functions:_Ahora que ya Podemos Recibir del Usuario una Nueva Tarea con el Componente "TaskForm", vamos a Guardar y Añadir esos Datos a la Lista de Tareas. Para eso, Escribiremos y Ejecutaremos
 * la Función "addTask(title, description)" a Continuación. De no entender el Código, volver a Estudiar Javascript hasta ES6 Incluido y Javascript Orientado a Objetos.*/
  addTask = (title, description) => {
    const newTask = {
      title: title,
      description: description,
      id: this.state.tasks.length
    }
    this.setState({
      tasks: [...this.state.tasks, newTask]
    });
  }

  /**+-(10)-Delete and Update:_Ya sabemos Cómo hacer para que el Usuario Pueda Ingresar, Agregar y Guardar una Tarea, y ahora vamos a ver cómo hacer para que también pueda Actualizar y/o Borrar una Tarea
   * con las Funciones que Vamos a Crear "deleteTask(id)" que vamos a Ejecutar al Hacerle Click (onClick={***}) a Los Botones con la "X" y "checkDone()":_.*/
  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks: newTasks});
  }

  checkDone = (id) => {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task;
    });
    this.setState({tasks: newTasks});
  }

  /**+-(5)-Si queremos que los Estilos de Nuestro/s Elemento/s JSX Cambien Según algún Motivo(En este Caso el State de la Propiedad "done", que es "true" o "false" dependiendo de que la Tarea esté Completa o Nó)
   *  podemos crear una Función-Método dentro de Nuestro Componente dentro de la Cual Escribir Estilos JSX junto con Condicionales de Javascript, como veremos en el Siguiente Ejemplo:_.*/
  StyleCompleted() {
    return {
      fontSize: '20px',
      color: this.state.tasks.done ? 'white' : 'green',
      textDecoration: 'none'
    }
  }


                /*+-(2)-Cuando se Itera sobre un Dato/Elemento en React.js 16 el mismo Programa precisa que le demos al Elemento JSX que vayamos a Renderizar Varias Veces el Atributo 
                "key={***}" donde en "***" va un "id" o cualquier Característica/Dato de los Elementos del Archivo JSON que no se repita de un Elemto a otro.*/
  render() {
    return <div>
            {/**+-(11)-Para Dividir la Página con React-Router creamos un Elemento JSX "<BrowserRouter>***</BrowserRouter>" donde en "***" hay 1 Elemento JSX "<Route>***</Route>" por Cada División de Página
              donde en "***" van los Componentes/Contenidos que van a ir de esa Página, Todos los Elementos JSX "<Route>***</Route>" tienen que tener un Atributo "path='***'" en donde '***' va la Sub-Ruta de
              Esa Sub Página, y si le Agregamos el Prefijo "exact " al Atributo "path='***'" en ese mismo Elemento JSX "<Route>***</Route>" se va a Mostrar SOLO los los Componentes/Contenidos que se Declaran ahí.
              +-Así, en el Elemento JSX "<Route exact path="/">***</Route>" se muestra sólo el Conteido Declarado ahí en ESA EXACTA SUB-RUTA y en el Elemento JSX "<Route path="/posts">***</Route>" se muestra
              lo Declarado SOLO ahí a pesar de que su Sub-Ruta Contiene "/" en su path="/posts".*/}
            <BrowserRouter>

              <Link to="/">Home</Link>
              <br/>
              <Link to="/posts">Posts</Link>
              <br/>
              <Route exact path="/" render={() => {
                return <div>
                  <TaskForm addTask={this.addTask} />

                  { this.state.tasks.map(element => 
                    <p key={element.id} className="green" style={this.StyleCompleted()}>
                    {/*+-(3)-En JSX para Agregar Estilos con Clases CSS/SASS (En este Caso desde el Archivo "App.css") se escribe "className" en Lugar de "class" para que no se Confunda con otros
                    Elementos de React.js 16. Para Agregar Estilos InLine(En Línea) se debe escribir en la Primera Etiqueta del Elemento JSX "style={{***}}" donde "***" son los Estilos CSS PERO escritos en formato JSON,
                      donde además los Guiones "-" en los Atributos de CSS como en "font-family" pasan a ser borados y la letra de la Siguiente Palabra a estar en Mayúscula (fontFamily: "Arial").*/}
                    {element.title} - 
                    {element.description} - 
                    {element.done} - 
                    {element.id}
                    {/**+-(10)-Acá Abajo Invocamos la Función "checkDone(id)" para Que Modifique el Estado del Objeto de la Tarea Mapeando el Array de Objetos-Tarea y Cambiando la Propiedad Booleana "done" de la Tarea que Tiene
                      el Mismo ID que la Tarea Cuyo CheckBox Fué Tildado o Destildado.*/}
                    <input type="checkbox" onChange={this.checkDone.bind(this, element.id)} />
                    {/**+-(10)-Acá Abajo Invocamos la Función "deleteTask(id)" para Que Modifique el Estado del Objeto de las Tareas Filtrando el Objeto y Eliminando la Tarea que Tiene el
                      Mismo ID que la Tarea Cuyo Botón "X" Fué Presionado.*/}
                    <button style={btnDelete} onClick={this.deleteTask.bind(this, element.id)} >X</button>
                    </p>
                  ) }
                </div>       
              }}>
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
            </BrowserRouter>
          </div>;
  }
                /*+-(2)-Acá vemos como en La Función Flecha se como Parámetro Toma al Elemento(element) Proveído por el Método ".map(***)" que se le hace al dato del Estado "tasks" que tiene como 
                valor la Const "tasks" cuyos datos Importamos del Archivo "tasks.json" ya en el Archivo "App.js" al que Exportaremos este Archivo "Tasks.js".*/
}

/**+-(7)-Ahora para poder Aplicar las Proptypes y Filtrar el Tipo de Dato que queremos que se Ingrese en Cierta Propiedad de Cierto Componente, escribimos "Component.propType = {***}" donde "Component" es el
 * nombre del Componente al que le vamos a Aplicar el Método PropType y "***" es donde vamos a escribir en Formato JSON cada Propiedad con Proptype a Filtrar así:_
 *  "property: PropTypes.typeOfData.isRequired" donde "typeOfData" es el Tipo de Dato de Javascript que queramos que se Inserte en esa Propiedad. Los Tipos de Datos de Javascript son:_ string, number, bool(boolean),
 *  array, object, func(function) y symbol.
 * +-A continuación, un Ejemplo de cómo hacemos para Filtrar que entre un Dato de Tipo "object" en la Propiedad "task" del Componente "App":_.*/
App.propType = {
  tasks: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
}


/*+-(4)-También en vez de Escribir los Estilos CSS con JSX Inline, se pueden Crear desde el Mismo React.js 16 Constantes o Variables que Contengan el Objeto JSON con los Estilos JSX Dentro y después llamar a esa
   Constante/Variable desde el Elemento JSX que la necesita. Como Ejemplo a continuación aplicaremos lo Anterior para agregrle Estilos JSX al Botón.*/
const btnDelete = {
  fontSize: '18px',
  background: '#ea2027',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '50%',
  cursor: 'pointer'
}


export default App;




/** +-(1)-Para Crear un Componente de React.js 16(Lo Cual es múy Útil para Reutilizar el Código de ese Componnte y que es la razón de Existir de React.js 16), Creamos una Función CON NOMBRE 
 * ya sea Una Función Tradicional dentro del cual creamos un "return (***);" donde los "***" es el Código JSX que va a mostrar el Componente en Sí, Una Función Flecha de JS ES6 en Forma de
 * una Constante CON NOMBRE cuyo valor es la Función Flecha en sí dentro cuyo Código se Encuentra en Código JSX o una Clase que se Extiende de React.Component(Así Hereda las Características de 
 * Un Componente Normal de React.js) dentro de la Cual se usa el Método-Función "render() { return ***; }" donde los "***" es el Código JSX.
 * NOTA: Al Retornar el Código JSX en Un Componente deben estar todos los Elementos HTML(JSX) dentro del UN MISMO ELEMENTO PADRE, por lo que se DEBE Siempre Primero Crear un 
 * <div> dentro del Cual Escribir todo lo demás.*/

/* function HelloWorld() {
  return (
    <div id="hello">Hello World</div>
  );
}

class ByeByeWorld extends React.Component {
  render() {
    return <div>Bye Bye World</div>;
  }
} */

/**+-(2)-Las Props(Propiedades) de los Componentes en React.js 16 actúan como Los Atributos de los Elementos HTML:_ Sirven para que un mismo Componente al Invocarlo varias veces Pero 
 * Ingresándole Distintos Parámetros(Como a una Función de JS) se presente de distintas Formas, LAS PROPS DON DATOS QUE NO VARÍAN UNA VEZ RENDERIZADAS.
 * Las Props se Utilizan en Forma de Objetos de JS Poniendo "props" como Parámetro a La Función del  Componente y luego escribiendo "{props.ObjectProperty}"(Entre LLaves similar a como en JQuery)
 *  donde "ObjectProperty" es la Propiedad del Objeto Props al cual le vamos a asignar uN Valor específico al Declarar al Componente en Formato de Elemento HTML AutoCerrado.
 * NOTA:_ En los Componentes Tipo Clase las Props(Propiedades) se escriben {this.props.ObjectProperty}(Igual que en los Componentes Tipo Función pero con un "this." adelante) ya que no son Funciones y no se le
 *  pueden Ingresar Parámetros.*/

/* function DefaultText(props) {
  return (
    <div>
      <h3>{props.subtitle}</h3>
      <div>{props.myText}</div>
    </div>
  );
} */

/**+-(3)-Los Estados:_ Dentro de los Componentes Tipo Clase puede crearse una Propiedad llamada State(Estado) el cual se Escribe "state = {***}" donde "***" son los Datos que SI PUEDEN VARIAR(LOS STATES A DIFERENCIA
 * DE LAS PROPS SÍ PUEDEN VARIAR/CAMBIAR DEPUÉS DE RENDERIZADO EL COMPONENTE) que se Escriben en Formato JSON y a partir de los cuales Puede Cambiar el Aspecto del Componente.
 * +-Por Ejemplo a Continuación Creamos el Componnte Tipo Clase "AnotherText" con un Botón que a través de Un "if(***){ *** }" al Hacerle un Click (onClick={***}) cambia el State(Estado) "{this.state.show}" y en 
 * Consecuencia Cambia el Aspecto del Componente.*/

/* class AnotherText extends React.Component {

  state = {
    show: true
  }

  render() {
    if (this.state.show) {
      return (
        <div>
          <h3>{this.props.subtitle}</h3>
          <div>{this.props.myText}</div>
          <button 
          onClick={() => this.setState({show: false})}
          >Toggle State</button>
        </div>
      );
    } else {
      return <div>
      <h1>There is No New Text Here.</h1>
      <button 
      onClick={() => this.setState({show: true})}
      >Toggle State</button>
      </div>;
    }
      
  }
} */


/** +-(4)-Como se puede ver a continuación, en React.js se puede meter un Componente "Hijo" dentro de un Componente "Padre" escribiendo el Nombre del Componente-Función "Hijo" en Formato de un
 *  Elemento HTML AutoCerrado así:_"<ChildComponent />". Se puede Invocar y Repetir cuantas veces se quiera.*/
 
/* const App = () => <div>
                    This is My Component: <HelloWorld />
                    <HelloWorld />
                    <ByeByeWorld />
                    <DefaultText subtitle="Jhon" myText="-How are you doing?" />
                    <DefaultText subtitle="Adam" myText="-Fine, I want to Drink a Coffee." />
                    <AnotherText subtitle="New Text" myText="Here is More New Text." />
                    <AnotherText subtitle="Hello" myText="Nice to meet you." />
                  </div>;

export default App;
 */
