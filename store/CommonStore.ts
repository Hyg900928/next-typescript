import RootStore from './RootStore'

class CommonStore {
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
}

export default CommonStore
