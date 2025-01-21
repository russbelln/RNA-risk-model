from app import create_app, db
from app.models import Feature

app = create_app()

with app.app_context():
    # Características iniciales
    features = [
        Feature(name="Edad", type="number", description="Edad del solicitante"),
        Feature(name="Ingreso", type="number", description="Ingreso mensual en USD"),
        Feature(name="Historial de crédito", type="dropdown", options="Bueno,Malo,Regular", description="Historial crediticio del solicitante"),
    ]

    # Insertar características en la base de datos
    db.session.bulk_save_objects(features)
    db.session.commit()
    print("Características iniciales agregadas.")
