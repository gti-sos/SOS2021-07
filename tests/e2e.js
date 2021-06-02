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

    //click en volver
    await page.click("body > main > main > ul > li > a");



    //vamos a cargar los datos de todas las apis para capturar el grafico común
    console.log(">> Cargando datos de todas las APIS...");

    //carga de rentals
    console.log(">>>> Cargando datos alquileres")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(5)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");

    //click en volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");










    //carga de unemployment
    console.log(">>>> Cargando datos desempleo")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5)");
    //capturar tabla vacia
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-vacia.png" });
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > ul > li:nth-child(3) > a");
    //capturar ventana de confirmacion de carga inicial
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/cargar-iniciales.png" });
    //click en cargar
    await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //capturar tabla llena (cada una de las paginas: 3)
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag1.png" });
    await page.click("body > main > main > nav > ul > li:nth-child(3) > a");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag2.png" });
    await page.click("body > main > main > nav > ul > li:nth-child(4) > a");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag3.png" });
    //busqueda vacia
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(8) > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/busqueda-vacia.png" });
    //busqueda con datos
    await page.focus('#id');
    await page.keyboard.type("andalucia");
    await page.focus('#id');
    await page.keyboard.type("sevilla");
    await page.focus('#id');
    await page.keyboard.type("2020");
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/busqueda-rellena.png" });


    //click en volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");











    //carga de buy_sell
    console.log(">>>> Cargando datos compraventa")
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(3) > div > div.card-body > a:nth-child(4)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > div:nth-child(4) > button.btn.btn-primary");
    await page.click("body > main > main > div:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");

    console.log(">> Datos cargados.");

    //click en volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");

    //nos dirigimos a la grafica comun para capturarla
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(6)");
    await page.click(" body > main > main > figure > ul > li > a"); //volvemos a inicio
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(6)"); //volvemos a recargar la grafica para que se vea en la imagen

    console.log(">> Capturando gráfica común.");
    await page.waitForTimeout(7000); //esperamos 7000 ms más para que la gráfica se capture bien
    await page.screenshot({ path: RUTA_GENERAL + "/grafica_comun.png" });

    await browser.close();
})();