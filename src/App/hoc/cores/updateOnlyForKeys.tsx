import React, { Component } from 'react';
// UTILS
import { get } from 'lodash';
// TYPES
export interface IConnectedProps {}

// HELPERS
export const pick = (obj: any, keys: string[], specialKey?: string[]) => keys.reduce((a, key) => {
  const target = get(obj, [...specialKey], obj);
  if (target.hasOwnProperty(key)) {
    a[key] = target[key];
  }
  return a;
}, {} as any);

export const is = (x: any, y: any) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
};

export const shallowEqual = (objA: any, objB: any) => {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null
    || typeof objB !== 'object' || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!objB.hasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
};

const updateOnlyForKeys = (specialKey?: string[]) => (keys: string[]) => (ChildComponent: React.ComponentType<any>) => {
  class UpdateOnlyForKeys extends Component<any> {
    shouldComponentUpdate(nextProps: any) {
      return !shallowEqual(pick(nextProps, keys, specialKey), pick(this.props, keys, specialKey));
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return UpdateOnlyForKeys;
};
export default updateOnlyForKeys;
