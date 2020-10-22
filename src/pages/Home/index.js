import React from 'react'
import big from '@images/big.png';
import './index.less'

export default function Home() {
    return (
        <div>
            hello world

            <span className="iconfont icon-aixin"></span>
            <span className="iconfont icon-bianji"></span>
            <span className="iconfont icon-dianzan"></span>
            <span className="iconfont icon-dingwei"></span>
            <span className="iconfont icon-dianying"></span>
            <span className="iconfont icon-ditu"></span>
            <span className="iconfont icon-huati"></span>
            <span className="iconfont icon-nan"></span>
            <span className="iconfont icon-nv"></span>
            <img src={big} />
        </div>
    )
}
