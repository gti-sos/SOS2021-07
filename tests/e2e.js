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
        slowMo: 100, //100 ms por defecto entre instrucciones
    });

    //creamos page y establecemos tamaño del screenshot
    const page = await browser.newPage();
    await page.setViewport({ width: 2000, height: 2000 });



    //vamos a la raíz
    await page.goto('http://localhost:10000/');

    //capturamos inicio
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

    //clicamos en acerca de y la capturamos
    console.log(">> Acerca de");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(8)");
    await page.screenshot({ path: RUTA_GENERAL + "/acerca-de.png" });
    //click en volver a inicio
    await page.click("body > ul > li > a");




    //vamos a cargar los datos de todas las apis para capturar el grafico común
    console.log(">> Cargando datos de todas las APIS...");

    //######## RENTALS ########
    console.log(">>>> Cargando datos alquileres")
    
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(5)");
    //clicamos en cargar datos iniciales
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //click en volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");










    //######## UNEMPLOYMENT ########
    console.log(">>>> Cargando datos desempleo")

    //click interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5)");
    //capturar tabla vacia
    console.log(">>>>>> Capturando tabla vacía")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-vacia.png" });
    //click cargar datos
    await page.click("body > main > main > ul > li:nth-child(3) > a");
    //capturar ventana de confirmacion de carga inicial
    console.log(">>>>>> Capturando ventana de confirmación de carga inicial")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/cargar-iniciales.png" });
    //click cargar
    await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //click y captura grafica unemployment
    await page.click("body > main > main > ul > li:nth-child(2) > a");
    await page.goto('http://localhost:10000/#/unemployment/unemployment_graphic/'); //refrescar
    await page.goto('http://localhost:10000/#/unemployment/unemployment_graphic/'); //refrescar
    await page.waitForTimeout(1200);
    console.log(">>>>>> Capturando gráfica unemployment")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/grafica-unemployment.png" });
    //click volver a tabla datos
    await page.click("body > main > main > ul > li:nth-child(2) > a");
    //capturar tabla llena (cada una de las paginas)
    console.log(">>>>>> Capturando tabla llena de datos")
    await page.waitForTimeout(1200);
    console.log(">>>>>>>> Página 1")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag1.png" });
    await page.click("body > main > main > nav > ul > li:nth-child(3) > a");
    await page.waitForTimeout(1200);
    console.log(">>>>>>>> Página 2")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag2.png" });
    await page.click("body > main > main > nav > ul > li:nth-child(4) > a");
    await page.waitForTimeout(1200);
    console.log(">>>>>>>> Página 3")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-llena-pag3.png" });
    //capturar busqueda vacia error
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(8) > button");
    await page.waitForTimeout(1200);
    console.log(">>>>>> Capturando búsqueda vacía")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/busqueda-vacia.png" });
    //capturar busqueda con datos
        //bien rellena
    await page.focus('#input_autonomous_community');
    await page.keyboard.type("andalucia");
    await page.focus('#input_province');
    await page.keyboard.type("sevilla");
    await page.focus('#input_year');
    await page.keyboard.type("2020");
    console.log(">>>>>> Capturando búsqueda bien rellena")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/busqueda-rellena-bien.png" });
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(8) > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/resultado-busqueda-rellena-bien.png" });
    //volvemos a los datos
    await page.goto("http://localhost:10000/#/unemployment");
        //mal rellena
    await page.focus('#input_autonomous_community');
    await page.keyboard.type("andalucia");
    await page.focus('#input_province');
    await page.keyboard.type("sevilla");
    await page.focus('#input_year');
    await page.keyboard.type("2020");
    await page.focus('#input_occupation_variation');
    await page.keyboard.type("1234");
    console.log(">>>>>> Capturando búsqueda mal rellena")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/busqueda-rellena-mal.png" });
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(8) > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/resultado-busqueda-rellena-mal.png" });
    //volvemos a los datos
    await page.goto("http://localhost:10000/#/unemployment");
    //borrar un dato
    await page.click("body > main > main > table > tbody > tr:nth-child(4) > td:nth-child(8) > button");
    await page.waitForTimeout(1200);
    console.log(">>>>>> Capturando borrar un dato")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/borrar-un-dato.png" });
    //insertar un dato
        //insercion vacia
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(7) > button");
    await page.waitForTimeout(1200);
    console.log(">>>>>> Capturando inserción vacía")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/insercion-vacia.png" });
        //insercion dato existente
    await page.focus('#input_autonomous_community');
    await page.keyboard.type("galicia");
    await page.focus('#input_youth_unemployment_rate');
    await page.keyboard.type("37.1158");
    await page.focus('#input_province');
    await page.keyboard.type("a coruña");
    await page.focus('#input_year');
    await page.keyboard.type("2020");
    await page.focus('#input_unemployment_rate');
    await page.keyboard.type("12.7018");
    await page.focus('#input_occupation_variation');
    await page.keyboard.type("-11500");
    console.log(">>>>>> Capturando inserción dato existente")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/insercion-rellena-existente.png" });
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(7) > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/insercion-rellena-existente-resultado.png" });
        //insercion bien hecha
    await page.focus('#input_autonomous_community');
    await page.keyboard.type("comunidad ejemplo");
    await page.focus('#input_youth_unemployment_rate');
    await page.keyboard.type("123");
    await page.focus('#input_province');
    await page.keyboard.type("provincia ejemplo");
    await page.focus('#input_year');
    await page.keyboard.type("2020");
    await page.focus('#input_unemployment_rate');
    await page.keyboard.type("456");
    await page.focus('#input_occupation_variation');
    await page.keyboard.type("789");
    console.log(">>>>>> Capturando inserción bien hecha")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/insercion-rellena-bien.png" });
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(7) > button");
    await page.waitForTimeout(500);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/insercion-rellena-bien-resultado.png" });
    //editar
    console.log(">>>>>> Capturando editar")
    await page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(7) > a > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/edicion.png" });
    await page.focus('#input_autonomous_community');
    await page.keyboard.type("comunidad de ejemplo actualizada");
    await page.click("body > main > main > table > tbody > tr > td:nth-child(7) > button");
    await page.waitForTimeout(900);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/resultado-edicion.png" });
        //volver a datos
    await page.click("body > main > main > ul > li > a");
    //borrar todo y cargar de nuevo
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/borrar-datos-confirmacion.png" });
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/borrar-datos-resultado.png" });
    //cargar datos iniciales de nuevo
    await page.click("body > main > main > ul > li:nth-child(3) > a");
    await page.click("body > main > main > ul > li:nth-child(3) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //click en volver a inicio
    await page.click("body > main > main > ul > li:nth-child(1) > a");











    //######## BUY_SELL ########
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







    //dejar todas las tablas vacias al acabar
    await page.goto("http://localhost:10000/");
        //borrar rentals
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(5)");
    await page.click("body > main > main > ul > li:nth-child(5) > a");
    await page.click("body > main > main > ul > li:nth-child(5) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");
        //borrar unemployment
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5)");
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");
        //borrar buy_sell
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(3) > div > div.card-body > a:nth-child(4)");
    await page.click("body > main > main > div:nth-child(4) > button.btn.btn-danger");
    await page.click("body > main > main > div:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");
    

    

    await browser.close(); //fin :).
})();