from app import db

class Feature(db.Model):
    __tablename__ = 'features'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # 'number', 'text', 'dropdown'
    options = db.Column(db.Text, nullable=True)  # Opciones si es dropdown
    description = db.Column(db.String(200), nullable=True)

class UserInput(db.Model):
    __tablename__ = 'user_inputs'
    id = db.Column(db.Integer, primary_key=True)
    features = db.Column(db.Text, nullable=False)  # JSON con características ingresadas
    score = db.Column(db.Float, nullable=True)  # Puntaje calculado
