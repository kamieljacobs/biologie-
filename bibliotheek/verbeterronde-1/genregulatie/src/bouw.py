# plakt //@@KLUWEN in src/<obj>_<opt>.js en schrijft <obj>/<opt>.js
import sys, pathlib
G = pathlib.Path(__file__).resolve().parent.parent
kl = (G / 'src/_kluwen.js').read_text()
tf = (G / 'src/_tfgedeeld.txt').read_text()
me = (G / 'src/_methyl.txt').read_text()
la = (G / 'src/_lac.txt').read_text()
k2 = (G / 'src/_kluwen2.js').read_text()
for f in sorted((G / 'src').glob('*_?.js')):
    obj, opt = f.stem.rsplit('_', 1)
    (G / obj / f'{opt}.js').write_text(f.read_text().replace('//@@KLUWEN\n', kl).replace('//@@TF\n', tf).replace('//@@METHYL\n', me).replace('//@@LAC\n', la).replace('//@@KLUWEN2\n', k2))
    print('gebouwd', obj, opt)
