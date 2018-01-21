/* eslint-env jest */
const { createElement: h } = require('react');
const { default: styled } = require('styled-components');
const renderToString = require('./renderToString');
/* workaround for https://github.com/styled-components/styled-components/issues/893 */
const { default: StyleSheet } = require('styled-components/lib/models/StyleSheet');
StyleSheet.reset(true); // reset to use server stylesheet

function ExampleComponent({ text = 'Hello', isBold = false }) {
  return h('div', { style: isBold ? { fontWeight: 'bold' } : undefined }, text);
}

const Box = styled.div`
  background: ${props => (props.emphasis ? 'hotpink' : 'pink')};
`;

describe('renderToString', () => {
  it('should render with default props', () => {
    expect(renderToString(ExampleComponent, {})).toMatchSnapshot();
  });

  it('should render with interesting props', () => {
    expect(renderToString(ExampleComponent, { text: 'changes', isBold: true })).toMatchSnapshot();
  });

  it('should render a styled component', () => {
    expect(renderToString(Box, {})).toMatchSnapshot();
  });

  it('should render a styled component with a prop', () => {
    expect(renderToString(Box, { emphasis: true })).toMatchSnapshot();
  });
});
