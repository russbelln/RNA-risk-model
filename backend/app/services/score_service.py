import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model

# Cargar el modelo entrenado
best_model = load_model("best_model.keras")

# Cargar el scaler guardado
scaler = joblib.load('scaler.pkl')

# Lista de características utilizadas en el modelo
selected_features = [
    'emp_length', 'home_ownership', 'annual_inc', 'delinq_2yrs', 'open_acc',
    'total_acc', 'tot_cur_bal'
]

# Mapeo manual de categorías a valores numéricos
categoria_a_numero = {
    'RENT': 0,
    'OWN': 1,
    'MORTGAGE': 2,
    'OTHER': 3
}

# Función para procesar un vector de características y predecir la probabilidad de incumplimiento
def predecir_incumplimiento(vector_caracteristicas):
    """
    Procesa un vector de características y devuelve la probabilidad de incumplimiento.

    Parámetros:
    - vector_caracteristicas: Lista o array con los valores de las características en el siguiente orden:
        ['emp_length', 'home_ownership', 'annual_inc', 'delinq_2yrs', 'open_acc', 'total_acc', 'tot_cur_bal']

    Retorna:
    - probabilidad_incumplimiento: Probabilidad de que el cliente incumpla (valor entre 0 y 1).
    """
    # Convertir el vector a un DataFrame para facilitar el procesamiento
    df = pd.DataFrame([vector_caracteristicas], columns=selected_features)

    # Aplicar el mapeo manual a la columna 'home_ownership'
    df['home_ownership'] = df['home_ownership'].map(categoria_a_numero).fillna(-1)  # Usar -1 para categorías desconocidas

    # Convertir las columnas numéricas a tipo float
    df = df.astype(float)

    # Aplicar la normalización usando el scaler guardado
    vector_normalizado = scaler.transform(df)

    # Realizar la predicción con el modelo
    probabilidad_incumplimiento = best_model.predict(vector_normalizado)[0][0]

    return probabilidad_incumplimiento
