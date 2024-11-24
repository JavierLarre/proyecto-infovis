import { plotData } from "./src/plot/plot.js";
import { aruco } from "./src/aruco/aruco.js";

aruco.start();

await plotData();

