from flask import Blueprint, jsonify, request 
from app.models import Feature, UserInput
from app import db
from app.services.score_service import calculate_probability

api = Blueprint('api', __name__)

# Ruta para obtener características dinámicas
@api.route('/api/features', methods=['GET'])
def get_features():
    features = Feature.query.all()
    response = [
        {
            'id': feature.id,
            'name': feature.name,
            'type': feature.type,
            'options': feature.options,
            'description': feature.description
        }
        for feature in features
    ]
    return jsonify(response)

# Ruta para calcular el score
@api.route('/api/score', methods=['POST'])
def calculate_score():
    data = request.json
    user_features = data.get('features', {})
    
    
    # Lógica para calcular el score (placeholder)
    score = float(calculate_probability(user_features))
    
    # Guardar entrada del usuario
    user_input = UserInput(features=str(user_features), score=score)
    db.session.add(user_input)
    db.session.commit()
    
    return jsonify({'score': score})

# Ruta para estadísticas poblacionales (placeholder)
@api.route('/api/population-stats', methods=['GET'])
def get_population_stats():
    # Datos ficticios para estadística
    stats = {
        'average_score': 50,
        'percentiles': [25, 50, 75],
        'distribution': [10, 20, 30, 40, 50]
    }
    return jsonify(stats)

@api.route('/', methods=['GET'])
def home():
    endpoints = {
        "/api/features": "Obtener características dinámicas",
        "/api/score": "Calcular el score basado en las características del usuario (POST)",
        "/api/population-stats": "Obtener estadísticas poblacionales"
    }
    return jsonify({"message": "Bienvenido a la API de riesgo de crédito.", "endpoints": endpoints})


