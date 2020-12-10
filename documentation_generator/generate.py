import config
import requests
import os
import re


path = [
    config.root,
    'documentation_generator',
    'application',
    'templates',
    #'partials',
    'views',
]
pattern = re.compile(r'(.*?)\.html')
output = pattern.findall("form_basique.html")
files = os.listdir(os.path.join(*path))

target_folder = os.path.join(config.root, 'examples')

for view in [ pattern.findall(file)[0] for file in files]:
    target = os.path.join(target_folder, view)
    if not os.path.exists(target):
        os.makedirs(target)
    raw = requests.get('http://localhost:%s/%s' % (config.port, view))
    content = raw.text.replace('/static', '../static')
    with open(os.path.join(target, 'index.html'), 'w') as f:
        f.write(content)
    print("--> %s done !" % view)
