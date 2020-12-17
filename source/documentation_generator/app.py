#! venv/bin/python
import os
from app import create_app
from config import config

app = create_app(config['default'])

if __name__ == '__main__':
    app.run(port=config['default'].PORT)
