const DADOS_ANIMAIS = [
    {
        "id": "animais_a",
        "texto": "Nome de animais que começam com 'A'",
        "tags": ["Animais", "Letra A"],
        "facil": ["Abelha", "Águia", "Anta", "Aranha", "Arara", "Avestruz"],
        "medio": ["Alce", "Asno", "Abutre", "Ácaro", "Albatroz", "Anêmona", "Atum", "Anchova", "Ariranha"],
        "dificil": ["Acará (peixe)", "Açor (ave)", "Agulhão (peixe)", "Alpaca (camelídeo)", "Anambé (ave)"],
        "invalido": ["Antílope (mamíferos herbívoros)"]
    },
    {
        "id": "animais_e",
        "texto": "Nome de animais que começam com 'E'",
        "tags": ["Animais", "Letra E"],
        "facil": ["Elefante", "Esquilo", "Estrela-do-mar", "Ema", "Escorpião", "Esponja-do-mar"],
        "medio": ["Égua", "Equidna (porco espinho)", "Escaravelho", "Esturjão (peixe)"],
        "dificil": ["Elande (bovino)", "Esmerilhão (ave)"],
        "invalido": ["Equino"]
    },
    {
        "id": "animais_i",
        "texto": "Nome de animais que começam com 'I'",
        "tags": ["Animais", "Letra I"],
        "facil": ["Iguana"],
        "medio": ["Inhambu (ave)"],
        "dificil": ["Impala (antílope)", "Inhacoso (antílope)", "Iraúna (ave)", "Irara (onívoro )"],
        "invalido": ["Inseto"]
    },
    {
        "id": "animais_o",
        "texto": "Nome de animais que começam com 'O'",
        "tags": ["Animais", "Letra O"],
        "facil": ["Ovelha", "Orca", "Ostra", "Onça"],
        "medio": ["Orangotango", "Ouriço-do-mar", "Ouriço"],
        "dificil": ["Ocapi (mamífero)", "Olho-de-boi (peixe)", "Onagro (asno selvagem)", "Oribi (antílope)"],
        "invalido": []
    },
    {
        "id": "animais_u",
        "texto": "Nome de animais que começam com 'U'",
        "tags": ["Animais", "Letra U"],
        "facil": ["Urubu", "Urso"],
        "medio": [],
        "dificil": ["Uirapuru (ave)", "Uacari (macaco)", "Urumutum (ave)", "Uapiti (cervo)", "Unau (preguiça-real)", "Uiraçu (gavião-real)", "Urutau (ave noturna)", "Urutu (cobra)"],
        "invalido": ["Unicórnio (mitológico)"]
    },
    {
        "id": "animais_ba",
        "texto": "Nome de animais que começam com 'BA'",
        "tags": ["Animais", "Letra B"],
        "facil": ["Baleia", "Barata", "Babuíno", "Baiacu"],
        "medio": ["Bagre"],
        "dificil": ["Badejo (peixe)"],
        "invalido": ["Bacalhau (é um processo)"]
    },
    {
        "id": "animais_be",
        "texto": "Nome de animais que começam com 'BE'",
        "tags": ["Animais", "Letra B"],
        "facil": ["Beija-flor", "Besouro", "Bezerro", "Bem-te-vi"],
        "medio": ["Beluga"],
        "dificil": ["Berbigão (molusco)"]
    },
    {
        "id": "animais_bi",
        "texto": "Nome de animais que começam com 'BI'",
        "tags": ["Animais", "Letra B"],
        "facil": ["Bicho-da-seda", "Bicho-preguiça", "Bisão"],
        "medio": [],
        "dificil": ["Bico-de-lacre (ave)", "Biguá (ave)", "Bico-de-tesoura (ave)"]
    },
    {
        "id": "animais_bo",
        "texto": "Nome de animais que começam com 'BO'",
        "tags": ["Animais", "Letra B"],
        "facil": ["Boi", "Borboleta", "Boto", "Bode"],
        "medio": [],
        "dificil": ["Bodião (peixe)", "Bonobo (chimpanzé)", "Borrelho (ave)",]
    },
    {
        "id": "animais_bu",
        "tags": ["Animais", "Letra B"],
        "texto": "Nome de animais que começam com 'BU'",
        "facil": ["Burro", "Búfalo"],
        "medio": ["Búzio (moluscos marinhos)"],
        "dificil": ["Bugio (Guariba)", "Bufo-Real (Coruja)"]
    },
    {
        "id": "animais_ca",
        "texto": "Nome de animais que começam com 'CA'",
        "tags": ["Animais", "Letra C"],
        "facil": ["Cabra", "Cachorro", "Caranguejo", "Caranguejeira", "Caracol", "Camelo", "Carneiro", "Castor", "Cascavel", "Carrapato", "Canário", "Cacatua", "Calango", "Canguru", "Camaleão", "Camarão", "Cavalo", "Capivara"],
        "medio": ["Carpa", "Caititu", "Cachalote", "Cágado", "Carcará (ave)"],
        "dificil": ["Caracal (lince-do-deserto)", "Cariama (Seriema)"]
    },
    {
        "id": "animais_ce",
        "texto": "Nome de animais que começam com 'CE'",
        "tags": ["Animais", "Letra C"],
        "facil": ["Cegonha", "Centopeia"],
        "medio": ["Cervo"],
        "dificil": ["Cebus (Macaco)"]
    },
    {
        "id": "animais_ci",
        "texto": "Nome de animais que começam com 'CI'",
        "tags": ["Animais", "Letra C"],
        "facil": ["Cigarra", "Cisne"],
        "medio": [],
        "dificil": ["Civeta (mamífero)"]
    },
    {
        "id": "animais_co",
        "texto": "Nome de animais que começam com 'CO'",
        "tags": ["Animais", "Letra C"],
        "facil": ["Coelho", "Cobra", "Coruja", "Coala", "Codorna"],
        "medio": ["Coiote", "Cordeiro (filhote ovelha)"],
        "dificil": ["Colhereiro (ave)"]
    },
    {
        "id": "animais_cu",
        "texto": "Nome de animais que começam com 'CU'",
        "tags": ["Animais", "Letra C"],
        "facil": ["Cuco", "Cupim", "Cutia"],
        "medio": ["Curió (pássaro)", "Cuíca (marsupial)", "Cuiu-cuiu (peixe/papagaio)"],
        "dificil": ["Curicaca (ave)", "Curimbatá (peixe)", "Curiango (ave)"]
    },
    {
        "id": "animais_di",
        "texto": "Nome de animais que começam com 'DI'",
        "tags": ["Animais", "Letra D"],
        "facil": ["Diabo-da-tasmânia"],
        "medio": ["Dingo (Cão selvagem)"],
        "dificil": ["Diablotim (ave)"]
    },
    {
        "id": "animais_do",
        "texto": "Nome de animais que começam com 'DO'",
        "tags": ["Animais", "Letra D"],
        "facil": ["Dourado", "Dodô"],
        "medio": ["Doninha"],
        "dificil": ["Dom-fafe (pássaro)"]
    },
    {
        "id": "animais_fa",
        "texto": "Nome de animais que começam com 'FA'",
        "tags": ["Animais", "Letra F"],
        "facil": ["Falcão"],
        "medio": ["Faisão"],
        "dificil": []
    },
    {
        "id": "animais_fo",
        "texto": "Nome de animais que começam com 'FO'",
        "tags": ["Animais", "Letra F"],
        "facil": ["Foca", "Formiga"],
        "medio": [],
        "dificil": ["Fossa (carnívoro de Madagascar)"]
    },
    {
        "id": "animais_fu",
        "texto": "Nome de animais que começam com 'FU'",
        "tags": ["Animais", "Letra F"],
        "facil": ["Furão"],
        "medio": ["Fuinha"],
        "dificil": ["Fulmar (ave marinha)", "Fura-olho (ave)"],
        "invalido": ["Fungo"]
    },
    {
        "id": "animais_ga",
        "texto": "Nome de animais que começam com 'GA'",
        "tags": ["Animais", "Letra G"],
        "facil": ["Gato", "Galo", "Galinha", "Gafanhoto", "Gaivota", "Ganso", "Gavião"],
        "medio": [],
        "dificil": ["Gamo (cervo)", "Galago (primata)", "Gauro (bisão-indiano)"]
    },
    {
        "id": "animais_gi",
        "texto": "Nome de animais que começam com 'GI'",
        "tags": ["Animais", "Letra G"],
        "facil": ["Girafa", "Girino (fase larval)"],
        "medio": [],
        "dificil": ["Gineta (carnívoro)", "Gibão (macaco)"]
    },
    {
        "id": "animais_go",
        "texto": "Nome de animais que começam com 'GO'",
        "tags": ["Animais", "Letra G"],
        "facil": ["Gorila", "Golfinho"],
        "medio": [],
        "dificil": ["Goral (antílope)", "Gorrião (pardal)"]
    },
    {
        "id": "animais_gu",
        "texto": "Nome de animais que começam com 'GU'",
        "tags": ["Animais", "Letra G"],
        "facil": ["Guaxinim"],
        "medio": ["Guariba (macaco)", "Guará (ave)"],
        "dificil": ["Guriatã (ave)", "Guanaco (camelídeo)", "Gundi (roedor)", "Guaiamu (caranguejo)"],
        "invalido": ["Lobo-Guará"]
    },
    {
        "id": "animais_h",
        "texto": "Nome de animais que começam com 'H'",
        "tags": ["Animais", "Letra H"],
        "facil": ["Hiena", "Hipopótamo", "Hamster"],
        "medio": ["Harpia (gavião-real)"],
        "dificil": ["Haliote (molusco)"]
    },
]