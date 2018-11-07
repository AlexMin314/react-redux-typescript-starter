import React, { Component } from 'react';
// TYPES
interface IProps {}

const toScrollTop = (ChildComponent: React.ComponentType<IProps>) => {
  class ToScrollTop extends Component<IProps> {
    componentDidMount() {
      setTimeout(() => window.scrollTo(0, 0));
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return ToScrollTop;
};
export default toScrollTop;
