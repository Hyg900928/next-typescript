import React from 'react'
import { NextPageContext } from 'next'

interface Props {
    userAgent: string;
}

class Example extends React.Component<Props, any> {
    // static async getInitialProps(ctx: NextPageContext) {       
    // }

    render() {
        return (
            <div>
                example
            </div>
        )
    }
}

export default Example
