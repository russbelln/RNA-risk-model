import os
from app import create_app, db
from flask_migrate import Migrate

from dotenv import load_dotenv

# Cargar variables desde .env
load_dotenv()

app = create_app()
migrate = Migrate(app, db)  # Agrega soporte para migraciones

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Crea las tablas si no existen
        print("Base de datos inicializada en PostgreSQL.")

    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)
