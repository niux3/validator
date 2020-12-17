from markdown import markdown
from flask import Flask, render_template, Blueprint, request
from config import basedir
import os
import re
import requests


page = Blueprint('page', __name__, static_folder='static', template_folder='templates')


@page.route('/')
def home():
    readmefile = os.path.join(basedir[:basedir.rfind('/source')], 'README.md')
    ctx = {
        'content': markdown(open(readmefile, 'r').read(), extensions=['extra'])
    }
    return render_template('index.html', **ctx)


@page.route('/examples/<type>/<page>.html')
def view(type, page):
    path_form = 'partials/views/%s/form_%s.html' % (type, page)
    path_view = os.path.join(os.getcwd(), 'app','templates', path_form)
    ctx = {
        'type-configuration': type,
        'page_name': page,
        'path_form': path_form,
        'content_form': open(path_view, 'r').read()
    }
    return render_template('views/%s/%s.html' % (type, page), **ctx)


@page.route('/export.html')
def export():
    root = basedir[:basedir.rfind('/source')]
    path_to_examples = os.path.join(root, 'examples')
    path = os.path.join(*[
        basedir,
        'app',
        'templates',
        'views',
    ])
    pattern = re.compile(r'.*?\.html')
    pattern_header = re.compile(r'<header>(.|\n)*?</header>')

    if os.path.exists(path):
        for folderName, subfolders, filenames in os.walk(path):
            if folderName.endswith('views'):
                content = requests.get(request.host_url).text
                with open(f'{path_to_examples}/documentation.html', "w") as f:
                    f.write(pattern_header.sub('', content.replace('/static', 'static')))

            for subfolder in subfolders:
                if subfolder in ['html', 'objet']:
                    files = os.listdir(os.path.join(path, subfolder))

                    for view in [ pattern.findall(file)[0] for file in files]:
                        url = os.path.join(*[
                            request.host_url,
                            'examples',
                            subfolder,
                            view,
                        ])
                        content = requests.get(url).text.replace('/static', '../static')
                        target = os.path.join(root, 'examples', f'configuration-en-{subfolder}')
                        if not os.path.exists(target):
                            os.mkdir(target)
                        with open(f'{target}/{view}', "w") as f:
                            f.write(pattern_header.sub('', content))
    return 'done !'


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
    files = os.listdir(os.path.join(*path))
    return {
        'views': [ pattern.findall(file)[0] for file in files]
    }


@page.app_errorhandler(404)
def page_not_found(e):
    return render_template('partials/404.html'), 404


@page.app_errorhandler(500)
def internal_server_error(e):
    return render_template('partials/500.html'), 500
