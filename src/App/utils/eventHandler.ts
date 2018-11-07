export const getEventValue = <E = any>(fn: any) => (e: React.ChangeEvent<E>) => {
  if (e) {
    const target = e.target || (e as any).srcElement;
    return fn && fn(target ? target.value : e);
  }
};

export const withPreventDefault = <E = any>(fn: any) => (e: React.SyntheticEvent<E>) => {
  e.preventDefault();
  return fn && fn(e);
};
