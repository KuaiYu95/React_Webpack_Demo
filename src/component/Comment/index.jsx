import React, { useState, useEffect } from 'react';
import api from '@api/index';
import util from '@utils/util';
import './index.less';

export default function Comment(props) {

  const [list, setList] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    api.queryGetComment({ blogId: props.id }).then(res => {
      setList(res.data.data)
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }, [])


  const handleChange = e => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    api.queryAddComment({ comment: text, time: new Date().getTime(), blogId: props.id, likeCount: 0 }).then(res => {
      setText('')
      setList([...list, res.data.data])
      props.updateCommentCount()
    }).catch(() => {
      util.showToast('网络异常，请稍后再试')
    })
  }

  return <div id="comment">
    <div className='submit'>
      <textarea className='textarea' value={text} onChange={e => handleChange(e)} rows={4} placeholder="来发表一下意见或者建议吧" />
      <div onClick={() => handleSubmit()}>发送</div>
    </div>
    {list.map(item => {
      return <div className='item' key={item._id}>
        <div className='comment-time'>#{item._id.slice(-8)} {util.time(+item.time)}</div>
        <div className='comment-content'>
          <div className='comment-text'>{item.comment}</div>
          <div className='comment-like'>👍 {item.likeCount}</div>
        </div>
      </div>
    })}
  </div>
}