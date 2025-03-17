---
label: ETL Process
icon: checklist
order: 100
category: Documentation
---

# Présentation de la Solution ETL en Python pour le Traitement des Données Pandémiques

## 1. Introduction
Ce projet met en place une solution ETL (Extract, Transform, Load) en Python pour collecter, transformer et charger des données concernant les pandémies de COVID-19 et Monkeypox à partir de sources multiples. L'objectif est de préparer des données cohérentes et exploitables pour une analyse approfondie. Nous utilisons Python et ses bibliothèques comme pandas pour le traitement des données et la gestion des fichiers CSV.

---

## 2. Objectif de la Solution ETL
L'objectif principal de cette solution ETL est de traiter des fichiers CSV provenant de différentes sources de données (par exemple, Worldometer, OWID, etc.) en trois étapes essentielles :
1. Extraction des données des fichiers sources.
2. Transformation pour harmoniser, nettoyer, et enrichir les données.
3. Chargement des données nettoyées dans un format prêt à l’analyse.

---

## 3. Description du Processus ETL

### 3.1. Extraction des Données (Extract)
L'extraction est effectuée en lisant des fichiers CSV provenant de différentes sources. Chaque fichier contient des informations relatives aux cas de COVID-19 ou de Monkeypox. Les données sont lues dans des DataFrames pandas pour faciliter leur traitement.

Les fichiers sources sont les suivants :
- `worldometer_coronavirus_daily_data.csv` (COVID-19 Worldometer)
- `full_grouped.csv` (COVID-19 Our World in Data)
- `owid-monkeypox-data.csv` (Monkeypox)

```python
data1 = pd.read_csv('data1/worldometer_coronavirus_daily_data.csv')
data2 = pd.read_csv('data2/full_grouped.csv')
data3 = pd.read_csv('data3/owid-monkeypox-data.csv')
```

---

### 3.2. Transformation des Données (Transform)
Une fois les données extraites, plusieurs transformations sont effectuées pour assurer l'homogénéité et la cohérence des données à travers les différentes sources :

1. **Renommage des Colonnes** : Les colonnes des trois DataFrames sont renommées pour correspondre à une structure uniforme et simplifiée.

```python
data1.rename(columns={
    "date": "date",
    "country": "country",
    "cumulative_total_cases": "total_cases",
    "daily_new_cases": "new_cases",
    "active_cases": "active_cases",
    "cumulative_total_deaths": "total_deaths",
    "daily_new_deaths": "new_deaths"
}, inplace=True)


data2.rename(columns={
    "date": "date",
    "country/region": "country",
    "confirmed": "total_cases",
    "deaths": "total_deaths",
    "new_cases": "new_cases",
    "new_deaths": "new_deaths",
    "active": "active_cases",
    "recovered": "total_recovered",
    "new_recovered": "daily_recovered"
}, inplace=True)

data3.rename(columns={
    "location": "country",
    "date": "date",
    "total_cases": "total_cases",
    "new_cases": "new_cases",
    "active_cases": "active_cases",
    "total_deaths": "total_deaths",
    "new_deaths": "new_deaths"
}, inplace=True)
```

2. **Conversion des Dates** : La colonne date est convertie en un format datetime.

```python
data2['date'] = pd.to_datetime(data2['date'])
```

3. **Calcul des Récupérations Quotidiennes** : La colonne `daily_recovered` est calculée pour estimer le nombre de récupérations quotidiennes.

```python
data1["total_recovered"] = (data1["Previous_Total_Cases"] + data1["new_cases"]) - (data1["active_cases"] + data1["total_deaths"])
data1["total_recovered"] = data1["total_recovered"].clip(lower=0)
```

4. **Gestion des Valeurs Manquantes** : Les valeurs manquantes sont remplacées par zéro (0).

```python
data1.fillna(0, inplace=True)
data2.fillna(0, inplace=True)
data3.fillna(0, inplace=True)
```

5. **Filtrage des Données par Pays** : Les données sont groupées par pays et stockées dans des fichiers CSV temporaires.

```python
for country, group in data1.groupby("country"):
    os.makedirs('tempfilter', exist_ok=True)
    group.to_csv(f'tempfilter/{country}_data1_filtered.csv', index=False)
```
6. **Calcul de `daily_recovered` pour chaque pays** : Basé sur la différence entre les récupérations du jour et celles de la veille.

