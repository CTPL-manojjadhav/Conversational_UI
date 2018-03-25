# -*- coding: utf-8 -*-
import os
import re
import sys
import pickle 
from sklearn.metrics.pairwise import linear_kernel
from collections import OrderedDict
from module import ProcessQuery_nl as pq

domain=sys.argv[1]
userUtterance=sys.argv[2]
scriptDir=os.path.dirname(__file__)

utter=re.sub(r'[^a-zA-Z ]','',userUtterance)
combinations=pq.genUtterances(utter)
jResult=pq.processUtterance(combinations)
newjResult = str(jResult).replace("'",'"').strip()
sys.stdout.buffer.write(newjResult.encode('utf8'))