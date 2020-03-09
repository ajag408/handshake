import React from 'react';
import { shallow } from 'enzyme';
import CompanySignin from './components/Company/company-signin.component';

describe('Login component tests', ()=> {
    const wrapper = shallow(<CompanySignin />);

    it('should have a btn component', ()=> {

        //There should be only one button
        expect(wrapper.find('Button')).toHaveLength(1);

        //Button should be of type button
        expect(wrapper.find('Button')
        .type().defaultProps.type)
        .toEqual('button');

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Sign In');
    });


    it('should have input for email and password', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('FormGroup')).toHaveLength(2);

    });


    it('should have an empty email and password state var', ()=> {
        //Optionally test to check if password and email are empty strings on 
          // setup
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('password')).toEqual('');
    });



});
