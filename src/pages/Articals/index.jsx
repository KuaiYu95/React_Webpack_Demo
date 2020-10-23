import React, { Component } from 'react'
import util from '@utils/util';
import api from '@api/index';
import './index.less'

class Articals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    api.queryGetBlog({ currentPage: 1, pageSize: 20, searchSort: 0, searchValue: '', searchType: '' }).then(res => {
      this.setState({ list: res.data.data, totalItems: res.data.totalItems })
    })
  }

  render() {
    const { list = [] } = this.state
    return (
      <div className='articals'>
        {list.length > 0 && list.map(item => {
          const { typeIds = [], title, text, likeCount, commentCount, downloadCount, html, lastModifyTime, uploadTime, _id } = item
          return <div className='artical-item' key={_id}>
            <div className='title'>{title}</div>
            {typeIds.map(it => <div>{it}</div>)}
            <div>{text.slice(0, 200)}</div>
            <div>{html.slice(0, 200)}</div>
            <div>{util.time(lastModifyTime)} - {util.time(uploadTime)}</div>
            <div>{likeCount} {commentCount} {downloadCount}</div>
          </div>
        })}
      </div>
    )
  }
}

export default Articals