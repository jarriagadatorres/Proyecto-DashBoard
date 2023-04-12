let crypto;
let myChart;
let tipo = 'line';
let datos;
let etiqueta;
let valor;

async function LeerApiMonedas(crypto) {

        const url = `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,EUR,CLP`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });
        document.getElementById('crypto-usd').innerHTML = `
        <h3>USD$ ${datos.USD}</h3>`;
        document.getElementById('crypto-euro').innerHTML = `
        <h3>EUR$ ${datos.EUR}</h3>`;
        document.getElementById('crypto-clp').innerHTML = `
        <h3>CLP$ ${datos.CLP}</h3>`
}
async function LeerApiTop() {

        const url = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD&page=1`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });

        //crypto = datos.Data[0].CoinInfo.Name;
        document.getElementById('lista-tabla').innerHTM += '<tbody>';
        for (let i = 0; i < 11; i++) {
                let logo = '<img src="https://www.cryptocompare.com' + datos.Data[i].CoinInfo.ImageUrl + '" width="40px" >'
                let moneda = datos.Data[i].CoinInfo.Name;
                let nombre = datos.Data[i].CoinInfo.FullName;
                let minimo = datos.Data[i].DISPLAY.USD.LOWDAY;
                let maximo = datos.Data[i].DISPLAY.USD.HIGHDAY;
                let porcentaje = datos.Data[i].DISPLAY.USD.CHANGEPCT24HOUR;
                let bg = (porcentaje < 0) ? "red" : "blue"
                document.getElementById('lista-tabla').innerHTML += `
                <tr  onclick="LeerApiGrafico('${moneda}')">
                        <td>${logo}</td>
                        <td>${moneda}</td>
                        <td>${nombre}</td>
                        <td>${minimo}</td>
                        <td>${maximo}</td>
                        <td style="color:${bg}">${porcentaje} </td>
                </tr>`

        }
        document.getElementById('lista-tabla').innerHTM += `</tbody>`
}

const graficar = (valor, etiqueta, moneda, tipo) => {
        const ctx = document.getElementById('grafico');
        if (myChart) {
                myChart.destroy();
        }
        myChart = new Chart(ctx, {
                type: (tipo === 'line2') ? 'line' : tipo,
                data: {
                        labels: etiqueta,
                        datasets: [{
                                label: moneda,
                                data: valor,
                                borderWidth: 1,
                                fill: (tipo === 'line') ? true : false,
                                cubicInterpolationMode: (tipo === 'line') ? 'monotone' : 'default'
                        }]
                },
                options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                                y: {
                                        beginAtZero: true
                                }
                        }
                }
        });
};

async function LeerApiGrafico(moneda) {
        crypto = moneda;
        const url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${crypto}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });
        valor = datos.Data.Data.map(e => e.volumefrom)
        etiqueta = datos.Data.Data.map(function (e) {
                var myDate = new Date(e.time * 1000)
                HoraMinuto = myDate.getHours() + ':' + myDate.getMinutes()
                return HoraMinuto;
        });
        LeerApiMonedas(crypto)
        graficar(valor, etiqueta, crypto, tipo)
}

function tipografico(t) {
        tipo = t;
        LeerApiGrafico(crypto)
}
LeerApiTop()
LeerApiGrafico('BTC')
