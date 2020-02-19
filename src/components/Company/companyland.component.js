  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './companyNav.component';
import Content from './jobPostContent.component';


export default class CompanyJobPosting extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeCreated = this.onChangeCreated.bind(this);
    this.onChangeDeadline= this.onChangeDeadline.bind(this);
    this.onChangeJobLoc= this.onChangeJobLoc.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: '',
      created: '',
      deadline: '',
      loc: '',
      salary: '',
      description: '',
      cat: 'Full Time',
      jobs: [],
      companyName: '',
    }
    axios.get('http://localhost:4000/companies/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.email){
        window.location.href = "/company-signin";
      } else {
        this.setState({
          companyName : res.data.name
          
          });
          console.log(this.state.companyName);
      }
    });

  //   axios.get('http://localhost:4000/companies/get-jobs')
  //   .then((response) => {
  //   //update the state with the response data
  //   this.setState({
  //       jobs : this.state.jobs.concat(response.data)
        
  //   });
  //   console.log(this.state.jobs);
  //   });
  }

    // get the jobs data from backend  
    componentDidMount(){
      axios.get('http://localhost:4000/companies/get-jobs')
              .then((response) => {
              //update the state with the response data

            
              this.setState({
                  jobs : this.state.jobs.concat(response.data)
                  
              });
              console.log(this.state.jobs);
          });
  }

  onChangeJobTitle(e) {
    this.setState({title: e.target.value})
  }

  onChangeCreated(e) {
    this.setState({created: e.target.value})
  }

  onChangeDeadline(e) {
    this.setState({deadline: e.target.value})
  }

  onChangeJobLoc(e) {
    this.setState({loc: e.target.value})
  }

  onChangeSalary(e) {
    this.setState({salary: e.target.value})
  }

  onChangeJobDescription(e) {
    this.setState({description: e.target.value})
  }

  onChangeCategory(e) {
    this.setState({cat: e.target.value})
    
  }


  onSubmit(e) {

    e.preventDefault()

    const jobObject = {
      title: this.state.title,
      created: this.state.created,
      deadline: this.state.deadline,
      loc: this.state.loc,
      salary: this.state.salary,
      description: this.state.description,
      cat: this.state.cat,
    };

    axios.post('http://localhost:4000/companies/create-job', jobObject)
      .then(res => {
          if(res.data.name == "MongoError"){
            alert("Unsuccessful add");
          } else {
            alert("Successfully added new job");
            window.location.href = "/company/landing";
          }
        }     
      );
    // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
    
}


  render() {



    return (  <div>
    <Navigator/>
    <Content onSubmit = {this.onSubmit} state = {this.state} onChangeCreated = {this.onChangeCreated} onChangeJobTitle = {this.onChangeJobTitle}
    onChangeDeadline = {this.onChangeDeadline} onChangeJobLoc = {this.onChangeJobLoc}
      onChangeSalary = {this. onChangeSalary} onChangeJobDescription = {this.onChangeJobDescription}
    onChangeCategory = {this.onChangeCategory} />

        </div> 
  
    );        
  }
}