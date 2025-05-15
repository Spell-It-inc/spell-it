import { Router } from "./utils/router.js";
import { HomeComponent } from "./components/home.js";
import { GameComponent } from "./components/game.js";
import { LoginComponent } from "./components/loginPage.js";

const router = new Router('main')
router.addDefault(new LoginComponent)
router.addRoute('home', new HomeComponent)
router.addRoute('game', new GameComponent)