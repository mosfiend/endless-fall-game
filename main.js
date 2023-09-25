import './style.css'
import { Manager } from './manager.js'
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(800, 600, 0x2E3037);
const loader = new LoaderScene();
Manager.changeScene(loader);
