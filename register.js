if("serviceWorker" in navigator) { //Valida que el navegador soporte serviceWorker
    navigator.serviceWorker.register("./sw.js") //Registra el serviceWorker
}
