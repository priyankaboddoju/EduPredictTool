# Setup Instructions and Environment Requirements

## 🛠️ Local Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/priyankaboddoju/EduPredictTool.git
cd EduPredictTool
```

2. **Install Python Dependencies**

> Note: This project does not include a `requirements.txt`. Please install dependencies manually:

```bash
pip install pandas numpy matplotlib plotly statsmodels jupyter
```

3. **Launch Notebooks (Optional for Local Testing)**

```bash
jupyter notebook
```

Open any `.ipynb` such as `ARIMA_FORECAST_OTHER_COLUMNS_ACADEMIC.ipynb` to view or rerun the forecasting models.

4. **Power BI Dashboard**

* Open `TEAM_2_PROJECT_7_DASHBOARD.pbix` using Power BI Desktop (latest version recommended).
* Ensure `forecasted_data_all_columns_until_2032_status.csv` and other source files are located correctly if refreshing data.

5. **To View the Web MVP (if public)**
   Visit: [https://priyankaboddoju.github.io/EduPredictTool/](https://priyankaboddoju.github.io/EduPredictTool/)

> ⚠️ **Note**: GitHub Pages only works when the repository is public.

---

## 🧩 Folder Structure (Key Files)

```
EduPredictTool/
├── docs/                      # Files hosted on GitHub Pages
├── Datasets/                 # FA24 and historical data
├── *.ipynb                   # Notebooks for analysis & forecasting
├── *.pbix                    # Power BI Dashboard
├── README.md                 # Main repo README
```

---

## 🧪 Environment Requirements

* Python 3.8 or higher
* Power BI Desktop (for .pbix file)
* Git (for cloning)
* Browser (for viewing GitHub Pages)

---

