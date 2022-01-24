import React from "react";
import shortid from 'shortid';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tarea: '',
      idTarea: '',
      listaTareas: [],
      modoEdicion: false,
      error: null
    }
  }

  agregarTarea = (e) => {
    e.preventDefault();
    const tarea = this.state.tarea.trim();
    const lista = this.state.listaTareas;
    if(!tarea){
      console.log('Elemento vacio');
      this.setState({error: 'Ingrese una tarea...'});
      return      
    }

    const elemTarea = {
      nombreTarea: tarea,
      id: shortid.generate()
    };

    this.setState({listaTareas: [...lista, elemTarea], tarea: '', error: null});
  }

  eliminarTarea = (id) => {
    const lista = this.state.listaTareas.filter(elemento => elemento.id !== id);
    this.setState({listaTareas: lista});
  }
  
  editar = (item) => {
    this.setState({modoEdicion: true, tarea: item.nombreTarea, idTarea:item.id});
  }

  editarTarea = (e) => {
    e.preventDefault();
    const tarea = this.state.tarea.trim();
    const id = this.state.idTarea;

    if(!tarea){
      console.log('Elemento vacio');
      this.setState({error: 'Ingrese una tarea...'});
      return;
    }

    const lista = this.state.listaTareas.map(item => {
      if(item.id === id){
        item.nombreTarea = tarea;
        return item;
      } else{
        return item
      }
    });
    this.setState({listaTareas: lista, modoEdicion: false, tarea: '', error: null});
  }

  render(){
      return (
        <div className="container mt-5">
          <h1 className='text-center'> CRUD simple</h1>
          <hr />
          <div className="row">
            <div className="col-8">
              <h4>Lista de tareas</h4>
              <ul className="list-group">
                {
                 this.state.listaTareas.map((elem) => 
                    <li className="list-group-item" key={elem.id}>
                      <span className="lead">{elem.nombreTarea}</span>
                      <button className="btn btn-danger btn-sm float-end mx-2" onClick={() => this.eliminarTarea(elem.id)}>Eliminar</button>
                      <button className="btn btn-warning btn-sm float-end" onClick={() => this.editar(elem)}>Editar</button>
                    </li>
                 )
                }
              </ul>
            </div>
            <div className="col-4">
              <h4>
                {
                  this.state.modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                }
              </h4>

              <form onSubmit={this.state.modoEdicion ? this.editarTarea : this.agregarTarea}>

                {
                  this.state.error ? <span className="text-danger">{this.state.error}</span> : null
                }
                <input type='text'
                className = 'form-control mb-2'
                placeholder="Ingrese Tarea" 
                value={this.state.tarea}
                onChange={e => {this.setState({tarea: e.target.value})}} />
                <div className="d-grid">
                  {
                    this.state.modoEdicion ?(
                      <button className="btn btn-warning" 
                      type="submit">
                        Editar
                      </button>) : (
                      <button className="btn btn-dark" 
                      type="submit">
                        Agregar
                      </button>)
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }  
  
}

export default App;
