import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import util from '@utils/util';
import api from '@api/index';
import './index.less'

function Footer(props) {

  const [detail, setDetail] = useState({});

  useEffect(() => {
    api.queryGetBlogDetail({ _id: props.id }).then(res => {
      setDetail(res.data.data)
    })
  }, [])


  const { typeIds = [], title, text, likeCount, viewCount, commentCount, downloadCount, lastModifyTime, uploadTime } = detail
  return (
    <div className='detail'>
      <div className='title'>{title}</div>
      <div className="author">要什么自行车</div>
      <div className="types">
        {typeIds.map((type, idx) => <span key={idx}>{type}</span>)}
      </div>
      <div className='todo'>
        <div className="like">点赞 <span>{likeCount}</span></div>
        <div className="comment">评论 <span>{commentCount}</span></div>
        <div className="download">下载 <span>{downloadCount}</span></div>
        <div className="view">阅读 <span>{viewCount}</span></div>
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
    </div>
  )
}

export default Footer