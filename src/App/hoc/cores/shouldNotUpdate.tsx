import React, { Component } from 'react';
// TYPES
const shouldNotUpdate = (ChildComponent: React.ComponentType<any>) => {
  class ShouldNotUpdate extends Component<any> {
    shouldComponentUpdate() {
      return false;
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return ShouldNotUpdate;
};
export default shouldNotUpdate;
