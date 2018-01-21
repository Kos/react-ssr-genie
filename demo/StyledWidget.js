const React = require('react');
const { default: styled } = require('styled-components');

const h = (...args) => React.createElement(...args);

const Wrapper = styled.div`
  border: 1px solid gray;
  padding: 1em;
`;

const Title = styled.h1`
  font-family: sans-serif;
`;

const Boxes = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Box = styled.span`
  margin: 1em;
  width: 5em;
  height: 5em;
  border: 1px solid gray;
  background: ${props => (props.emphasis ? 'hotpink' : 'pink')};
`;

module.exports = function StyledWidget() {
  return h(Wrapper, {}, [
    h(Title, {}, 'A component with styled-components'),
    h(Boxes, {}, [
      h(Box),
      h(Box, { emphasis: true }),
      h(Box),
      h(Box),
      h(Box, { emphasis: true }),
      h(Box),
      h(Box, { emphasis: true }),
      h(Box, { emphasis: true }),
    ]),
  ]);
};
