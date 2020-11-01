import React, { useState} from 'react';
import './index.less';

function TopModal(props) {
  const { typeIds = [], handleTypes, handleCancel, submit } = props
  const [md, setMd] = useState('');
  const [title, setTitle] = useState(props.title || '');
  const [types, setTypes] = useState(typeIds.join(',') || props.types || '');

  if (props.way === '') {
    return null
  }

  const getFile = event => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader()
      if (/\.md$/.test(file.name)) {
        reader.onload = e => {
          setMd(e.target.result)
        }
        reader.readAsText(file);
      } else {
        util.warning('仅支持上传 markdown 文件！')
      }
    }
  }

  const dom = {
    'upload': <div className='oprate-file'>
      <div>文件：{props.title}.md</div>
      <div className='types'>
        <span>标签：</span>
        <input value={props.types} onChange={e => handleTypes(e)} />
      </div>
      <div className="submit">
        <span className='btn cancel' onClick={() => handleCancel()}>取消</span>
        <span className='btn' onClick={() => submit()}>上传</span>
      </div>
    </div>,
    'edit': <div className='oprate-file'>
      <div className='types'>
        <span>文件：</span>
        <input value={props.title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className='types'>
        <span>标签：</span>
        <input value={types} onChange={e => setTypes(e.target.value)} />
      </div>
      <div className='upload-file'>
        上传：
        {md.length === 0 ? <label htmlFor={"upload"}>
          <span className='btn'>选择文件</span>
          <input style={{ display: 'none' }} id="upload" type="file" onChange={getFile} />
        </label> : <span>已上传</span>}
      </div>
      <div className="submit">
        <span className='btn cancel' onClick={() => handleCancel()}>取消</span>
        <span className='btn' onClick={() => submit(title, types, md)}>更新</span>
      </div>
    </div>,
  }

  return <div className='window-modal'>
    {dom[props.way]}
  </div>
}

export default TopModal