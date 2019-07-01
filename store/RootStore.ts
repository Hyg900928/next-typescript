
import CommonStore from './CommonStore'
import UserStore from './UserStore'
import ArticleStore from './ArticleStore';


let store: any = null

class RootStore {
    public userStore: UserStore;

    public commonStore: CommonStore;

    public articleStore: ArticleStore;

    constructor() {
        this.userStore = new UserStore(this)
        this.commonStore = new CommonStore(this)
        this.articleStore = new ArticleStore(this)
    }
}

export function initRootStore() {
    if (store === null) {
        store = new RootStore()
    }
    return store
}

export default RootStore
