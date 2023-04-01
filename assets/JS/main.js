
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
        <h3>EURO$ ${datos.EUR}</h3>`;
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
        document.getElementById('lista-tabla').innerHTM += '<tbody>';
        for (let i = 0; i < 11; i++) {
                document.getElementById('lista-tabla').innerHTML += `
                <tr>
                        <td>logo ${i}</td>
                        <td>moneda ${i}</td>
                        <td>nombre ${i}</td>
                </tr>`
        }
        document.getElementById('lista-tabla').innerHTM += `</tbody>`
}
function graficar(datos, tipo) {
        switch (tipo) {
                case 1:         //grafico de linea

                case 2:         // grafico de area
                case 3:         //grafico de bvarras
        }
};


async function LeerApiGrafico(crypto) {
        const url = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?tsym=USD&page=1`;
        const datos = await fetch(url)
                .then(response => response.json())
                .then(data => {
                        return data;
                });

        graficar(datos, typografico)
}


LeerApiMonedas('BTC')
LeerApiTop()
