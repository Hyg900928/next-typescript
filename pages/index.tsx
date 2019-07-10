import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import styles from './index.scss'

const Index = () => {
    return (
        <div>
            首页
            <p className={styles.main}>Hello world</p>
            <Link href='/example'><a>example</a></Link>
            <Button type='primary'>确定</Button>
        </div>
    )
}

export default Index
