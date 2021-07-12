import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib

profile = webdriver.FirefoxProfile('/sistemas/doadoremnuvem/profile')
navegador = webdriver.Firefox(firefox_profile=profile)
navegador.get("https://web.whatsapp.com/")

def enviaNotificacao(contatos_df):

    while len(navegador.find_elements_by_id("side")) < 1:
        time.sleep(1)

    # já estamos com o login feito no whatsapp web
    for i, mensagem in enumerate(contatos_df['Mensagem']):
        pessoa = contatos_df.loc[i, "Pessoa"]
        numero = contatos_df.loc[i, "Número"]
        texto = urllib.parse.quote(f"Oi {pessoa}! {mensagem}")
        link = f"https://web.whatsapp.com/send?phone={numero}&text={texto}"
        navegador.get(link)
        while len(navegador.find_elements_by_id("side")) < 1:
            time.sleep(2)
        try:
            navegador.find_element_by_xpath('/html/body/div/div[1]/div[1]/div[4]/div[1]/footer/div[1]/div[2]/div/div[1]/div/div[2]').send_keys(Keys.ENTER)
            time.sleep(10)
        except Exception as e:
            print(e)
            time.sleep(10)
