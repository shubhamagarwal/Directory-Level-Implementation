import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../aasets/css/style.css';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            directory: []
        }
    }

    componentWillMount(){
       let parentData = JSON.parse(localStorage.getItem('directory'));
       let filterByParent = parentData.filter(data => data.title == this.props.match.params.term);
       let parentGenearalId = filterByParent[0].id;
       let parentFixId = filterByParent[0].parent;
       localStorage.setItem('parentGenearalId', parentGenearalId);
       localStorage.setItem('parentFixId', parentFixId);
       let getChildren = this.getNestedChildren(parentData,parentFixId);
       localStorage.setItem('directory1', JSON.stringify(getChildren));
       console.log(getChildren);

    }
    
    getNestedChildren(arr, parent) {
        var out = []
        for(var i in arr) {
            if(arr[i].parent == parent) {
                var children = this.getNestedChildren(arr, arr[i].id)

                if(children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
    }

     checkDuplicateFolder(arr, dirName, e){
        let folderNames =  JSON.parse(localStorage.getItem('directory'));
        let folder = arr.filter(dir => dir.id === parseInt(localStorage.getItem('parentGenearalId')));
        if(folder.length){
            let ChildFolder = folder[0].children.filter(dir => dir.title === dirName);
            if(ChildFolder.length){
                this.setState({errorMessage: 'You can not set the folder name with the same name'});
                e.preventDefault();
                return false;
            }
        }
    }

    login(e) {
        let directory = [];
        if(JSON.parse(localStorage.getItem('directory')) !== null){
           directory = JSON.parse(localStorage.getItem('directory'));  
        } else {
            directory = this.state.directory;        
        }
        directory.push({
            id: parseInt(localStorage.getItem('IncrementId')),
            title: this.directoryName.value,
            parent:parseInt(localStorage.getItem('parentGenearalId'))
        });
        this.setState({directory});
        let getChildren = this.getNestedChildren(directory,parseInt(localStorage.getItem('parentFixId')));
        //this.checkDuplicateFolder(getChildren, this.directoryName.value,e);
        localStorage.setItem('directory', JSON.stringify(directory));
        localStorage.setItem('directory1', JSON.stringify(getChildren));
        e.preventDefault();
    }
    render(){
        const dir = JSON.parse(localStorage.getItem('directory1'));
        const childData = dir.filter(data=> data.id === parseInt(localStorage.getItem('parentGenearalId')));
        const { match } = this.props;
        return(
            <div id="loginPage">
                <h1 className="heading">Directory Level Implementation</h1>
               <form onSubmit={(e) => this.login(e)}>               
                    <div id="login">
                        <input type="text" id="directory" placeholder="directory" ref={ (input) => { this.directoryName = input } }/>
                    </div>
                </form>
                {childData.length && 'children' in childData[0] ? 
                (<ul>
                    {
                        childData[0].children.map((name, index) =>{
                            return(
                                <li className="dir" key={index}><i className="fa fa-folder"></i>
                                    <Link to={`${match.url}/${name.title}`}>{name.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>) : ''}
                <span className="error">
                    { this.state.errorMessage }
                </span>
                {/* <Route path={`${match.path}`} component={Login}/> */}
            </div>
        )
    }
}


export default Login;