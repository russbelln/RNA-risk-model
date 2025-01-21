class Config:
    SECRET_KEY = 'supersecretkey'  # Cambiar por una clave segura
    SQLALCHEMY_DATABASE_URI = 'postgresql://admin:admin@localhost/riskmodel'  # Cambiar a PostgreSQL para producción
    SQLALCHEMY_TRACK_MODIFICATIONS = False
