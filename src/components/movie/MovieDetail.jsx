import React, {Component} from 'react';
import fetchJSONP from 'fetch-jsonp';
import {Button, Icon, Spin, Alert} from 'antd';

class MovieDetail extends Component {
  constructor (props) {
    super (props);

    this.state = {
      info: {},
      isLoading: true,
    };
  }

  // 获取数据
  componentWillMount () {
    fetchJSONP (
      'https://api.douban.com/v2/movie/subject/' + this.props.match.params.id
    )
      .then (res => res.json ())
      .then (data => {
        this.setState ({
          info: data,
          isLoading: false
        });
      });
  }

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.goBack}>
          <Icon type="left" />返回电影列表
        </Button>
        {this.renderInfo()}
      </div>
    );
  }
  // 返回按钮
  goBack = () => {
    this.props.history.go (-1);
  };

  renderInfo = () => {
    if (this.state.isLoading) {
      return (
        <Spin tip="Loading...">
          <Alert message="正在请求电影详细" description="精彩内容马上呈现" type="info" />
        </Spin>
      );
    } else {
      return (
        <div style={{textAlign: 'center'}}>
          <h1>{this.state.info.title}</h1>
          <img src={this.state.info.images.large.replace('img1.doubanio.com','img3.doubanio.com')}/>
          <p style={{textIndent: '2em', lineHeight: '30px'}}>
            {this.state.info.summary}
          </p>
        </div>
      );
    }
  };
}

export default MovieDetail;