import os
from app import create_app, db
from app.models import Feature
import json

app = create_app()

def load_features_from_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)

def sync_db():
    """Sincroniza la base de datos con el archivo de configuración."""
    with app.app_context():
        features = load_features_from_json("config/features.json")

        for feature in features:
            existing = Feature.query.filter_by(name=feature["name"]).first()
            if not existing:
                new_feature = Feature(
                    name=feature["name"],
                    type=feature["type"],
                    options=feature.get("options", None),
                    description=feature.get("description", None)
                )
                db.session.add(new_feature)

        db.session.commit()
        print("Base de datos sincronizada con el archivo de configuración.")

if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)