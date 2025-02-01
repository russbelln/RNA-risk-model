from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Configuración básica
    app.config.from_object(Config)

    # Habilitar CORS para todas las rutas
    CORS(app, resources={r"/*": {"origins": "https://rna-risk-model-frontend.onrender.com"}}, supports_credentials=True)

    
    db.init_app(app)
    migrate.init_app(app, db)

    # Registrar el Blueprint
    from app.routes.api import api  # Importa el Blueprint
    app.register_blueprint(api)

    return app