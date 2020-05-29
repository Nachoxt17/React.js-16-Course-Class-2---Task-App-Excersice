import React, { Component } from 'react';

/**+-(10)-Fetching Data(Solicitar Datos):_Normalmente cuando Creamos una Web App usamos Información(Texto, Posts, Comentarios, Imágenes, Videos, Mensajes, Notificaciones, Etc) Proveniente de Servidores
 * (O sea del Back-End), acá vamos a Aprender a Cómo Solicitar esa Información de los Servidores como Desarrolladores Front-End.*/
export default class Posts extends Component {

    state = {
        posts: []
    }
    /**+-Con el Método "fetch(***)" donde "***" es el URL del Objeto JSON con los Datos Correspondientes(En este caso sacados de una Página que Presta este Tipo de Datos Genéricos para usarlos Como Ejemplo y para
     *  Aprender) Importamos estos Datos. "async" sirve para Indicar que la Respuesta de Los Comandos Indicados dentro de esa Función pueden Tardar en LLegar y "await" Indica que no se Termina de Ejecutar y Devolver
     * esa Función hasta que Llegue el Valor de la const/let/var/Dato con el Prefijo "await".*/
    async componentDidMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        this.setState({posts: data});
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                {
                    this.state.posts.map(post =>  
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                    )
                }
            </div>
        )
    }
}
