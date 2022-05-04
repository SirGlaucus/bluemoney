const fs = require('fs')

const argumentos = process.argv

const nombreArchivo = argumentos[2]
const extencion = argumentos[3]
const indicadorEconomico = argumentos[4]
const cantidadCambio = argumentos[5]

const https = require('https');
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
            `A la fecha: ${indicador[indicadorEconomico].fecha}
            Fue realizada cotización con los siguientes datos:
            Cantidad de pesos a convertir: ${cantidadCambio} pesos
            Convertido a "${indicador[indicadorEconomico].nombre}" da un total de:
            ${total}` 

            fs.writeFile(`${nombreArchivo}.${extencion}`, mensaje, 'utf8', () => {
            });
        });
    })
    .on('error', (err) => {
        console.log('Error: ' + err.message);
    })