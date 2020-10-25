import React, { Component } from 'react'
import util from '@utils/util';
import api from '@api/index';
import './index.less'

class Articals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 22,
      searchSort: 0,
      searchValue: '',
      searchType: '',
      list: [],
      totalItems: 0,
      loading: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { currentPage, pageSize, searchSort, searchValue, searchType } = this.state
    api.queryGetBlog({ currentPage, pageSize, searchSort, searchValue, searchType }).then(res => {
      this.setState({ list: res.data.data, totalItems: res.data.totalItems, loading: false })
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  handlePage = type => {
    const { currentPage } = this.state
    if (type === '-') {
      this.setState({ currentPage: currentPage - 1, loading: true }, () => {
        this.getData()
      })
    } else {
      this.setState({ currentPage: currentPage + 1, loading: true }, () => {
        this.getData()
      })
    }
  }

  render() {
    const { list = [], totalItems, currentPage, pageSize, loading } = this.state
    const { handleDetail } = this.props
    return (
      !loading ? <div className='articals'>
        {list.length > 0 && list.map(item => {
          const { title, likeCount, commentCount, downloadCount, viewCount, lastModifyTime, uploadTime, _id } = item
          return <div className='artical-item' key={_id} onClick={() => handleDetail(_id)}>
            <div className='left' title={title}>
              <span className='time'>【 {util.time(+lastModifyTime, 'YYYY-MM-DD') || util.time(+uploadTime, 'YYYY-MM-DD')} 】</span>
              <span className='title'>{title}</span>
            </div>
            <div className='right'>
              <span title='点赞'>👍 {likeCount || 0}</span>
              <span title='评论'>💬 {commentCount || 0}</span>
              <span title='下载'>🦐 {downloadCount || 0}</span>
              <span title='阅读'>👀 {viewCount || 0}</span>
            </div>
          </div>
        })}
        {totalItems > 0 && <div className='pagn'>
          <div className='up-page' onClick={() => this.handlePage('-')}>
            {currentPage > 1 ? '上一页' : ''}
          </div>
          <div className='total-count'>第 [ {currentPage} ] 页 {list.length} 篇，累计 {totalItems} 篇</div>
          <div className='down-page' onClick={() => this.handlePage('+')}>
            {list.length < pageSize || (totalItems === currentPage * pageSize) ? '' : '下一页'}
          </div>
        </div>}
      </div> : <div className='articals'>
          <div className='loading'>
            正在玩命加载中...
          </div>
        </div>
    )
  }
}

export default Articals