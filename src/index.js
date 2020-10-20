import dva from 'dva';
import './index.less';
import 'antd/dist/antd.css';
import { createHashHistory } from 'history'
import RouterConfig from './router'

// 初始化
const app = dva({
  history: createHashHistory(),
});

// Models
app.model(require('./models/user').default);
app.model(require('./models/class').default);

// 路由
app.router(RouterConfig)

// 启动
app.start(`#root`);
