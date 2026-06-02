const DADOS_PAISES = [
    {
        "id": "pais_a",
        "texto": "Nome de países que começam com 'A'",
        "tags": ["Geografia", "Países"],
        "facil": ["Alemanha", "Angola", "Argentina", "Austrália", "Afeganistão", "África do Sul"],
        "medio": ["Áustria", "Arábia Saudita", "Argélia", "Armênia"],
        "dificil": ["Albânia", "Andorra", "Antígua e Barbuda", "Azerbaijão"]
    },
    {
        "id": "pais_b",
        "texto": "Nome de países que começam com 'B'",
        "tags": ["Geografia", "Países"],
        "facil": ["Brasil", "Bolívia", "Bélgica"],
        "medio": ["Bangladesh", "Bulgária", "Bahamas", "Bielorrússia", "Bósnia e Herzegovina", "Butão"],
        "dificil": ["Belize", "Bahrein", "Barbados", "Benim", "Botsuana", "Brunei", "Burquina Fasso", "Burundi"]
    },
    {
        "id": "pais_c",
        "texto": "Nome de países que começam com 'C'",
        "tags": ["Geografia", "Países"],
        "facil": ["Canadá", "China", "Colômbia", "Cuba", "Chile", "Costa Rica", "Coreia do Sul", "Coreia do Norte"],
        "medio": ["Cabo Verde", "Camarões", "Catar (ou Qatar)", "Croácia", "Congo (República do Congo)"],
        "dificil": ["Camboja", "Cazaquistão", "Chade", "Chipre", "Comores", "Costa do Marfim"]
    },
    {
        "id": "pais_d",
        "texto": "Nome de países que começam com 'D'",
        "tags": ["Geografia", "Países"],
        "facil": ["Dinamarca"],
        "medio": ["Dominica"],
        "dificil": ["Djibuti"],
        "invalido": ["República Dominicana"]
    },
    {
        "id": "pais_e",
        "texto": "Nome de países que começam com 'E'",
        "tags": ["Geografia", "Países"],
        "facil": ["Egito", "Equador", "Espanha", "Estados Unidos"],
        "medio": ["El Salvador", "Emirados Árabes Unidos", "Eslováquia", "Eslovênia", "Estônia", "Etiópia"],
        "dificil": ["Eritreia", "Eswatini"]
    },
    {
        "id": "pais_f",
        "texto": "Nome de países que começam com 'F'",
        "tags": ["Geografia", "Países"],
        "facil": ["França", "Finlândia", "Filipinas"],
        "medio": [],
        "dificil": ["Fiji"]
    },
    {
        "id": "pais_g",
        "texto": "Nome de países que começam com 'G'",
        "tags": ["Geografia", "Países"],
        "facil": ["Grécia", "Guatemala", "Guiana"],
        "medio": ["Gabão", "Gana", "Geórgia", "Guiné"],
        "dificil": ["Gâmbia", "Granada", "Guiné-Bissau", "Guiné Equatorial"]
    },
    {
        "id": "pais_h",
        "texto": "Nome de países que começam com 'H'",
        "tags": ["Geografia", "Países"],
        "facil": ["Holanda (Países Baixos)"],
        "medio": ["Haiti", "Honduras", "Hungria"],
        "dificil": []
    },
    {
        "id": "pais_i",
        "texto": "Nome de países que começam com 'I'",
        "tags": ["Geografia", "Países"],
        "facil": ["Índia", "Indonésia", "Irlanda", "Israel", "Itália"],
        "medio": ["Iêmen", "Irã", "Iraque", "Islândia"],
        "dificil": [],
        "invalido": ["Iugoslávia (não existe mais)"]
    },
    {
        "id": "pais_j",
        "texto": "Nome de países que começam com 'J'",
        "tags": ["Geografia", "Países"],
        "facil": ["Jamaica", "Japão"],
        "medio": ["Jordânia"],
        "dificil": []
    },
    {
        "id": "pais_k",
        "texto": "Nome de países que começam com 'K'",
        "tags": ["Geografia", "Países"],
        "facil": [],
        "medio": ["Kuwait"],
        "dificil": ["Kiribati"],
        "invalido": ["Kenya (Quênia)"]
    },
    {
        "id": "pais_l",
        "texto": "Nome de países que começam com 'L'",
        "tags": ["Geografia", "Países"],
        "facil": ["Líbano", "Líbia", "Luxemburgo"],
        "medio": ["Laos", "Letônia", "Libéria", "Lituânia"],
        "dificil": ["Lesoto", "Liechtenstein"]
    },
    {
        "id": "pais_m",
        "texto": "Nome de países que começam com 'M'",
        "tags": ["Geografia", "Países"],
        "facil": ["Marrocos", "México", "Moçambique", "Mônaco"],
        "medio": ["Madagascar", "Malásia", "Maldivas", "Mali", "Malta", "Mianmar", "Mongólia", "Montenegro"],
        "dificil": ["Malaui", "Maurício (Ilhas Maurício)", "Mauritânia", "Micronésia", "Moldávia", "Macedônia do Norte"]
    },
    {
        "id": "pais_n",
        "texto": "Nome de países que começam com 'N'",
        "tags": ["Geografia", "Países"],
        "facil": ["Nigéria", "Noruega", "Nova Zelândia"],
        "medio": ["Nicarágua", "Namíbia", "Nepal", "Níger"],
        "dificil": ["Nauru"]
    },
    {
        "id": "pais_p",
        "texto": "Nome de países que começam com 'P'",
        "tags": ["Geografia", "Países"],
        "facil": ["Países Baixos (Holanda)", "Panamá", "Paraguai", "Peru", "Polônia", "Portugal"],
        "medio": ["Paquistão", "Papua-Nova Guiné"],
        "dificil": ["Palau"]
    },
    {
        "id": "pais_q",
        "texto": "Nome de países que começam com 'Q'",
        "tags": ["Geografia", "Países"],
        "facil": [],
        "medio": ["Qatar (Catar)", "Quênia"],
        "dificil": ["Quirguistão"]
    },
    {
        "id": "pais_r",
        "texto": "Nome de países que começam com 'R'",
        "tags": ["Geografia", "Países"],
        "facil": ["Rússia"],
        "medio": ["República Tcheca", "Romênia", "Ruanda"],
        "dificil": ["Reino Unido (União Política)", "República Centro-Africana", "República Democrática do Congo", "República Dominicana"]
    },
    {
        "id": "pais_s",
        "texto": "Nome de países que começam com 'S'",
        "tags": ["Geografia", "Países"],
        "facil": ["Senegal", "Sérvia", "Singapura", "Síria", "Suécia", "Suíça"],
        "medio": ["Somália", "Sri Lanka", "Sudão", "Sudão do Sul", "Suriname", "Samoa", "Serra Leoa"],
        "dificil": ["Salomão", "Santa Lúcia", "São Cristóvão e Neves", "São Tomé e Príncipe", "São Vicente e Granadinas", "Seychelles"]
    },
    {
        "id": "pais_t",
        "texto": "Nome de países que começam com 'T'",
        "tags": ["Geografia", "Países"],
        "facil": ["Tailândia", "Tunísia", "Turquia"],
        "medio": ["Tanzânia", "Timor-Leste", "Togo", "Trinidad e Tobago", "Taiwan (praticamente independente)", "Tchequia (República Tcheca)"],
        "dificil": ["Tajiquistão", "Tonga", "Turcomenistão (Turquemenistão)", "Tuvalu"],
        "invalido": ["Tibete (não independente)"]
    },
    {
        "id": "pais_u",
        "texto": "Nome de países que começam com 'U'",
        "tags": ["Geografia", "Países"],
        "facil": ["Ucrânia", "Uruguai"],
        "medio": ["Uganda"],
        "dificil": ["Uzbequistão"]
    },
    {
        "id": "pais_v",
        "texto": "Nome de países que começam com 'V'",
        "tags": ["Geografia", "Países"],
        "facil": ["Vaticano", "Venezuela", "Vietnã"],
        "medio": [],
        "dificil": ["Vanuatu"]
    },
    {
        "id": "pais_x",
        "texto": "Nome de países que começam com 'X'",
        "tags": ["Geografia", "Países"],
        "facil": [],
        "medio": [],
        "dificil": ["Xian"],
        "invalido": ["Chechênia"]
    },
    {
        "id": "pais_z",
        "texto": "Nome de países que começam com 'Z'",
        "tags": ["Geografia", "Países"],
        "facil": [],
        "medio": ["Zimbábue"],
        "dificil": ["Zâmbia"]
    },
]