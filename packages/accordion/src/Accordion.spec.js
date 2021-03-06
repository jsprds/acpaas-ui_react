import React from 'react';
import { shallow, mount } from 'enzyme';
import Accordion from './Accordion';
import AccordionTab from './AccordionTab/AccordionTab';

describe('Accordion', () => {
  test('Can render', () => {
    const component = shallow(<Accordion />);

    expect(component.find('.m-accordion')).toBeDefined();
  });

  test('Can contain one or more AccordionTab-components', () => {
    const component = mount(
      <Accordion>
        <AccordionTab />
        <AccordionTab />
        <AccordionTab />
      </Accordion>,
    );

    expect(component.find('.m-accordion__tab')).toBeDefined();
    expect(component.find('.m-accordion__tab').length).toEqual(3);
  });
});
