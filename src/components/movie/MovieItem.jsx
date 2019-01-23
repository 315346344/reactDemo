import React, {Component} from 'react';

import styles from '../../css/movie_item.scss'

import { Rate } from 'antd';

class MovieItem extends Component {
  constructor (props) {
    super (props);

    this.state = {};
  }

  render () {
    return (
      <div className={styles.box} onClick={this.getDetail}>
        <img src={this.props.images.small.replace('img1.doubanio.com','img3.doubanio.com')} className={styles.img} alt=""/>
        <h4>{this.props.title}</h4>
        <h4>上映年份：{this.props.year}</h4>
        <h4>电影类型：{this.props.genres.join(',')}</h4>
        <Rate disabled defaultValue={this.props.rating.average / 2} />
      </div>
    );
  } 

  getDetail= ()=>{
    this.props.history.push('/movie/detail/' + this.props.id)
  }
}

export default MovieItem;
