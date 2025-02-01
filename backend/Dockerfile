# Imagen base ligera pero compatible
FROM python:3.10-slim

# Establecer directorio de trabajo
WORKDIR /backend

# Deshabilitar intentos de usar GPU y optimizaciones de TensorFlow
ENV TF_ENABLE_ONEDNN_OPTS=0
ENV CUDA_VISIBLE_DEVICES=-1


# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivos de la aplicación
COPY . .

# Instalar dependencias de Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Exponer el puerto en el que corre Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "wsgi:app"]


