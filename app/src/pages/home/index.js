import React from 'react';

import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

class Home extends React.Component {
  state = {
    sidebarOpen: true,
  };

  render() {
    const { sidebarOpen } = this.state;
    return (
      <div>
        <Header isSidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
    );
  }
}

export default Home;
