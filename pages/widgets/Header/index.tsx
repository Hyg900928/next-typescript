import React from 'react'

// const { SubMenu } = Menu;
// const MenuItemGroup = Menu.ItemGroup;

interface Props {
    selectedKeys: any;
}
interface State {
    current: any;
}

class CommonHeader extends React.Component<Props, State> {
    render() {
        // const { selectedKeys } = this.props
        return (
             <div>头部啊</div>
        )
    }
}
export default CommonHeader
