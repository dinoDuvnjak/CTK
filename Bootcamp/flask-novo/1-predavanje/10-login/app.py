#predavanja

#ubaci passlib u requirments.txt

1# objasni sve oko secret kija, ovo mozes kucati u python konzolu
    import secrets
    secrets.SystemRandom().getrandbits(128)


   # ovo nije token nego nego tajni ključ za potpisivanje JWT tokena
    #tako nasa aplikacija zna da je token koji je primila potpisan od strane nas

    app.config["JWT_SECRET_KEY"] = "jose" 
