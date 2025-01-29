import os
from app import create_app, db

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        port = int(os.environ.get("BACKEND_PORT", 5000))
        db.create_all()  # Crea las tablas en PostgreSQL
        print("Base de datos inicializada en PostgreSQL.")
    app.run(host="0.0.0.0", port=port)
