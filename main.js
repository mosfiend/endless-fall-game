import "./style.css";
import { Master } from "./master/master.js";
import { LoaderScene } from "./master/LoaderScene";

Master.initialize(800, 600, 0x2e3037);
const loader = new LoaderScene();
Master.changeScene(loader);
