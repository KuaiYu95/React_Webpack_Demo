import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Comment from '@component/Comment';
import TopModal from '@component/TopModal';
import util from '@utils/util';
import api from '@api/index';
import './index.less'

function Footer(props) {
  const query = util.query()
  const { ky = '' } = query
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = (flag = true) => {
    setLoading(true)
    api.queryGetBlogDetail({ _id: props.id }).then(res => {
      setDetail(res.data.data)
      setLoading(false)
      flag && handleView(res.data.data)
      util.success('加载成功，记得评论哦')
    }).catch(() => {
      util.error('网络异常，请稍后再试')
    })
  }

  const handleView = (data) => {
    if (ky === '1') {
      return
    }
    api.queryAddBlogView({ _id: props.id }).then(() => {
      setDetail({ ...data, viewCount: data.viewCount + 1 })
    }).catch(() => {
      util.error('网络异常，请稍后再试')
    })
  }

  const updateCommentCount = () => {
    setDetail({ ...detail, commentCount: detail.commentCount + 1 })
  }

  const handleLike = () => {
    if (ky === '1') {
      util.warning('不要 face 给自己点赞')
      return
    }
    api.queryAddBlogLike({ _id: props.id }).then(() => {
      util.success('感谢博友的认可')
      setDetail({ ...detail, likeCount: detail.likeCount + 1 })
    }).catch(() => {
      util.error('网络异常，请稍后再试')
    })
  }

  const handleDownload = () => {
    const { title, text } = detail
    util.download(title, text)
    api.queryBlogDownload({ _id: props.id }).then(() => {
      setDetail({ ...detail, downloadCount: detail.downloadCount + 1 })
    }).catch(() => {
      util.error('网络异常，请稍后再试')
    })
  }

  const handleEdit = () => setEdit(true)
  const handleCancel = () => setEdit(false)
  const submit = (title, types, md) => {
    const { html = '', commentCount = 0, likeCount = 0, collectCount = 0, viewCount = 0, uploadTime, _id } = detail
    const typeIds = types.replace(/[ ]/g, "").replace(/，/g, ",").split(',').filter( it => it)
    const text = md.trim()
    if (title.trim() === '') {
      util.warning('请填写标题')
    } else if (typeIds.length === 0) {
      util.warning('未给上传文件添加标签！')
    } else if (text === '') {
      util.warning('请上传内容')
    } else {
      const lastModifyTime = new Date().getTime()
      const data = { _id, title: title.trim(), text, html, typeIds, uploadTime, lastModifyTime, commentCount, likeCount, collectCount, viewCount }
      api.queryUpdateBlog(data).then(() => {
        util.success('更新好了')
        getData()
        setEdit(false)
      }).catch(() => {
        util.error('网络异常，请稍后再试')
      })
    }
  }

  const { typeIds = [], title, text, likeCount, viewCount, commentCount, downloadCount, lastModifyTime, uploadTime } = detail
  if (loading) {
    return <div className='loading'>正在玩命加载中...</div>
  } 
  return (
    <div className='detail'>
      {edit && <TopModal 
        way='edit'
        title={title}
        typeIds={typeIds}
        submit={submit}
        handleCancel={handleCancel}
      />}
      <div className='title'>{title}</div>
      <div className="author">要什么自行车</div>
      <div className="typeIds">
        {typeIds.map((type, idx) => <span key={idx}>{type}</span>)}
      </div>
      <div className='todo'>
        <div className="reflash" onClick={() => getData(false)}>刷新</div>
        {ky === '1' && <div className="edit" onClick={() => handleEdit()}>更新</div>}
        {ky === '1' && <div className="delete" onClick={() => handleDelete()}>删除</div>}
        <div className="like" onClick={() => handleLike()}>点赞 <span>{likeCount || 0}</span></div>
        <div className="comment" onClick={() => location.href = '#comment'}>评论 <span>{commentCount || 0}</span></div>
        <div className="download" onClick={() => handleDownload()}>下载 <span>{downloadCount || 0}</span></div>
        <div className="view">阅读 <span>{viewCount || 0}</span></div>
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