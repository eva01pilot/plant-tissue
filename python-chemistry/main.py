import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.tree import DecisionTreeRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.linear_model import Lasso
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, Response, UploadFile
from mendeleev import mendeleev
from chempy import Substance
from mendeleev.fetch import fetch_table
import pandas as pd
import statsmodels.api as sm
import plotly.express as px
import plotly.io as pio
import plotly.graph_objects as go
import numpy as np
origins = [
    "https://api.ilyadev.com",
    "*"
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_formula_meta/{formula}")
def read_item(formula: str):
    chem_element = Substance.from_formula(formula)
    elementsDict = dict()
    if chem_element.composition == None:
        return
    for key, value in chem_element.composition.items():
        elementsDict[mendeleev.element(key).symbol] = {
            "element":{
                "atomic_weight":mendeleev.element(key).atomic_weight,
                "atomic_number":mendeleev.element(key).atomic_number
            },
            "quantity":value
        }
    print("hi hey ge")
    json_compatible_item_data = jsonable_encoder(elementsDict)
    return JSONResponse(content=json_compatible_item_data)


@app.get("/get_formula_meta_v2/{formula}")
def get_meta(formula: str):
    chem_element = Substance.from_formula(formula)
    elementsDict = list()
    if chem_element.composition == None:
        return
    for key, value in chem_element.composition.items():
        elementsDict.append({
            "sign": mendeleev.element(key).symbol,
            "quantity":value
        })
    print(elementsDict)
    json_compatible_item_data = jsonable_encoder(elementsDict)
    return JSONResponse(content=json_compatible_item_data)

@app.get("/elements/all")
def get_all():
    table = fetch_table("elements")
    elems = table[['symbol', 'atomic_number',
                   'atomic_weight', 'name']]
    elems = elems.rename(columns={"symbol":"sign" })
    return Response(elems.to_json(orient="records"), media_type="application/json")

@app.post("/analysis/{feature}")
def analyze(feature:str, dataset: UploadFile):
    df=pd.read_csv(dataset.file)
    corr_m = corr_matrix(df)
    linear_regression_res = linear_regression(df, feature)
    nn_res = neural_net(df, feature)
    decision_tree_res = decision_tree(df,feature)
    knn_res = knn(df, feature)
    random_forest_res = random_forest(df, feature)
    lasso_res = lasso(df, feature)
    ridge_res = ridge(df, feature)
    result = dict(corr_matrix = corr_m, linear_regression =
                  linear_regression_res, neural_net = nn_res,
                  decision_tree=decision_tree_res, knn=knn_res,
                  random_forest = random_forest_res, lasso = lasso_res,
                  ridge=ridge_res)

    encoded = jsonable_encoder(result)
    return JSONResponse(content=encoded)

def csvToDf(buffer):
    df = pd.read_csv(buffer)
    df.to_csv('data_final.csv', index=False)
    return df

def corr_matrix(df: pd.DataFrame):
    print(df)
    corr_m = df.corr()
    fig = go.Figure()
    fig.add_trace(
        go.Heatmap(
            x = corr_m.columns,
            y = corr_m.index,
            z = np.array(corr_m),
            text=corr_m.values,
            texttemplate='%{text:.2f}'
        )
    )
    return fig.to_html(full_html=False, include_plotlyjs=False)

def linear_regression(df: pd.DataFrame, param: str):
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    X = sm.add_constant(X)

    model = sm.OLS(Y, X).fit()

    # Get the original column names from df, excluding the last 6
    df_excluded = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])
    x_vars = df_excluded.columns
    graphs = []
    # Создание графика pairplot с линией тренда
    for _,col in enumerate(x_vars):
        fig = px.scatter(df, x=col, y=param, trendline="ols")
        graphs.append(fig.to_html(full_html=False,include_plotlyjs=False))
    return {
        "graphs": graphs,
        "summary": model.summary().as_html()
    }

