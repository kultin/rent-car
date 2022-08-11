import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
class AppLoader extends React.Component {
  render() {
    return <ThreeDots color='red' height={100} width={100} />;
  }
}

export default AppLoader;
