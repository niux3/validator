from markdown import markdown
from flask import Flask, render_template
from config import root
import os
import re

app = Flask(__name__)

@app.route('/')
def home():
    readmefile = os.path.join(root, 'README.md')
    ctx = {
        'content': markdown(open(readmefile, 'r').read(), extensions=['extra'])
    }
    return render_template('index.html', **ctx)


@app.route('/examples/<page>')
def view(page):
    path_form = 'partials/views/form_%s.html' % page
    path_view = os.path.join(os.getcwd(), 'application/templates/', path_form)

    ctx = {
        'page_name': page,
        'path_form': path_form,
        'content_form': open(path_view, 'r').read()
    }
    return render_template('views/%s.html' % page, **ctx)


@app.context_processor
def context_processor():
    path = [
        root,
        'documentation_generator',
        'application',
        'templates',
        #'partials',
        'views',
    ]
    pattern = re.compile(r'(.*?)\.html')
    output = pattern.findall("form_basique.html")
    files = os.listdir(os.path.join(*path))
    return {
        'views': [ pattern.findall(file)[0] for file in files]
    }