def neural_net(df: pd.DataFrame, param: str):
    # Определение независимых и зависимой переменных
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])]).values

    Y = df[param].values

    # Разделение данных на обучающий и тестовый наборы
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Преобразование в тензоры PyTorch
    X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train, dtype=torch.float32).view(-1, 1)
    X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test, dtype=torch.float32).view(-1, 1)

    # Создание класса для нейронной сети
    class RegressionNN(nn.Module):
        def __init__(self, input_dim):
            super(RegressionNN, self).__init__()
            self.hidden = nn.Linear(input_dim, 10)
            self.relu = nn.ReLU()
            self.output = nn.Linear(10, 1)

        def forward(self, x):
            x = self.hidden(x)
            x = self.relu(x)
            x = self.output(x)
            return x

    # Обучение модели
    model = RegressionNN(X_train.shape[1])
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    num_epochs = 1000
    for epoch in range(num_epochs):
        optimizer.zero_grad()
        outputs = model(X_train_tensor)
        loss = criterion(outputs, y_train_tensor)
        loss.backward()
        optimizer.step()

    # Предсказание на тестовых данных
    y_pred_tensor = model(X_test_tensor)
    y_pred = y_pred_tensor.detach().numpy()

    # Вычисление метрик
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    # Преобразование данных в DataFrame для использования Plotly
    data = {'Actual': y_test, 'Predicted': y_pred.flatten()}
    df_plot = pd.DataFrame(data)

    # Вычисление коэффициентов линейной регрессии для линии тренда
    coefficients = np.polyfit(df_plot['Actual'], df_plot['Predicted'], 1)
    line = np.polyval(coefficients, df_plot['Actual'])

    # Создание графика с точками, линией тренда и легендой
    fig = px.scatter(df_plot, x='Actual', y='Predicted', title='Neural Network Регрессия: Предсказанные против Фактических значений' +param)
    fig.add_trace(go.Scatter(x=df_plot['Actual'], y=line, mode='lines', name='Trend Line'))
    fig.add_trace(go.Scatter(x=df_plot['Actual'], y=df_plot['Actual'], mode='markers', marker=dict(color='blue'), name='Actual'))
    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
        "mse": mse,
        "r2": r2
    }

def decision_tree(df: pd.DataFrame, param:str):

    # Определение независимых и зависимой переменных
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    # Разделение данных на обучающую и тестовую выборки
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)

    # Создание и обучение модели дерева решений с регуляризацией
    tree_regressor = DecisionTreeRegressor(max_depth=50, min_samples_split=10, min_samples_leaf=3, max_features='sqrt')
    tree_regressor.fit(X_train, Y_train)

    # Предсказание на тестовом наборе данных
    Y_pred = tree_regressor.predict(X_test)

    # Оценка качества модели
    mse = mean_squared_error(Y_test, Y_pred)
    r2 = r2_score(Y_test, Y_pred)

    # Создание списков для визуализации
    x_values = list(range(len(Y_test)))
    y_actual = list(Y_test)
    y_predicted = list(Y_pred)

    # Создание трасс для визуализации
    trace_actual = go.Scatter(x=x_values, y=y_actual, mode='markers', name='Actual')
    trace_predicted = go.Scatter(x=x_values, y=y_predicted, mode='lines', name='Predicted')

    # Создание лейаута для графика
    layout = go.Layout(title='Decision tree Регрессия: Предсказанные против Фактических значений ' + param, xaxis=dict(title='Index'), yaxis=dict(title='Value'))

    # Создание фигуры и отображение графика
    fig = go.Figure(data=[trace_actual, trace_predicted], layout=layout)
    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
        "mse": mse,
        "r2": r2
    }

def knn(df: pd.DataFrame, param: str):
    # Определение независимых и зависимой переменных
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    # Разделение данных на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Создание и обучение модели
    knn = KNeighborsRegressor(n_neighbors=5)
    knn.fit(X_train, y_train)

    # Предсказания на тестовой выборке
    y_pred = knn.predict(X_test)

    # Визуализация предсказанных значений против фактических значений с использованием Plotly
    fig = go.Figure()

    # Добавление точек: предсказанные против фактических значений
    fig.add_trace(go.Scatter(x=y_test, y=y_pred, mode='markers', name='Предсказанные значения'))

    # Добавление линии идеального совпадения
    fig.add_trace(go.Scatter(x=[min(y_test), max(y_test)], y=[min(y_test), max(y_test)],
                             mode='lines', name='Идеальное совпадение', line=dict(color='red', dash='dash')))

    # Настройка осей и заголовка
    fig.update_layout(title='KNN Регрессия: Предсказанные против Фактических значений reproduction_coefficient',
                      xaxis_title='Фактические значения',
                      yaxis_title='Предсказанные значения',
                      showlegend=True)

    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
    }

