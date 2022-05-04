const fs = require('fs')
const https = require('https');

const argumentos = process.argv

const nombreArchivo = argumentos[2]
const extencion = argumentos[3]
const indicadorEconomico = argumentos[4]
const cantidadCambio = argumentos[5]

https
    .get('https://mindicador.cl/api', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            let indicador = JSON.parse(data);
            const total = (indicador[indicadorEconomico].valor * cantidadCambio).toFixed(2)

            const mensaje = 
            `A la fecha: ${indicador[indicadorEconomico].fecha}.\nFue realizada cotización con los siguientes datos:\nCantidad de pesos a convertir: ${cantidadCambio} pesos\nConvertido a "${indicador[indicadorEconomico].nombre}" da un total de:\n${total}` 

            fs.writeFile(`${nombreArchivo}.${extencion}`, mensaje, 'utf8', () => {
            });
            console.log(mensaje)
        });
    })
    .on('error', (err) => {
        console.log('Error: ' + err.message);
    })