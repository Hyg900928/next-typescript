// import { action, observable } from 'mobx'
import RootStore from './RootStore'

class ArticleStore {
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }
}

export default ArticleStore
