import React, { Component } from 'react'
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
    api.queryGetBlog({currentPage: 1, pageSize: 20, searchSort: 0, searchValue: '', searchType: ''}).then(res => {
      this.setState({ list: res.data.data })
    })
  }

  render() {
    const { list = [] } = this.state
    return (
      <div className='articals'>
        {list.length > 0 && list.map(item => {
          const { typeIds, title, text, likeCount, commentCount, downloadCount, html, lastModifyTime, uploadTime, _id } = item
          return <div className='artical-item' key={_id}>
            <div className='title'>{title}</div>
          </div>
        })}
      </div>
    )
  }
}

export default Articals