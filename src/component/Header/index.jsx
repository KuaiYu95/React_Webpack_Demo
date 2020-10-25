import React, { Component } from 'react'
import api from '@api/index';
import util from '@utils/util';
import './index.less'

class Header extends Component {

  constructor(props) {
    super(props);
    this.query = util.query()
    this.state = {
      adverb: util.currentTime(),
      title: '',
      text: '',
      types: ''
    }
  }

  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({ adverb: util.currentTime() })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeId)
  }

  getFile = event => {
    if (event.target.files.length) {
      console.log(event.target.files.length)
      const file = event.target.files[0];
      const reader = new FileReader()
      if (/\.md$/.test(file.name)) {
        reader.onload = e => {
          this.setState({
            title: file.name.split('.md')[0],
            text: e.target.result
          })
        }
        reader.readAsText(file);
      } else {
        util.showToast('仅支持上传 markdown 文件！')
      }
    }
  }

  handleTypes = e => {
    this.setState({ types: e.target.value })
  }

  handleCancel = () => {
    this.setState({ title: '' })
    util.showToast('已取消')
  }

  submit = () => {
    const { title, text, types } = this.state
    const uploadTime = new Date().getTime()
    const lastModifyTime = uploadTime
    const commentCount = 0
    const likeCount = 0
    const downloadCount = 0
    const viewCount = 0
    const typeIds = types.replace(/[ ]/g, "").replace(/，/g, ",").split(',')
    if (typeIds.length === 0) {
      util.showToast('未给上传文件添加标签！')
    } else {
      api.queryAddBlog({ title, text, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, downloadCount, viewCount }).then(res => {
        this.setState({ title: '', text: '', types: '' })
      }).catch(() => {
        util.showToast('网络异常，请稍后再试')
      })
    }
  }

  render() {
    const { adverb, title, types } = this.state
    const { edit } = this.query
    return (
      <div className='header'>
        <div className='time-line'>
          <div className='time'>{adverb}</div>
          <div>hello world</div>
          <div className='header-nav'>
            <span onClick={() => this.props.init()}>首页</span>
            {edit === '1' ? <label htmlFor={"up"}>
              <span>上传</span>
              <input style={{ display: 'none' }} id="up" type="file" onChange={this.getFile} />
            </label> : <span onClick={() => util.showToast('没有权限！')}>上传</span>}
            <a title='KuaiYu95' href="https://github.com/KuaiYu95">Github</a>
          </div>
        </div>
        {title && <div className='window-modal'>
          <div className='upload-file'>
            <div>文件：{title}.md</div>
            <div className='types'>
              <span>标签：</span>
              <input value={types} onChange={e => this.handleTypes(e)} />
            </div>
            <div className="submit">
              <span className='cancel' onClick={() => this.handleCancel()}>取消</span>
              <span onClick={() => this.submit()}>上传</span>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default Header