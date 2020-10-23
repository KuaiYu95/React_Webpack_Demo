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
    api.queryGetBlog({ currentPage: 1, pageSize: 100, searchSort: 0, searchValue: '', searchType: '' }).then(res => {
      this.setState({ list: res.data.data, totalItems: res.data.totalItems })
    })
  }

  render() {
    const { list = [] } = this.state
    const { handleDetail } = this.props
    return (
      <div className='articals'>
        {list.length > 0 && list.map(item => {
          const { typeIds = [], title, text, likeCount, commentCount, downloadCount, html, lastModifyTime, uploadTime, _id } = item
          return <div className='artical-item' key={_id} onClick={() => handleDetail(_id)}>
            <div className='left' title={title}>
              <span className='time'>【 {util.time(+lastModifyTime, 'YYYY-MM-DD') || util.time(+uploadTime, 'YYYY-MM-DD')} 】</span>
              <span className='title'>{title}</span>
            </div>
            <div className='right'>
              <span>点赞 {likeCount || 0}</span>
              <span>评论 {commentCount || 0}</span>
              <span>下载 {downloadCount || 0}</span>
            </div>
          </div>
        })}
      </div>
    )
  }
}

export default Articals