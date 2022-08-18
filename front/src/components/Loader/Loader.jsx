import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './loader.modules.scss';

class AppLoader extends React.Component {
  render() {
    return <ThreeDots color='red' height={100} width={100} style={{justifyContent: 'center'}}/>;
  }
}

export default AppLoader;
