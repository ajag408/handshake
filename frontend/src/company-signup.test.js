import React from 'react';
import { shallow } from 'enzyme';
import CreateCompany from './components/Company/create-company.component';

describe('Signup component tests', ()=> {
    const wrapper = shallow(<CreateCompany />);

    it('should have a btn component', ()=> {

        //There should be only one button
        expect(wrapper.find('Button')).toHaveLength(1);

        //Button should be of type button
        expect(wrapper.find('Button')
        .type().defaultProps.type)
        .toEqual('button');

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Create Company');
    });


    it('should have input for name, email, password, and location', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('FormGroup')).toHaveLength(4);

    });


    it('should have an empty state var', ()=> {
        //Optionally test to check if password and email are empty strings on 
          // setup
          expect(wrapper.state('name')).toEqual('');
          expect(wrapper.state('password')).toEqual('');
        expect(wrapper.state('email')).toEqual('');
        expect(wrapper.state('loc')).toEqual('');
    });



});
