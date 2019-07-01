import React from 'react'
import { Provider } from 'mobx-react'
import { Layout } from 'antd'
import RootStore, { initRootStore } from 'STORE/RootStore'
// import DevTools from 'mobx-react-devtools'
import Header from '@/widgets/Header'

const { Content } = Layout

interface BaseLayoutProps {
    router:any;
    children: React.ReactNode;
    rootStore: RootStore;
}

class BaseLayout extends React.Component<BaseLayoutProps, any> {
    public rootStore: RootStore;

    static getInitialProps(ctx: any) {
        const { req } = ctx
        const isServer = !!req
        return { isServer }
    }

    constructor(props: any) {
        super(props)
        this.rootStore = initRootStore()
    }

    render() {
        const { router } = this.props
        const headerProps = {
            selectedKeys: router.query['key'] ? [router.query['key']] : ['home'],
        }
        return (
            <Provider rootStore={this.rootStore}>
                <div>
                    <Layout>
                        <Header { ...headerProps } />
                        <Content style={{ padding: '0 50px', minHeight: 300 }}>
                           <div style={{ padding: 24, background: '#fff', minHeight: 300 }}>{this.props.children}</div>
                        </Content>
                    </Layout>
                    {/* {__DEV__ === true ? <DevTools /> : null} */}
                </div>
            </Provider>
        )
    }
}

export default BaseLayout
