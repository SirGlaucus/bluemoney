const child_process = require('child_process')

const argumentos = process.argv

const nombreArchivo = argumentos[2]
const extencion = argumentos[3]
const indicadorEconomico = argumentos[4]
const cantidadCambio = argumentos[5]

const ejecutar = (archivo) => {
    return new Promise((resolve) => {
        child_process.exec(`node ${archivo}`, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                resolve(result)
            }
        })
    })
}

ejecutar(`index.js ${nombreArchivo} ${extencion} ${indicadorEconomico} ${cantidadCambio}`).then((contenedorPrograma) => {
    main = contenedorPrograma
    console.log(main)
})