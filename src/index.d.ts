// Externals
declare module 'ramda';
declare module 'react-router-dom';
declare module 'react-redux';
// Image related
declare module '*.ico';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.gif';
// Routes
interface Match {
  params: string;
  isExact: string;
  path: string;
  url: string;
}
