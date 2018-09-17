// Types
import { Action } from 'redux-act';
import { LogLevel, Option, P, M, FilterFn } from '@/App/store/middleware/logger/types';

export const getFilterList = (option: Option<LogLevel>) => {
  const checkerFn = (op: Option<LogLevel>) => (key: keyof Option<LogLevel>) => op[key] && (op[key] as string).length > 0;
  const checker = checkerFn(option);
  console.log(checker('whiteListed'));
  console.log(checker('blackListed'));
  const filterFn: FilterFn = checker('whiteListed')
    ? (type) => option.whiteListed.some(str => type.includes(str))
    : checker('blackListed')
      ? (type) => !option.blackListed.some(str => type.includes(str))
      : (type) => true;

  return (action: Action<P, M>): boolean => {
    return filterFn(action.type);
  };
};
