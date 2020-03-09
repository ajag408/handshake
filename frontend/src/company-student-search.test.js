import React from 'react';
import { render} from 'enzyme';
import CompanyStudentsTab from './components/Company/StudentsTab/company-studentsTab.component';

describe('Company student search component tests', ()=> {
    var wrapper = render(<CompanyStudentsTab />);
    
    it('should have a nav', ()=> {
     
        expect(wrapper.find('Navigator'))
    });
    it('should have a search bar', ()=> {
     
        expect(wrapper.find('Input')).toHaveLength(1);
    });



    it('should have an empty search bar initially', ()=> {
        expect(wrapper.find('Input').text()).toContain('');
    });

});
