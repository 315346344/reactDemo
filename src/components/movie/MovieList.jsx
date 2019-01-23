import React, {Component} from 'react';
import MovieItem from './MovieItem.jsx';


import {Spin, Alert, Pagination} from 'antd';

import fetchJSONP from 'fetch-jsonp';

class MovieList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      // 电影
      movies: [],
      // 页码
      nowPage: parseInt (props.match.params.page) || 1,
      // 每页展示多少条
      pageSize: 14,
      // 当前分类共有多少条
      total: 0,
      // 判断是否数据正在加载
      isloading: true,
      // 要请求的列表类型
      movieType: props.match.params.type,
    };
  }

  componentWillMount () {
    this.loadMovieLsit ();
  }

  // 每当地址栏变化 重新发起请求
  componentWillReceiveProps (nextProps) {
    // 先重置数据
    this.setState (
      {
        isloading: true,
        nowPage: parseInt (nextProps.match.params.page) || 1,
        movieType: nextProps.match.params.type,
      },
      function () {
        this.loadMovieLsit ();
      }
    );
  }

  // 获取后台数据
  loadMovieLsit = () => {
    const startPage = this.state.pageSize * (this.state.nowPage - 1);
    const url = `https://api.douban.com/v2/movie/${this.state.movieType}?start=${startPage}&count=${this.state.pageSize}`;

    fetchJSONP (url)
      .then (response => {
        return response.json ();
      })
      .then (data => {
        this.setState ({
          // 隐藏loading
          isloading: false,
          // 电影列表赋值
          movies: data.subjects,
          // 记录总条数
          total: data.total,
        });
        
      })
      .catch(ex => {
        console.log("请求失败，王八豆瓣");
        
      })
  };

  render () {
    return (
      <div>
        {this.renderList ()}
      </div>
    );
  }

  renderList = () => {
    if (this.state.isloading) {
      return (
        <Spin tip="Loading...">
          <Alert message="正在请求电影列表" description="精彩内容马上呈现" type="info" />
        </Spin>
      );
    } else {
      return (
        <div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {this.state.movies.map ((item, i) => {
              return <MovieItem {...item} key={i} history={this.props.history} />;
            })}
          </div>
          <Pagination
            defaultCurrent={this.state.nowPage}
            total={this.state.total}
            pageSize={this.state.pageSize}
            onChange={this.pageChanged}
          />
        </div>
      );
    }
  };

  // 分页
  pageChanged = (page) => {
    // 使用路由进行编程式导航
    this.props.history.push('/movie/' + this.state.movieType + '/' + page)
  };
}

export default MovieList;
