# -*- coding: utf-8 -*-
import warnings
from nltk import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import SnowballStemmer
warnings.filterwarnings("ignore")
def stemTokenize_1(text):
 stemmer=SnowballStemmer('dutch')
 return[stemmer.stem(w)for w in word_tokenize(text)]
def stemTokenize_2(text):
 stemmer=PorterStemmer()
 return[stemmer.stem(w)for w in word_tokenize(text)]
# Created by pyminifier (https://github.com/liftoff/pyminifier)
