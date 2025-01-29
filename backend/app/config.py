import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")  # Render proporciona esta variable automáticamente
    SQLALCHEMY_TRACK_MODIFICATIONS = False