def random_forest(df: pd.DataFrame, param: str):
    # Определение независимых и зависимой переменных
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    # Разделение данных на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Создание и обучение модели
    rf = RandomForestRegressor(n_estimators=100, random_state=42)
    rf.fit(X_train, y_train)

    # Предсказания на тестовой выборке
    y_pred = rf.predict(X_test)

    # Визуализация предсказанных значений против фактических значений с использованием Plotly
    fig = go.Figure()

    # Добавление точек: предсказанные против фактических значений
    fig.add_trace(go.Scatter(x=y_test, y=y_pred, mode='markers', name='Предсказанные значения'))

    # Добавление линии идеального совпадения
    fig.add_trace(go.Scatter(x=[min(y_test), max(y_test)], y=[min(y_test), max(y_test)],
                             mode='lines', name='Идеальное совпадение', line=dict(color='red', dash='dash')))

    # Настройка осей и заголовка
    fig.update_layout(title='Random Forest Регрессия: Предсказанные против Фактических значений ' + param,
                      xaxis_title='Фактические значения',
                      yaxis_title='Предсказанные значения',
                      showlegend=True)

    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
    }

def lasso(df: pd.DataFrame, param: str):
    # Определение независимых и зависимой переменных
    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    # Разделение данных на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Создание и обучение модели
    lasso = Lasso(alpha=1)
    lasso.fit(X_train, y_train)

    # Предсказания на тестовой выборке
    y_pred = lasso.predict(X_test)

    # Вычисление средней ошибки (Mean Squared Error)
    mse = mean_squared_error(y_test, y_pred)

    # Вычисление R-квадрат
    r2 = r2_score(y_test, y_pred)

    # Получение коэффициентов модели
    coefficients = lasso.coef_

    # Визуализация предсказанных значений против фактических значений с использованием Plotly
    fig = go.Figure()

    # Добавление точек: предсказанные против фактических значений
    fig.add_trace(go.Scatter(x=y_test, y=y_pred, mode='markers', name='Предсказанные значения'))

    # Добавление линии идеального совпадения
    fig.add_trace(go.Scatter(x=[min(y_test), max(y_test)], y=[min(y_test), max(y_test)],
                             mode='lines', name='Идеальное совпадение', line=dict(color='red', dash='dash')))

    # Настройка осей и заголовка
    fig.update_layout(title='Lasso Регрессия: Предсказанные против Фактических значений ' + param,
                      xaxis_title='Фактические значения',
                      yaxis_title='Предсказанные значения',
                      showlegend=True)


    print("Средняя ошибка (MSE):", mse)
    print("R-квадрат:", r2)

    # Получение имен независимых переменных
    feature_names = X.columns

    # Создание словаря для соответствия коэффициентов и переменных
    coefficients_dict = {feature_names[i]: coefficients[i] for i in range(len(feature_names))}
    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
        "coefficients": coefficients_dict,
        "mse": mse,
        "r2": r2
    }

def ridge(df: pd.DataFrame, param: str):

    X = (df[df.columns.difference(['plant_height', 'node_count',
                                               'chlorophyll_percent',
                                               'side_shoots_count',
                                               'reproduction_coefficient',
                                               'true_leaves_count'])])

    Y = df[param]

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Создание и обучение модели
    ridge = Ridge(alpha=1)
    ridge.fit(X_train, y_train)

    # Предсказания на тестовой выборке
    y_pred = ridge.predict(X_test)

    # Вычисление средней ошибки (Mean Squared Error)
    mse = mean_squared_error(y_test, y_pred)

    # Вычисление R-квадрат
    r2 = r2_score(y_test, y_pred)

    # Получение коэффициентов модели
    coefficients = ridge.coef_

    # Получение имен независимых переменных
    feature_names = X.columns

    # Создание словаря для соответствия коэффициентов и переменных
    coefficients_dict = {feature_names[i]: coefficients[i] for i in range(len(feature_names))}


    # Визуализация предсказанных значений против фактических значений с использованием Plotly
    fig = go.Figure()

    # Добавление точек: предсказанные против фактических значений
    fig.add_trace(go.Scatter(x=y_test, y=y_pred, mode='markers', name='Предсказанные значения'))

    # Добавление линии идеального совпадения
    fig.add_trace(go.Scatter(x=[min(y_test), max(y_test)], y=[min(y_test), max(y_test)],
                             mode='lines', name='Идеальное совпадение', line=dict(color='red', dash='dash')))

    # Настройка осей и заголовка
    fig.update_layout(title='Ridge Регрессия: Предсказанные против Фактических значений ' + param,
                      xaxis_title='Фактические значения',
                      yaxis_title='Предсказанные значения',
                      showlegend=True)


    # Вывод коэффициентов с указанием соответствующих переменных
    return {
        "figure":fig.to_html(full_html=False,include_plotlyjs=False),
        "coefficients": coefficients_dict,
        "mse": mse,
        "r2": r2
    }
