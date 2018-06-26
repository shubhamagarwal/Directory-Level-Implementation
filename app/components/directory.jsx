import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../aasets/css/style.css';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            directory: []
        }
    }

    componentWillMount(){
        let i=0;
        if(localStorage.getItem('IncrementId') === null){
            i = 1;
            localStorage.setItem('IncrementId', i);
        } 
    }

    
    login(e) {
       let directory = [];
        if(JSON.parse(localStorage.getItem('directory')) !== null){
           directory = JSON.parse(localStorage.getItem('directory'));  
        } else {
            directory = this.state.directory;        
        }
       let folder = directory.filter(dir => dir.title === this.directoryName.value);
        if(folder.length){
            this.setState({errorMessage: 'You can not set the folder name with the same name'});
            return false;
        } else {
            directory.push({
                id: parseInt(localStorage.getItem('IncrementId')),
                title: this.directoryName.value,
                parent:0
            });
            this.setState({directory});
            let id = parseInt(localStorage.getItem('IncrementId'));
            id = id+1;
            localStorage.setItem('IncrementId', id);
            localStorage.setItem('directory', JSON.stringify(directory));
            e.preventDefault();
        }
        
    }
    render(){
        const directory = JSON.parse(localStorage.getItem('directory'));
        let parentData = [];
        if(directory != null){
             parentData = directory.filter(data=> data.parent === 0);
        }
        return(
            <div id="loginPage">
                <h2 className="heading">Directory Level Implementation</h2>
               <form onSubmit={(e) => this.login(e)}>               
                    <div id="login">
                        <input type="text" id="directory" placeholder="directory" ref={ (input) => { this.directoryName = input } }/>
                        {/* <button id="send">Login</button> */}
                    </div>
                </form>
                {parentData != null ? 
                (<ul>
                    {
                        parentData.map((dir, index) =>{
                            return(
                                <li className="dir" key={index}><i className="fa fa-folder"></i>
                                    <Link to={`/${dir.title}`}>{dir.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>) : ''}
                <span className="error">
                    { this.state.errorMessage }
                </span>
            </div>
        )
    }
}

export default Directory;