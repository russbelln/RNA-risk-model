import pandas as pd
import numpy as np
import joblib
from tensorflow.keras.models import load_model


# Load the model and the scaler
scaler = joblib.load('scaler.pkl')
label_encoders = joblib.load('label_encoders.pkl')
model = load_model("modelo_probabilidad.keras")

# Define the categorical features
categorical_features = ['term', 'sub_grade', 'home_ownership', 'verification_status', 
                        'purpose', 'initial_list_status', 'application_type']

# Define the feature names
feature_names = [
    'term', 'int_rate', 'installment', 'sub_grade', 'emp_length', 'home_ownership',
    'annual_inc', 'verification_status', 'purpose', 'dti', 'delinq_2yrs', 'inq_last_6mths',
    'open_acc', 'pub_rec', 'revol_bal', 'revol_util', 'total_acc', 'initial_list_status',
    'out_prncp', 'total_rec_prncp', 'total_rec_int', 'total_rec_late_fee', 'last_pymnt_amnt',
    'collections_12_mths_ex_med', 'application_type', 'acc_now_delinq', 'tot_coll_amt',
    'tot_cur_bal', 'total_rev_hi_lim'
]

def normalize(X_user):
    X_user_ordered = [X_user.get(name) for name in feature_names]
    df_new = pd.DataFrame([X_user_ordered], columns=feature_names)

    for col in categorical_features:
        if col in label_encoders:
            # Check if the category exists in the LabelEncoder
            if df_new[col].iloc[0] not in label_encoders[col].classes_:
                raise ValueError(f"⚠️  Error column'{df_new[col].iloc[0]}' in '{col}' don't exist in the LabelEncoder.")
            df_new[col] = label_encoders[col].transform(df_new[col])
        else:
            raise ValueError(f"⚠️ Error: LabelEncoder not found '{col}'.")
        
    df_new = df_new.astype(float)
    X_new_normalize = scaler.transform(df_new)
    return X_new_normalize


def predict_pro(X_new_normalize):
    """
    function to predict the probability of default
    """
    X_new_normalize = np.array(X_new_normalize, dtype=np.float32).reshape(1, -1)  # Reshape to 2D array

    # 
    expected_features = model.input_shape[1]  # Keras model input shape
    if X_new_normalize.shape[1] != expected_features:
        raise ValueError(f"⚠️ Error: Models expects {expected_features} efatures, but {X_new_normalize.shape[1]}")

    # obtain the probability of default
    probabilidad = model.predict(X_new_normalize)[0][0]  # Keras returns a 2D array
    
    return probabilidad

def calculate_probability(X_user):
    X_new_normalize = normalize(X_user)
    probabilidad = predict_pro(X_new_normalize)
    return probabilidad