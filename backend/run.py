import os
from app import create_app, db
from app.models import Feature
import json

app = create_app()

def load_features_from_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


if __name__ == "__main__":
    port = int(os.environ.get("BACKEND_PORT", 5000))
    app.run(host="0.0.0.0", port=port)