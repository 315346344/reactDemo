import React, {Component} from 'react';
// import ReactTypes from 'prop-types';

import {HashRouter, Route, Link} from 'react-router-dom';

// 引入组件
import Home from './components/home/HomeContainer.jsx'
import Movie from './components/movie/MovieContainer.jsx'
import About from './components/about/AboutContainer.jsx'

// css
// import './App.scss'
// import './App.css'
import styles from './App.scss'

// ui
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
const {Header, Content, Footer} = Layout;


class App extends Component {
  constructor (props) {
    super (props);

    this.state = {};
  }


  render () {
    return (
      // 使用HashRouter  路由就开始启用了
      // HashRouter的内部只能有1个根元素（div）
      (
        <HashRouter>
          {/* flex:1  height:'100%' */}
          <Layout className="layout" style={{height:'100%'}}>
            <Header>
              <div className={styles.logo} />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                style={{lineHeight: '64px'}}
              >
                <Menu.Item key="home">
                <Link to="/home">首页</Link>  
                </Menu.Item>
                <Menu.Item key="movie">
                <Link to="/movie/in_theaters/1">电影</Link> 
                </Menu.Item>
                <Menu.Item key="about">
                <Link to="/about">关于</Link> 
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{background: '#fff',flex:1}}>
            <Route path="/home" component={Home}></Route>
            <Route path="/movie" component={Movie}></Route>
            <Route path="/about" component={About}></Route>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </HashRouter>
      )
    );
  }
}

export default App;
