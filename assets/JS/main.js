
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


async function LeerApiTop(crypto) {

        const url = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD&page=1`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });
                var myDate = new Date( 1680389820*1000)

        console.log(myDate.getHours())
        console.log(+myDate.getMinutes())
        document.getElementById('lista-tabla').innerHTM += '<tbody>';
        //                        <td><img src="https://www.cryptocompare.com${datos.data[i].DISPLAY.USD.IMAGEURL}"></td>
        for (let i = 0; i < 11; i++) {
                let logo = '<img src="https://www.cryptocompare.com' + datos.Data[i].CoinInfo.ImageUrl + '" width="40px" >'
                let moneda = datos.Data[i].CoinInfo.Name;
                let nombre = datos.Data[i].CoinInfo.FullName;
                let minimo = datos.Data[i].DISPLAY.USD.LOWDAY;
                let maximo = datos.Data[i].DISPLAY.USD.HIGHDAY;
                let porcentaje = datos.Data[i].DISPLAY.USD.CHANGEPCT24HOUR;
                document.getElementById('lista-tabla').innerHTML += `
                <tr onclick="graficar(${moneda})">
                        <td>${logo}</td>
                        <td>${moneda}</td>
                        <td>${nombre}</td>
                        <td>${minimo}</td>
                        <td>${maximo}</td>
                        <td>${porcentaje}</td>
                </tr>`
                // crear eventListener en <tr>

        }
        document.getElementById('lista-tabla').innerHTM += `</tbody>`
}
const graficar = (datos,tipo) => {
        const ctx = document.getElementById('grafico');

        new Chart(ctx, {
                type: tipo,
                data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                                label: '# of Votes',
                                data: [12, 19, 3, 5, 2, 3],
                                borderWidth: 1
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

        graficar(datos, "bar")
}


LeerApiMonedas('BTC')
LeerApiTop()
graficar("datos2", "bar")
