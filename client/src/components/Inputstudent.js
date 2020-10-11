import React from 'react';
import axios from 'axios';
import image from '../images.jpg';
class Inputstudent extends React.Component{
    state = {
        firstname : '',
        lastname : '',
        place : ''
    }
    handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = () => {
        if(this.state.firstname!='' && this.state.lastname!='',this.state.place!=''){
            axios.post('http://localhost:5000/students', this.state)
            .then(res =>{
                console.log('Successfully Posted');
                this.setState({firstname:'', lastname:'', place:''})
            });
            window.location = '/';
            
        }
    }
    render(){
        return(
            <div className = "row text-center">
                <div className = "col-md-4">
                    <form onSubmit = {() => this.handleSubmit()} >
                        <input required onChange = {(e) => this.handleChange(e)} name ="firstname" value = {this.state.firstname} style = {{fontSize:'15px', fontFamily:'cursive,sans-serif,Gugi', borderRadius:'10px', marginLeft:'50px', marginTop:'20px'}} placeholder="First Name" className = "form-control"/>
                        <input required onChange = {(e) => this.handleChange(e)} name = "lastname" value = {this.state.lastname} style = {{fontSize:'15px', fontFamily:'cursive,sans-serif,Gugi', borderRadius:'10px', marginLeft:'50px', marginTop:'20px'}} placeholder="Last Name" className = "form-control"/>
                        <input required onChange = {(e) => this.handleChange(e)} name = "place" value = {this.state.place} style = {{fontSize:'15px', fontFamily:'cursive,sans-serif,Gugi', borderRadius:'10px', marginLeft:'50px', marginTop:'20px'}} placeholder="Place" className = "form-control"/>
                        <button style = {{borderRadius:'10px',fontFamily:'cursive,sans-serif,Gugi',fontSize:'19px',outline:'none' ,color:'white', backgroundColor:'#000066', marginLeft:'50px', marginTop:'20px', width:'435px'}} className="btn">CREATE</button>
                    </form>
                </div>
                <div className="col-md-8">
                    <img src ={image} style ={{marginTop :'30px'}} />
                </div>
            </div>
        )
    }
}

export default Inputstudent;