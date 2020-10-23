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


  const { typeIds = [], title, text, likeCount, commentCount, downloadCount, lastModifyTime, uploadTime } = detail
  return (
    <div className='detail'>
      <div className='title'>{title}</div>
      <div className="author">要什么自行车</div>
      <div className="types">
        {typeIds.map((type, idx) => <span key={idx}>{type}</span>)}
      </div>
      <ReactMarkdown escapeHtml={false} source={text} className='markdown-body' />
    </div>
  )
}

export default Footer