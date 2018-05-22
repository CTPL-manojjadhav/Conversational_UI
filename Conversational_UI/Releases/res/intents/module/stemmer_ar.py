# -*- coding: utf-8 -*-
from nltk import word_tokenize
from nltk.stem.isri import ISRIStemmer
def stemTokenize(text):
 stemmer=ISRIStemmer()
 return[stemmer.stem(w)for w in word_tokenize(text)]
# Created by pyminifier (https://github.com/liftoff/pyminifier)