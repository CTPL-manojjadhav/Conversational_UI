# -*- coding: utf-8 -*-
from module import marathiNLP
 
def stemTokenize(text):
    t = marathiNLP.Processor(text)
    t.tokenize()
    return [t.generate_stem_words(w) for w in t.tokens]