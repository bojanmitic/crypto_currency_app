let dataArr = [];
let limit = 30;
let url = `https://api.coinmarketcap.com/v1/ticker/?limit=2000`;

fetch(url)
        .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
          reset();
          dataArr.push.apply(dataArr,myJson);
          displayCurrencies(dataArr.slice(0,limit));
      });
      
const displayCurrencies = (arr) => {
  for(let i = 0; i<arr.length; i++){

    const {id, name, symbol, rank, price_usd, price_btc, 
        market_cap_usd, available_supply, total_supply,
          max_supply, percent_change_24h, percent_change_1h,
          percent_change_7d, last_updated
          } = arr[i];

    const currencies = document.getElementById('currencies');
    const singleCurrency = document.createElement('div');
    singleCurrency.className = 'singleCurrency';
    //rank
    const currencyRankDiv = document.createElement("div");
    const currencyRank = document.createElement('span');
    currencyRank.textContent = rank + ".";
    currencyRankDiv.appendChild(currencyRank);
    singleCurrency.appendChild(currencyRankDiv);
    
    //name
    const currencyNameDiv = document.createElement("div");
    const currencyName = document.createElement('span');
    currencyName.textContent =  name;
    currencyNameDiv.appendChild(currencyName);
    singleCurrency.appendChild(currencyNameDiv);
    
    //market cap
    const currencyMarketCapDiv = document.createElement("div");
    const currencyMarketCap = document.createElement('span');
    currencyMarketCap.textContent ='Market Cap: ' + market_cap_usd + '$';
    currencyMarketCapDiv.appendChild(currencyMarketCap);
    singleCurrency.appendChild(currencyMarketCapDiv);
    
    //price
    const currencyPrice = document.createElement("div");
    const price = document.createElement('span');
    price.textContent ="Price: " + price_usd + ' $';
    currencyPrice.appendChild(price);
    singleCurrency.appendChild(currencyPrice);
    //price in btc
    const currencyPriceBtc = document.createElement("div");
    const priceBtc = document.createElement('span');
    priceBtc.textContent ="Price in bitcoins: " + price_btc + "BTC" ;
    currencyPriceBtc.appendChild(priceBtc);
    singleCurrency.appendChild(currencyPriceBtc);
    //percent change 24 hours
    const percentChange24h = document.createElement("div");
    const percent24h = document.createElement('span');
    percent24h.textContent ="Change 24h: " + percent_change_24h + '%';
    percent_change_24h > 0 ? percent24h.style.color ='green' : percent24h.style.color ='red';
    percentChange24h.appendChild(percent24h);
    singleCurrency.appendChild(percentChange24h);
    //percent change 7 days
    const percentChange7d = document.createElement("div");
    const percent7d = document.createElement('span');
    percent7d.textContent ="Change 7 days: " + percent_change_7d + '%';
    percent_change_7d > 0 ? percent7d.style.color ='green' : percent7d.style.color ='red';
    percentChange7d.appendChild(percent7d);
    singleCurrency.appendChild(percentChange7d);

    currencies.appendChild(singleCurrency);
    
  }  
}
const reset = () =>{
  document.getElementById('currencies').innerHTML = '';
  limit = 30;
}
document.getElementById('search').addEventListener('input', () => {
      const seacrhVal = document.getElementById('search').value;
      reset();
      if(seacrhVal){
        const filterSearch = dataArr.slice(0).filter((currency)=>{
          return currency.name.toLowerCase().includes(seacrhVal.toLowerCase());
          }); 
          displayCurrencies(filterSearch);
          document.getElementById('load').style.display = 'none'; 
      }else{
        document.getElementById('load').style.display = 'block'; 
        displayCurrencies(dataArr.slice(0,limit));
      }
  }); 
  
  document.getElementById('load').addEventListener('click', ()=>{

    displayCurrencies(dataArr.slice(limit, limit + 30));
    limit += 30;
  });

  document.getElementById('sortByPrice').addEventListener('click', ()=>{
    reset();
    const sorted = dataArr.slice(0).sort((a,b)=>{
      return b.price_usd - a.price_usd;
    });
    displayCurrencies(sorted);
  });
  document.getElementById('sortByName').addEventListener('click', ()=>{
    reset();
    const sorted = dataArr.slice(0).sort((a,b)=>{
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if(nameA<nameB){
        return -1
      }
      if(nameA > nameB){
        return 1;
      }
      return 0;
    });
    console.log(dataArr);
    console.log(sorted);
    displayCurrencies(sorted);
  });
 
  document.getElementById('sortByRank').addEventListener('click', ()=>{
    reset();
    const sortByRank = dataArr.slice(0).sort((a,b) => {
      return a.rank - b.rank;
    })
    displayCurrencies(sortByRank);
  });



  
  
        

      

