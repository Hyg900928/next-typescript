import React from 'react'
import Link from 'next/link'
import styles from './index.scss'

const Index = () => {
    return (
        <div>
            首页
            <p className={styles.main}>Hello world</p>
            <Link href='/example'><a>example</a></Link>
        </div>
    )
}

export default Index