```python
        dataf = pd.read_csv(file_path, delimiter=',')
        dataf["Previous_Total_Recovery"] = dataf["total_recovered"].shift(1).fillna(0)
        dataf["daily_recovered"] = (dataf["total_recovered"]- dataf["Previous_Total_Recovery"])
```

---

### 3.3. Chargement des Données (Load)
Une fois les transformations effectuées, les données sont chargées dans une base de données PostgreSQL.

1. **Connexion à PostgreSQL** :
   - Les informations de connexion sont stockées dans un fichier `.env`.

```python
load_dotenv()
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "5432")

print("Connecting to PostgreSQL...")
engine = create_engine(f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
engine.connect()
```

2. **Chargement des fichiers CSV** :
   - Les fichiers transformés sont lus avec Pandas.
   - Trois fichiers sont pris en compte : deux pour les données COVID et un pour Monkeypox.

```python
data1 = pd.read_csv('filtered/data1_filtered.csv')  # COVID
data2 = pd.read_csv('filtered/data2_filtered.csv')  # COVID
data3 = pd.read_csv('filtered/data3_filtered.csv')  # MPOX
```

3. **Insertion dans PostgreSQL** :
   - Les données COVID sont insérées dans `covid_data` avec `if_exists='replace'`.
   - Les données Monkeypox sont ajoutées à `mpox_data` en mode `append`.

```python
TABLE_COVID = "covid_data"
TABLE_MPOX = "mpox_data"

print("Importing data...")
data1.to_sql(TABLE_COVID, engine, if_exists='replace', index=False)
data2.to_sql(TABLE_COVID, engine, if_exists='replace', index=False)
data3.to_sql(TABLE_MPOX, engine, if_exists='append', index=False)
```

4. **Fermeture de la connexion** :
   - Une fois les données chargées, la connexion est fermée.

```python
engine.dispose()
```

---

## 4. Justification de la Solution ETL en Python

### 4.1. Utilisation de Pandas pour la Transformation des Données
Pandas permet de :
- Lire et écrire facilement des fichiers CSV.
- Appliquer des transformations complexes sur les données.
- Gérer les valeurs manquantes avec `fillna`.
- Manipuler efficacement les données temporelles.

### 4.2. Flexibilité et Extensibilité de la Solution
- Facile à adapter pour inclure de nouvelles sources de données.
- Permet des ajustements rapides aux transformations.

### 4.3. Gestion des Fichiers Temporaires
- Création de fichiers CSV temporaires, supprimés après utilisation pour optimiser la mémoire.

### 4.4. Séparation des Étapes ETL
- Améliore la lisibilité et la maintenance du code.
- Facilite le diagnostic des erreurs.

### 4.5. Organisation des Fichiers
- Stockage des fichiers transformés dans `filtered/` pour une gestion optimale.

---

## 5. Comparaison des Solutions ETL

| Solution ETL | Langage | Facilité d'utilisation | Performance | Extensibilité | Coût |
|-------------|---------|----------------------|------------|--------------|------|
| Python (Pandas) | Python | Facile | Bonne | Très flexible | Gratuit |
| Apache Nifi | Java | Interface intuitive | Bonne | Modulaire | Gratuit |
| Talend | Java | Moyen | Excellente | Très modulaire | Payant |
| Apache Spark | Scala, Python | Complexe | Très élevée | Très flexible | Gratuit (Open-source) |
| Airflow | Python | Complexe | Bonne | Très modulaire | Gratuit |

- **Python (Pandas)** : Idéal pour des ETL rapides et flexibles sur des fichiers CSV.
- **Apache Nifi** : Solution visuelle pour les workflows de données.
- **Talend** : Robuste mais coûteux.
- **Apache Spark** : Adapté aux traitements volumineux.
- **Airflow** : Plus orienté vers l'orchestration ETL.

---

## 6. Conclusion
Cette solution ETL en Python permet de traiter et transformer des données sur les pandémies COVID-19 et Monkeypox. L’utilisation de Pandas facilite la manipulation et la transformation des données, tout en offrant une grande flexibilité.

Le code est structuré de manière claire et modulaire, ce qui permet :
- D'ajouter facilement de nouvelles sources de données.
- D’apporter des ajustements aux transformations.

Cette solution est prête pour de futures extensions et s'adapte aux besoins de l'analyse de pandémie à grande échelle.
