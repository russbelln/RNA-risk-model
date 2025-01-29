from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from app.config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Configuración básica
    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

    # Habilitar CORS para todas las rutas
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)

    # Registrar el Blueprint
    from app.routes.api import api  # Importa el Blueprint
    app.register_blueprint(api)  # Registra el Blueprint

    return app
