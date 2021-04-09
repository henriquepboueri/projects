# importing the requests library 
import requests
import time

tickers = ['ITSA4', 'VIVT3']

while (True):
    for ticker in tickers:
        URL = "https://statusinvest.com.br/category/tickerprice?ticker={}&type=-1".format(ticker)
        res = requests.get(url = URL, params = False) 
        data = res.json()
        if not (len(data['prices'])):
            break 
        last_price = data['prices'][-1]['price']
        first_price = data['prices'][0]['price']
        price_change = (last_price / first_price -1) * 100
        print("{}:{:.2f}".format(ticker, price_change))
        time.sleep(10)


