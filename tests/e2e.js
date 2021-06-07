const puppeteer = require('puppeteer');

//rutas
const RUTA_GENERAL = "screenshots/general";
const RUTA_INTEGRACIONES = "screenshots/integraciones";
const RUTA_INTEGRACIONES_Rentals = "screenshots/integraciones/rentals";
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
    await page.goto('https://sos2021-07.herokuapp.com/');

    //capturamos inicio
    console.log(">> Inicio");
    await page.screenshot({ path: RUTA_GENERAL + "/inicio.png" });



    //clicamos en inicio antiguo y lo capturamos
    console.log(">> Inicio antiguo");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(7) > button");
    await page.screenshot({ path: RUTA_GENERAL + "/inicio_antiguo.png" });
    //volvemos a la raíz
    await page.goto('https://sos2021-07.herokuapp.com/');



    //clicamos en información y la capturamos
    console.log(">> Información");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(8) > button");
    await page.screenshot({ path: RUTA_GENERAL + "/informacion.png" });
    //click en volver
    await page.click("body > main > main > ul > li > a");

    //clicamos en acerca de y la capturamos
    console.log(">> Acerca de");
    await page.click("body > main > main > div:nth-child(3) > a:nth-child(11) > button");
    await page.screenshot({ path: RUTA_GENERAL + "/acerca-de.png" });
    //click en volver a inicio
    await page.click("body > ul > li > a");




    //vamos a cargar los datos de todas las apis para capturar el grafico común
    console.log(">> Cargando datos de todas las APIS...");

    //######## RENTALS ########
    console.log(">>>> Cargando datos alquileres")
    
    //clicamos en interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(1) > div > div.card-body > a:nth-child(5) > button");
    //captura tabla vacia
    await page.screenshot({ path: RUTA_RENTALS + "/tabla-vacia.png" });
    //clicamos en cargar datos iniciales
    console.log(">>>>>> Capturando datos iniciales rentals")
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    //captura confirmar carga inicial
    await page.screenshot({ path: RUTA_RENTALS + "/cargar-iniciales.png" });
    //click y captura tabla rellena
    
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");

    await page.screenshot({ path: RUTA_RENTALS + "/tabla_cargada.png" });
    //borrar datos
    await page.click("body > main > main > ul > li:nth-child(5) > a > button");
    await page.screenshot({ path: RUTA_RENTALS + "/borrar_todo.png" });
    await page.click("body > main > main > ul > li:nth-child(5) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
    await page.click("body > main > main > ul > li:nth-child(4) > a");
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //borrar un dato
    await page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(9) > button");
    await page.screenshot({ path: RUTA_RENTALS + "/borrar_un_dato.png" });
    //insetar un dato
    await page.focus('#comunidad');
    await page.keyboard.type("extremadura");
    await page.focus('#provincia');
    await page.keyboard.type("badajoz");
    await page.focus('#año');
    await page.keyboard.type("2019");
    await page.focus('#renta');
    await page.keyboard.type("803.5");
    await page.focus('#variacion_renta');
    await page.keyboard.type("5.5");
    await page.focus('#metros');
    await page.keyboard.type("200.9");
    await page.focus('#salario');
    await page.keyboard.type("10.8");
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(8) > button");
    await page.screenshot({ path: RUTA_RENTALS + "/nuevo_dato.png" });
    //busqueda
    await page.goto('https://sos2021-07.herokuapp.com/#/rentals');
    await page.focus('#año');
    await page.keyboard.type("2018");
    await page.click("body > main > main > table > tbody > tr:nth-child(1) > td:nth-child(9) > button");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_RENTALS + "/busqueda.png" });
    await page.goto('https://sos2021-07.herokuapp.com/#/rentals');
    //editar
    await page.click("body > main > main > table > tbody > tr:nth-child(2) > td:nth-child(8) > a > button");
    await page.screenshot({ path: RUTA_RENTALS + "/pagina_editar.png" });
    await page.focus('#renta_editar');
    await page.keyboard.type("100.5");
    await page.click("body > main > main > table > tbody > tr > td:nth-child(8) > button");
    await page.click("body > main > main > ul > li > a > button");
    await page.screenshot({ path: RUTA_RENTALS + "/dato_actualizado.png" });
    //grafica 1
    await page.click("body > main > main > ul > li:nth-child(2) > a > button");
    await page.goto('https://sos2021-07.herokuapp.com/#/rentals/rentals_graphic');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_RENTALS + "/grafica1.png" });
    await page.click("body > main > main > ul > li:nth-child(2) > a > button");
    await page.click("body > main > main > ul > li:nth-child(3) > a > button");
    await page.goto('https://sos2021-07.herokuapp.com/#/rentals/rentals_graphic2');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: RUTA_RENTALS + "/grafica2.png" });
    await page.click("body > main > main > ul > li:nth-child(1) > a > button");







    //######## UNEMPLOYMENT ########
    console.log(">>>> Cargando datos desempleo")

    //click interfaz
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button");
    //capturar tabla vacia
    console.log(">>>>>> Capturando tabla vacía")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/tabla-vacia.png" });
    //click cargar datos
    await page.click("body > main > main > ul > li:nth-child(4) > a > button");
    //capturar ventana de confirmacion de carga inicial
    console.log(">>>>>> Capturando ventana de confirmación de carga inicial")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/cargar-iniciales.png" });
    //click cargar
    
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //click y captura grafica unemployment
    await page.click("body > main > main > ul > li:nth-child(2) > a > button");
    await page.goto('https://sos2021-07.herokuapp.com/#/unemployment/unemployment_highchart_graphic'); //refrescar
    await page.goto('https://sos2021-07.herokuapp.com/#/unemployment/unemployment_highchart_graphic'); //refrescar
    await page.waitForTimeout(1200);
    console.log(">>>>>> Capturando gráfica unemployment")
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/grafica-unemployment.png" });
    //click volver a tabla datos
    await page.click("body > main > main > figure > ul > li:nth-child(2) > a > button");
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
    await page.goto("https://sos2021-07.herokuapp.com/#/unemployment");
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
    await page.goto("https://sos2021-07.herokuapp.com/#/unemployment");
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
    await page.click("body > main > main > ul > li:nth-child(5) > a > button");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/borrar-datos-confirmacion.png" });
    await page.click("body > main > main > ul > li:nth-child(5) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
    await page.waitForTimeout(1000);
    await page.screenshot({ path: RUTA_UNEMPLOYMENT + "/borrar-datos-resultado.png" });
    //cargar datos iniciales de nuevo
    await page.click("body > main > main > ul > li:nth-child(4) > a > button");
    await page.click("body > main > main > ul > li:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
    //click en volver a inicio
    await page.click("body > main > main > ul > li:nth-child(1) > a");











    //######## BUY_SELL ########
    console.log(">>>> Cargando datos compraventa")

    //clicamos en interfaz 
    await page.click("body > main > main > div:nth-child(11) > div:nth-child(3) > div > div.card-body > a:nth-child(4) > button");
	//tabla vacia
	await page.screenshot({ path: RUTA_BUY_SELL + "/tabla-vacia.png" });
    //BOTON CARGAR DATOS
    await page.click("body > main > main > div:nth-child(4) > button.btn.btn-primary");
	//NOTIFICACION DE CONFIRMACION DE CARGA DE DATOS
	await page.screenshot({ path: RUTA_BUY_SELL + "/confirmacion-carga-datos.png" });
	//pulsamos que si
    await page.click("body > main > main > div:nth-child(4) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
	await page.screenshot({ path: RUTA_BUY_SELL + "/tablas-cargadas.png" });
    //Insertar un dato
    await page.focus('#comunidad');
    await page.keyboard.type("Andalucía");
    await page.focus('#provincia');
    await page.keyboard.type("Malaga");
    await page.focus('#año');
    await page.keyboard.type("2014");
    await page.focus('#surface');
    await page.keyboard.type("1000");
    await page.focus('#annual_variation_percentage');
    await page.keyboard.type("10");
    await page.focus('#eviction');
    await page.keyboard.type("100");
    await page.click("body > main > main > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(7) > button");
    await page.screenshot({ path: RUTA_BUY_SELL + "/tablas-dato-nuevo.png" });
    //buscar un dato
    await page.goto('https://sos2021-07.herokuapp.com/#/buy_sell');
    await page.focus('#año');
    await page.keyboard.type("2020");
    //Borrar un dato
    await page.click("body > main > main > div:nth-child(5) > table > tbody > tr:nth-child(5) > td:nth-child(8) > button");
    await page.screenshot({ path: RUTA_BUY_SELL + "/tablas-dato-borrado.png" });
    
    console.log(">> Datos cargados.");

    //click en analiticas
    await page.click("body > main > main > ul > li:nth-child(2) > a");
    //captura de analiticas
	await page.waitForTimeout(7000); //esperamos 7000 ms más para que la gráfica se capture bien
	console.log(">> Analiticas");
	await page.screenshot({ path: RUTA_BUY_SELL + "/analiticas.png" });
	//grafica lineal
    await page.click("body > main > main > ul > li:nth-child(3) > a");
	await page.waitForTimeout(7000); //esperamos 7000 ms más para que la gráfica se capture bien
	console.log(">> Capturando gráfica lineal.");
	await page.screenshot({ path: RUTA_BUY_SELL + "/graficalineal.png" });
	//grafica no lineal
    await page.click("body > main > main > ul > li:nth-child(4) > a"); 
	await page.waitForTimeout(7000); //esperamos 7000 ms más para que la gráfica se capture bien
	console.log(">> Capturando gráfica no lineal.");
	await page.screenshot({ path: RUTA_BUY_SELL + "/graficanolineal.png" });
	//grafica otra libreria
    await page.click("body > main > main > ul > li:nth-child(5) > a"); 
	await page.waitForTimeout(7000); //esperamos 7000 ms más para que la gráfica se capture bien
	console.log(">> Capturando gráfica con otra libreria.");
	await page.screenshot({ path: RUTA_BUY_SELL + "/graficalibreria.png" });
	
	//volvemos a los datos
	
    await page.click("body > main > main > ul > li:nth-child(2) > a");
	
	//editar 
    await page.click("body > main > main > div:nth-child(5) > table > tbody > tr:nth-child(5) > td:nth-child(7) > a > button");
    await page.focus('#updateSurface');
    await page.keyboard.type("2000");
    await page.click("body > main > main > div:nth-child(4) > table > tbody > tr > td:nth-child(7) > button");
    await page.screenshot({ path: RUTA_BUY_SELL + "/editar.png" });
    await page.click("body > main > main > ul > li > a");
    await page.screenshot({ path: RUTA_BUY_SELL + "/tablaEditada.png" });




    //dejar todas las tablas vacias al acabar
    
        //borrar rentals
        console.log(">>>> BORRAR RENTALS.");
        await page.goto('https://sos2021-07.herokuapp.com/#/rentals');
    await page.click("body > main > main > ul > li:nth-child(5) > a > button");
    
    await page.click("body > main > main > ul > li:nth-child(5) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a > button");
        //borrar unemployment
        console.log(">>>> BORRAR unemployment.");

    await page.click("body > main > main > div:nth-child(11) > div:nth-child(2) > div > div.card-body > a:nth-child(5) > button");
    await page.click("body > main > main > ul > li:nth-child(5) > a > button");
    await page.click("body > main > main > ul > li:nth-child(5) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-danger");
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a > button");
        //borrar buy_sell
        console.log(">>>> BORRAR buy_sell.");
	await page.goto('http://sos2021-07.herokuapp.com/#/buy_sell');
    await page.click("body > main > main.svelte-huzmzs > div.svelte-huzmzs > button.btn.btn-danger");
	//CAPTURA BORRADO DE TODAS LAS TABLAS
	await page.screenshot({ path: RUTA_BUY_SELL + "/confirmacion-borrado-total.png" });
	//confirmamos borrado
	await page.click("body.modal-open > main > main.svelte-huzmzs > div.svelte-huzmzs > div > div.modal.show.d-block > div.modal-dialog > div.modal-content > div.modal-footer > button.btn.btn-danger");
	//CAPTURA TABLAS BORRADAS
	await page.screenshot({ path: RUTA_BUY_SELL + "/tablas-borradas.png" });

   
        //volver
    await page.click("body > main > main > ul > li:nth-child(1) > a");





    

    

    await browser.close(); //fin :).
})();