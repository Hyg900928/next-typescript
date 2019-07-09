import React from 'react'
import { Provider, inject, observer } from 'mobx-react'
import App, { Container, AppContext } from 'next/app'
// import Head from 'next/head'
import { withRouter } from 'next/router'
import { BaseLayout } from '@/widgets/layout'
import RootStore, { initRootStore } from 'STORE/RootStore'

interface PropComponentProps {
    Component: any;
    pageProps: any;
    router: any;
    rootStore: RootStore;
}


@inject('rootStore')
@observer
class PropComponent extends React.Component<PropComponentProps, any> {
    render() {
        const { Component, pageProps, router } = this.props
        /**
         * for different route, you can use different layout for different page
         */
        return (
            <Container>
                {/* <Head>
                    <title>My Next.js Application</title>
                </Head> */}
                <BaseLayout rootStore={this.props.rootStore} router={router}>
                    <Component {...pageProps} rootStore={this.props.rootStore} router={this.props.router} />
                </BaseLayout>
            </Container>
        )
    }
}


class MyApp extends App<PropComponentProps, any> {
    public rootStore: RootStore;

    static async getInitialProps(context: AppContext) {
        const { Component, ctx } = context
        let pageProps = {}

        if (Component.getInitialProps) {
            // getInitialProps钩子，
            pageProps = await Component.getInitialProps(ctx)
        }
        const isServer = !!ctx.req
        return { pageProps, isServer }
    }

    constructor(props: PropComponentProps) {
        super(props)
        this.rootStore = initRootStore()
    }

    render() {
        const { Component, pageProps, router } = this.props

        return (<Provider>
            <PropComponent pageProps={pageProps} Component={Component} rootStore={this.rootStore} router={router} />
        </Provider>)
    }
}

export default withRouter(MyApp)
