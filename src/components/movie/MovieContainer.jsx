import React, {Component} from 'react';

import {Route, Link, Switch} from 'react-router-dom';

import MovieList from './MovieList.jsx';
import MovieDetail from './MovieDetail.jsx';

import {Layout, Menu} from 'antd';

const {Content, Sider} = Layout;

class Movie extends Component {
  constructor (props) {
    super (props);

    this.state = {};
  }

  render () {
    return (
      <Layout style={{height: '100%'}}>
        <Sider width={200} style={{background: '#fff'}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.hash.split ('/')[2]]}
            style={{height: '100%', borderRight: 0}}
          >
            <Menu.Item key="in_theaters">
              <Link to="/movie/in_theaters/1">正在热映</Link>
            </Menu.Item>
            <Menu.Item key="coming_soon">
              <Link to="/movie/coming_soon/1">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="top250">
              <Link to="/movie/top250/1">Top250</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{paddingLeft: '1px'}}>
          <Content
            style={{
              background: '#fff',
              padding: 10,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/movie/detail/:id" component={MovieDetail} />
              <Route path="/movie/:type/:page" component={MovieList} />
            </Switch>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Movie;
