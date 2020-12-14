from markdown import markdown
from flask import Flask, render_template, Blueprint
from config import basedir
import os
import re


page = Blueprint('page', __name__, static_folder='static', template_folder='templates')


@page.route('/')
def home():
    readmefile = os.path.join(os.path.dirname(basedir), 'README.md')
    ctx = {
        'content': markdown(open(readmefile, 'r').read(), extensions=['extra'])
    }
    return render_template('index.html', **ctx)


@page.route('/examples-configuration/<type>/<page>.html')
def view(type, page):
    path_form = 'partials/views/%s/form_%s.html' % (type, page)
    path_view = os.path.join(os.getcwd(), 'app','templates', path_form)

    # import pdb; pdb.set_trace()
    ctx = {
        'type-configuration': type,
        'page_name': page,
        'path_form': path_form,
        'content_form': open(path_view, 'r').read()
    }
    return render_template('views/%s/%s.html' % (type, page), **ctx)


@page.context_processor
def context_processor():
    path = [
        # basedir,
        # 'documentation_generator',
        'app',
        'templates',
        #'partials',
        'views',
        'objet',
    ]
    pattern = re.compile(r'(.*?)\.html')
    output = pattern.findall("form_basique.html")
    files = os.listdir(os.path.join(*path))
    return {
        'views': [ pattern.findall(file)[0] for file in files]
    }


@page.app_errorhandler(404)
def page_not_found(e):
    return render_template('partials/404.html'), 404


@page.app_errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500
