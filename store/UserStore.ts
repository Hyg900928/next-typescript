import { action, observable } from 'mobx'
import RootStore from './RootStore'

class UserStore {
    public rootStore: RootStore;

    @observable stars = 0

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @action setStars = (num: any) => {
        this.stars = num
    }
}

export default UserStore
