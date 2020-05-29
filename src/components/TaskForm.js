import React, { Component } from 'react';


/**+-(8)-Formularios(Forms) en React.js 16:_ Los Formularios sirven para Ingresar Nueva Información/Datos en Nuestra Aplicación Web, por ejemplo, si en nuestra Aplicación de Tareas queremos
 * agregar Nuevas Tareas.*/
export default class TaskForm extends Component {

    state = {
        title: '',
        description: ''
    }

    onSubmit = (e) => {
        this.props.addTask(this.state.title, this.state.description);/**+-(9)-Invocamos Acá la Función "addTask(title, description) que creamos en el Archivo "App.js" para que Cuando se Presione el Botón
        "Submit" se Guarden con la Función los Datos Escritos hasta el Momento.*/
        e.preventDefault();/**+-El Método-Función "element.preventDefault()" lo que hace es Prevenir los Comportamientos Estándar de los Elementos a los que es Asignado, en este caso Previene el Refresco de la Página
        al Apretar el Botón "Submit" Del Formulario ya que eso puede ser molesto para el Usuario.*/
    }

    onChange = (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
        /**+-Este Método-Función "onChange lo que hace es "escuchar"(Detectar) Lo que se está Escribiendo en Vivo en los Formularios donde es Invocado, y la Información de lo que se Está 
        escribiendo se Identifica con "***.target.value".*/
    }

    render() {
        return (
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" 
                        name="title"
                        placeholder="Write a Task..." 
                        onChange={this.onChange} 
                        value={this.state.title} 
                        />
                        <br/> {/**+-NOTA:_En JSX Las Etiquetas "<br>" de HTML son Autocerradas.*/}
                        <br/>
                        <textarea name="description" 
                        placeholder="Write Task Description..." 
                        onChange={this.onChange} 
                        value={this.state.description} 
                        />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
        );
    }
}

