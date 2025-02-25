import pandas as pd
import psycopg2
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

# Paramètres de connexion PostgreSQL
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT", "5432")

# Créer une connexion à PostgreSQL
engine = create_engine(f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')

# Charger les fichiers CSV
data1 = pd.read_csv('filtered/data1_filtered.csv')  # COVID
data2 = pd.read_csv('filtered/data2_filtered.csv')  # COVID
data3 = pd.read_csv('filtered/data3_filtered.csv')  # MPOX

# Définir les noms des tables
TABLE_COVID = "covid_data"
TABLE_MPOX = "mpox_data"

# Charger les données COVID (data1 et data2)
data1.to_sql(TABLE_COVID, engine, if_exists='replace', index=False)
data2.to_sql(TABLE_COVID, engine, if_exists='replace', index=False)

# Charger les données MPOX (data3)
data3.to_sql(TABLE_MPOX, engine, if_exists='append', index=False)

print("Importation terminée avec succès !")