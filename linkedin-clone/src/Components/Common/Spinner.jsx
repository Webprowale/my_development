import React from 'react'
import { Space, Spin } from 'antd'
function Spinner() {
  return (
    <div>
        <Space size="middle">
            <Spin size='large'/>
        </Space>
    </div>
  )
}

export default Spinner