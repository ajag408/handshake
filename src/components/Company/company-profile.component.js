  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './companyNav.component';
import Content from './companyProfContent.component';


export default class CompanyProfile extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLoc= this.onChangeLoc.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyPhone = this.onChangeCompanyPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      loc: '',
      description: '',
      email: '',
      phone: '',
      profPic: ''
    }
    axios.get('http://localhost:4000/companies/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.email){
        window.location.href = "/company-signin";
      } else {
        this.setState({
          name : res.data.name,
          loc: res.data.loc,
          description: res.data.description,
          email: res.data.email,
          phone: res.data.phone,
          profPic: 'http://localhost:4000/companies/profPic/' + res.data.profPicOG
          });
      }
    });

    // axios.get('http://localhost:4000/companies/profPic')
    // .then(res => {
    //     console.log(res);
    //     this.setState({profPic: res});
    // })
}


  onChangeName(e) {
    this.setState({name: e.target.value})
  }


  onChangeLoc(e) {
    this.setState({loc: e.target.value})
  }

  onChangeDescription(e) {
    this.setState({description: e.target.value})
  }

  onChangeCompanyEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeCompanyPhone(e) {
    this.setState({phone: e.target.value})
    
  }




  onSubmit(e) {

    e.preventDefault()

    const companyObject = {
        name : this.state.name,
        loc: this.state.loc,
        description: this.state.description,
        email: this.state.email,
        phone: this.state.phone,

    };

    axios.put('http://localhost:4000/companies/update-company', companyObject)
      .then(res => {
          if(res.data.name == "MongoError"){
            alert("Unsuccessful update");
          } else {
            alert("Successful update");
            window.location.href = "/company/profile";
          }
        }     
      );
    // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
    
}
    onUpload(e){
        e.preventDefault();
        const files = document.getElementById('INPUT_TAG').files;
        console.log(files);
        const formData = new FormData();
        formData.append('image', files[0]);
        // console.log(formData);
        axios.post('http://localhost:4000/companies/profPic', formData)
        .then(res => {
            if(res.data.name == "MongoError"){
              alert("Unsuccessful update");
            } else {
              alert("Successful update");
            //   this.setState({profPic: 'http://localhost:4000/companies/profPic/'+ files[0].name})
              window.location.href = "/company/profile";
            }
          }     
        );
        console.log(files[0])
    }

  render() {



    return (  <div>
    <Navigator/>
    <Content onSubmit = {this.onSubmit} state = {this.state} onChangeName= {this.onChangeName} onChangeLoc= {this.onChangeLoc}
    onChangeDescription = {this.onChangeDescription}
    onChangeCompanyEmail = {this.onChangeCompanyEmail}
    onChangeCompanyPhone = {this.onChangeCompanyPhone}
    onUpload = {this.onUpload} />

        </div> 
  
    );        
  }
}
