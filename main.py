import os
import pandas as pd
from numpy.ma.core import equal

# Load the data
data1 = pd.read_csv('data1/worldometer_coronavirus_daily_data.csv')
data2 = pd.read_csv('data2/full_grouped.csv')
data3 = pd.read_csv('data3/owid-monkeypox-data.csv')

data1_final_columns = ["date", "country", "total_cases", "new_cases", "active_cases", "total_deaths", "new_deaths", "total_recovered", "daily_recovered"]
data2_final_columns = ["date", "country", "total_cases", "new_cases", "active_cases", "total_deaths", "new_deaths", "total_recovered", "daily_recovered"]
data3_final_columns = ["date", "country", "total_cases", "new_cases", "total_deaths", "new_deaths"]

# Standardize column names
data1.columns = data1.columns.str.lower().str.replace(' ', '_')
data2.columns = data2.columns.str.lower().str.replace(' ', '_')
data3.columns = data3.columns.str.lower().str.replace(' ', '_')


# Rename all columns to match the final columns

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

data2['date'] = pd.to_datetime(data2['date'])

data1["Previous_Total_Cases"] = data1["total_cases"].shift(1).fillna(0)

# Calculate daily recoveries
data1["total_recovered"] = (data1["Previous_Total_Cases"] + data1["new_cases"]) - (data1["active_cases"] + data1["total_deaths"])
data1["total_recovered"] = data1["total_recovered"].clip(lower=0)

data1.fillna(0, inplace=True)
data2.fillna(0, inplace=True)
data3.fillna(0, inplace=True)

all_datas=[]


for country, group in data1.groupby("country"):
    # Créer un fichier CSV pour chaque pays avec un nom spécifique
    os.makedirs('tempfilter', exist_ok=True)
    group.to_csv(f'tempfilter/{country}_data1_filtered.csv', index=False)

for file_name in os.listdir(f'tempfilter'):
    file_path=os.path.join('tempfilter', file_name)
    try:
        dataf = pd.read_csv(file_path, delimiter=',')

        dataf["Previous_Total_Recovery"] = dataf["total_recovered"].shift(1).fillna(0)

        dataf["daily_recovered"] = (dataf["total_recovered"]- dataf["Previous_Total_Recovery"])

        all_datas.append(dataf)
    except Exception as e:
        print(e)

data1 = pd.concat(all_datas)
# Delete all file inside folder tempfilter & remove directory
for file_name in os.listdir(f'tempfilter'):
    file_path=os.path.join('tempfilter', file_name)
    os.remove(file_path)
os.rmdir('tempfilter')

data1 = data1[data1_final_columns]
data2 = data2[data2_final_columns]
data3 = data3[data3_final_columns]


if "daily_recovered" in data1.columns:
    data1 = data1[data1_final_columns]
else:
    print("'daily_recovered' n'est pas présent dans les colonnes de data1")


# Save the filtered data
os.makedirs('filtered', exist_ok=True)
data2.to_csv('filtered/data2_filtered.csv', index=False)
data3.to_csv('filtered/data3_filtered.csv', index=False)
data1.to_csv('filtered/data1_filtered.csv', index=False)
