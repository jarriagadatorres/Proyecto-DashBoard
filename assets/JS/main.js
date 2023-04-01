
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
        console.table(datos)
        document.getElementById('lista-tabla').innerHTML = `
        <tr>
                <th>logo</th>
                <th>Moneda</th>
                <th>Nombre</th>
        </tr>`
        for(i=0;i<5;i++){
                document.getElementById('lista-tabla').innerHTML += `
                <tr>
                        <td>logo ${i}</td>
                        <td>moneda ${i}</td>
                        <td>Nombre ${i}</td>
                </tr>`
        }
}

LeerApiMonedas('BTC')
LeerApiTop()
