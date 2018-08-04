# -*- coding: utf-8 -*-
import warnings
from module import hindiNLP
warnings.filterwarnings("ignore")
def stemTokenize(text):
 t=hindiNLP.Processor(text)
 t.tokenize()
 return[t.generate_stem_words(w)for w in t.tokens]
# Created by pyminifier (https://github.com/liftoff/pyminifier)
