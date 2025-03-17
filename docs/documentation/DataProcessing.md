# Documentation du Processus de Collecte et de Nettoyage des Données

## 1. Introduction
Ce document détaille le processus de collecte, d'extraction et de nettoyage des ensembles de données COVID-19 et variole du singe (Mpox). Les données sont récupérées depuis Kaggle, traitées et filtrées pour assurer leur cohérence et leur qualité avant analyse.

## 2. Collecte des Données

### 2.1. Sources des Données
Les données proviennent de trois sources principales sur Kaggle :
- **COVID-19 Global Dataset** (worldometer)
- **Corona Virus Report** (Johns Hopkins)
- **Mpox Monkeypox Data** (Our World in Data)

### 2.2. Téléchargement et Extraction
Le script télécharge les fichiers ZIP contenant les données, les extrait dans des dossiers spécifiques et supprime les archives compressées.

#### 2.2.1. Configuration des Dossiers
Le script définit un répertoire de téléchargement et des destinations d'extraction pour chaque ensemble de données.
```python
DOWNLOAD_PATH = os.path.expanduser("/downloads")
```

#### 2.2.2. Téléchargement via curl
Chaque fichier est téléchargé via `curl` en utilisant l'URL spécifique du dataset.
```python
command = f'curl -L -o "{file_path}" "{info["url"]}"'
subprocess.run(command, shell=True, check=True)
```

#### 2.2.3. Extraction et Suppression des Archives
Les fichiers ZIP sont extraits, et le fichier compressé est supprimé après extraction.
```python
with zipfile.ZipFile(file_path, 'r') as zip_ref:
    zip_ref.extractall(extract_path)
os.remove(file_path)
```

## 3. Nettoyage et Prétraitement des Données

### 3.1. Chargement des Données
Chaque fichier CSV est chargé en mémoire avec `pandas`.
```python
data1 = pd.read_csv('data1/worldometer_coronavirus_daily_data.csv')
data2 = pd.read_csv('data2/full_grouped.csv')
data3 = pd.read_csv('data3/owid-monkeypox-data.csv')
```

### 3.2. Standardisation des Noms de Colonnes
Les noms de colonnes sont convertis en minuscules et les espaces remplacés par des underscores.
```python
data1.columns = data1.columns.str.lower().str.replace(' ', '_')
```

### 3.3. Renommage des Colonnes Clés
Les colonnes essentielles sont renommées pour assurer la cohérence entre les différents datasets.
```python
data1.rename(columns={
    "cumulative_total_cases": "total_cases",
    "daily_new_cases": "new_cases",
    "cumulative_total_deaths": "total_deaths",
    "daily_new_deaths": "new_deaths"
}, inplace=True)
```

### 3.4. Gestion des Valeurs Manquantes
Toutes les valeurs `NaN` sont remplacées par `0`.
```python
data1.fillna(0, inplace=True)
data2.fillna(0, inplace=True)
data3.fillna(0, inplace=True)
```

### 3.5. Calcul des Récupérations Quotidiennes
Les récupérations quotidiennes sont calculées à partir des valeurs de récupération totale des jours précédents.
```python
data1["Previous_Total_Cases"] = data1["total_cases"].shift(1).fillna(0)
data1["total_recovered"] = (data1["Previous_Total_Cases"] + data1["new_cases"]) - (data1["active_cases"] + data1["total_deaths"])
data1["total_recovered"] = data1["total_recovered"].clip(lower=0)
```

### 3.6. Séparation et Filtrage par Pays
Chaque pays est isolé dans un fichier CSV temporaire.
```python
for country, group in data1.groupby("country"):
    os.makedirs('tempfilter', exist_ok=True)
    group.to_csv(f'tempfilter/{country}_data1_filtered.csv', index=False)
```

Chaque fichier est ensuite lu et retraité pour calculer les récupérations quotidiennes.
```python
dataf["Previous_Total_Recovery"] = dataf["total_recovered"].shift(1).fillna(0)
dataf["daily_recovered"] = (dataf["total_recovered"] - dataf["Previous_Total_Recovery"])
```

Enfin, les fichiers temporaires sont supprimés après traitement.
```python
for file_name in os.listdir(f'tempfilter'):
    os.remove(os.path.join('tempfilter', file_name))
os.rmdir('tempfilter')
```

### 3.7. Sélection des Colonnes Finales
Chaque dataset est réduit aux colonnes pertinentes.
```python
data1 = data1[["date", "country", "total_cases", "new_cases", "active_cases", "total_deaths", "new_deaths", "total_recovered", "daily_recovered"]]
data2 = data2[["date", "country", "total_cases", "new_cases", "active_cases", "total_deaths", "new_deaths", "total_recovered", "daily_recovered"]]
data3 = data3[["date", "country", "total_cases", "new_cases", "total_deaths", "new_deaths"]]
```

## 4. Exportation des Données Nettoyées
Les datasets nettoyés sont sauvegardés dans un dossier `filtered/`.
```python
os.makedirs('filtered', exist_ok=True)
data1.to_csv('filtered/data1_filtered.csv', index=False)
data2.to_csv('filtered/data2_filtered.csv', index=False)
data3.to_csv('filtered/data3_filtered.csv', index=False)
```

## 5. Conclusion
Ce processus assure la collecte, l'extraction et le nettoyage des données avec standardisation des formats et des colonnes pour une analyse cohérente. Les datasets finaux sont prêts à être exploités pour la visualisation et l'analyse statistique.
