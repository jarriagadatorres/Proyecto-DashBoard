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

        let crypto = datos.Data[0].CoinInfo.Name;
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
                <tr id="${moneda}" type="button" onclick="LeerApiGrafico('${moneda}')">
                        <td>${logo}</td>
                        <td>${moneda}</td>
                        <td>${nombre}</td>
                        <td>${minimo}</td>
                        <td>${maximo}</td>
                        <td style="color:${bg}">${porcentaje} </td>
                </tr>`

        }
        console.log(crypto)
        document.getElementById('lista-tabla').innerHTM += `</tbody>`

        LeerApiMonedas(crypto)
        LeerApiGrafico(crypto)

}




const graficar = (valor, etiqueta, crypto, tipo) => {
        const ctx = document.getElementById('grafico');
        if (myChart) {
                myChart.destroy();
        }
        myChart = new Chart(ctx, {
                type: tipo,
                data: {
                        labels: etiqueta,
                        datasets: [{
                                label: crypto,
                                data: valor,
                                borderWidth: 1,
                                fill: true,
                                cubicInterpolationMode: 'monotone'
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


async function LeerApiGrafico(crypto) {
        const url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${crypto}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });
        let valor = datos.Data.Data.map(e => e.volumefrom)
        let etiqueta = datos.Data.Data.map(function (e) {
                var myDate = new Date(e.time * 1000)
                HoraMinuto = myDate.getHours() + ':' + myDate.getMinutes()
                return HoraMinuto;
        });
        graficar(valor, etiqueta, crypto, tipo)
}

function tipografico(t) {
        let tipo = t;
        LeerApiGrafico(crypto)
}
let crypto;
let myChart;
let tipo = 'line';
LeerApiTop()
//LeerApiMonedas(crypto)
//LeerApiGrafico(crypto)
