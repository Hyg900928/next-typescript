import React from 'react'
import getConfig from 'next/config'
import Document, { Head, Main, NextScript } from 'next/document'

const { publicRuntimeConfig } = getConfig()
class MyDocument extends Document {
    static async getInitialProps(ctx:any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    {/* <title>My page title</title> */}
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                    <script src={`${publicRuntimeConfig.staticFolder}/js/mediascreen.js`}></script>
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default MyDocument
