# -*- coding: utf-8 -*-
import os
import re
import sys
import codecs
import _pickle as cPickle 
from sklearn.metrics.pairwise import linear_kernel
from collections import OrderedDict
from module import ProcessQuery_hi as pq

domain=sys.argv[1]
userUtterance=sys.argv[2]
scriptDir=os.path.dirname(__file__)
combinations=pq.genUtterances(userUtterance)
jResult=pq.processUtterance(combinations)
newjResult = str(jResult).replace("'",'"').strip()
sys.stdout.buffer.write(newjResult.encode('utf8'))