import { createApp } from './src/runtime-canvas';

import App from './App';

import { getRootContainer } from './Game'

createApp(App).mount(getRootContainer());