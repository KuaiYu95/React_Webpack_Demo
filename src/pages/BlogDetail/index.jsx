import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Comment from '@component/Comment';
import util from '@utils/util';
import api from '@api/index';
import './index.less'

function Footer(props) {

  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData()
  }, [])

  const getData = (flag = true) => {
    setLoading(true)
    api.queryGetBlogDetail({ _id: props.id }).then(res => {
      setDetail(res.data.data)
      setLoading(false)
      flag && handleView(res.data.data)
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  const handleView = (data) => {
    api.queryAddBlogView({ _id: props.id }).then(() => {
      setDetail({ ...data, viewCount: data.viewCount + 1 })
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  const updateCommentCount = () => {
    setDetail({ ...detail, commentCount: detail.commentCount + 1 })
  }

  const handleLike = () => {
    api.queryAddBlogLike({ _id: props.id }).then(() => {
      setDetail({ ...detail, likeCount: detail.likeCount + 1 })
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  const handleDownload = () => {
    const { title, text } = detail
    util.download(title, text)
    api.queryBlogDownload({ _id: props.id }).then(() => {
      setDetail({ ...detail, downloadCount: detail.downloadCount + 1 })
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  const { typeIds = [], title, text, likeCount, viewCount, commentCount, downloadCount, lastModifyTime, uploadTime } = detail
  if (loading) {
    return <div className='loading'>正在玩命加载中...</div>
  } 
  return (
    <div className='detail'>
      <div className='title'>{title}</div>
      <div className="author">要什么自行车</div>
      <div className="types">
        {typeIds.map((type, idx) => <span key={idx}>{type}</span>)}
      </div>
      <div className='todo'>
        <div className="like" onClick={() => handleLike()}>点赞 <span>{likeCount || 0}</span></div>
        <div className="comment" onClick={() => location.href = '#comment'}>评论 <span>{commentCount || 0}</span></div>
        <div className="download" onClick={() => handleDownload()}>下载 <span>{downloadCount || 0}</span></div>
        <div className="view">阅读 <span>{viewCount || 0}</span></div>
        <div className="reflash" onClick={() => getData(false)}>刷新</div>
      </div>
      <ReactMarkdown escapeHtml={false} source={text} className='markdown-body' />
      <div className="time">
        {lastModifyTime && <div className="last-modify-time">
          <span>更新时间：</span>
          {util.time(+lastModifyTime, 'YYYY-MM-DD')}
        </div>}
        {uploadTime && <div className="upload-time">
          <span>上传时间：</span>
          {util.time(+uploadTime, 'YYYY-MM-DD')}
        </div>}
      </div>
      <Comment id={props.id} updateCommentCount={() => updateCommentCount()} />
    </div>
  )
}

export default Footer