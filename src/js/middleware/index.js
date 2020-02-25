import { ADD_STUDENT } from "../constants/action-types";
import { SIGNIN_STUDENT } from "../constants/action-types";
import { LOGOUT_STUDENT } from "../constants/action-types";
import axios from 'axios';
export function studentMiddleware({ dispatch }) {
    return function(next) {
      return function(action) {
        if (action.type === ADD_STUDENT) {
            console.log(action.payload);
            axios.post('http://localhost:4000/students/create-student', action.payload)
            .then(res => {
                if(res.data.errno){
                    alert("Unsuccessful signup; make sure email is unique");
                } else {
                    alert("Successful signup");
                    window.location.href = "/student-signin";
                }
                }
            );
        }
        else if(action.type === SIGNIN_STUDENT){
                axios.post('http://localhost:4000/students/login', action.payload)
                    .then(res => {
                        if(res.data.isStudent){
                        window.location.href = "/student/landing";
                        } else {
                        alert(res.data);
                        }
                    }
                    );
        }
        else if(action.type === LOGOUT_STUDENT){
           axios.get('http://localhost:4000/students/logout')
                    .then(res => {
                        console.log(res);
                        window.location.href = "/";
                    });
        }
        return next(action);
      };
    };
  }