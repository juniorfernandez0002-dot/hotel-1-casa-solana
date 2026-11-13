import sys
from PIL import Image

for name in ['interbank-card.webp', 'bcp-card.png', 'bbva-card.webp', 'diners-card.png', 'scotiabank-card.png', 'interbank-dark.png', 'bcp-dark.png', 'bbva-dark.png', 'diners-dark.png']:
    p = 'public/images/brands/' + name
    im = Image.open(p)
    print(name, im.size)
