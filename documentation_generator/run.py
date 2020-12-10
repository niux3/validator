#! venv/bin/python
# from config import config
from application import app


app.config.from_object('config')

if __name__ == "__main__":
    app.run()
