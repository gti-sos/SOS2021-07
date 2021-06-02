const puppeteer = require('puppeteer');

//rutas
const RUTA_GENERAL = "screenshots/general";
const RUTA_INTEGRACIONES = "screenshots/integraciones";
const RUTA_UNEMPLOYMENT = "screenshots/unemployment";
const RUTA_RENTALS = "screenshots/rentals";
const RUTA_BUY_SELL = "screenshots/buy_sell";


(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 100,
    });

    //creamos page y establecemos tamaño del screenshot
    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 2000 });

    //vamos a la raíz
    await page.goto('http://localhost:10000/');

    //capturamos la raíz
    console.log(">> Inicio");
    await page.screenshot({ path: RUTA_GENERAL + "/inicio.png" });

    //clicamos en inicio antiguo y lo capturamos
    console.log(">> Inicio antiguo");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(4)");
    await page.screenshot({ path: RUTA_GENERAL + "/inicio_antiguo.png" });

    //volvemos a la raíz
    await page.goto('http://localhost:10000/');

    //clicamos en información y la capturamos
    console.log(">> Información");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(5)");
    await page.screenshot({ path: RUTA_GENERAL + "/informacion.png" });

    //volvemos a la raíz
    await page.goto('http://localhost:10000/');

    //vamos a cargar los datos de todas las apis para capturar el grafico común
    console.log(">> Cargando datos de todas las APIS...");
    //carga de rentals
    console.log(">>>> Cargando datos alquileres")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(5)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > ul > li:nth-child(4) > a");

    //volvemos a la raíz
    await page.goto('http://localhost:10000/');

    //carga de unemployment
    console.log(">>>> Cargando datos desempleo")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > ul > li:nth-child(3) > a");

    //volvemos a la raíz
    await page.goto('http://localhost:10000/');

    //carga de buy_sell
    console.log(">>>> Cargando datos compraventa")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(3) > div > div.card-body > a:nth-child(4)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > div:nth-child(4) > button.btn.btn-primary");

    console.log(">> Datos cargados.");

    // volvemos a raiz
    await page.goto('http://localhost:10000/');

    //nos dirigimos a la grafica comun para capturarla
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(6)");
    await page.screenshot({ path: RUTA_GENERAL + "/grafica_comun.png" });

    await browser.close();
})();