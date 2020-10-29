import dva from 'dva';
import './index.less';
import 'antd/dist/antd.css';
import { createBrowserHistory } from 'history'
import RouterConfig from './router'

// 初始化
const app = dva({
  history: createBrowserHistory(),
});

// Models
app.model(require('./models/user').default);
app.model(require('./models/class').default);
app.model(require('./models/org').default);

// 路由
app.router(RouterConfig)

// 启动
app.start(`#root`);
