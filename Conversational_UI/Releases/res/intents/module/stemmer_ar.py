# -*- coding: utf-8 -*-
import warnings
from nltk import word_tokenize
from nltk.stem.isri import ISRIStemmer
warnings.filterwarnings("ignore")
def stemTokenize(text):
 stemmer=ISRIStemmer()
 return[stemmer.stem(w)for w in word_tokenize(text)]
# Created by pyminifier (https://github.com/liftoff/pyminifier)