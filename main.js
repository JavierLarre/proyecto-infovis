import { plotData } from "./src/plot/plot.js";
import { aruco } from "./src/aruco/aruco.js";

await plotData();

aruco.start();