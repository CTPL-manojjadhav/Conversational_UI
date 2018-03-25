# -*- coding: utf-8 -*-
import os
import sys
import json
import re
import codecs
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from module import Stemmer_hi

vectorDimension = 200
domain=sys.argv[1]
scriptDir=os.path.dirname(__file__)
fileData=os.path.join(scriptDir,'data',domain+'_hi.json')
utterance=[]
intent=[]
with codecs.open(fileData,'r','utf-8')as dataFile: 
 data=json.load(dataFile)
for nameUtterances in data['tasks']:
 for utt in nameUtterances['utterances']:
  utterance.append(utt)
  intent.append(nameUtterances['name'])
myIntent=set(intent)
print('Identified domain:',domain)
print('Number of utterances for training:',len(intent))
print('Number of intents for training:',len(myIntent))

stopListFile=os.path.join(scriptDir,'..','dictionary','stopwords_hi.txt')
arrayWords=[]
stopWords=[]
f=codecs.open(stopListFile,'r','utf-8')
lines=f.read().split("\n")
for line in lines:
 if line!="":
  words=line.split("=")[1]
  arrayWords.append(words.split(','))
for a_word in arrayWords:
 for s_word in a_word:
  if(re.sub(' ','',s_word))!="":
   stopWords.append(s_word)
extraStopWords=set(stopWords)
stops=extraStopWords
tfidfVec=TfidfVectorizer(utterance,decode_error='ignore',stop_words=stops,ngram_range=(1,5),tokenizer=Stemmer_hi.stemTokenize)
trainsetIdfVectorizer=tfidfVec.fit_transform(utterance).toarray()
vLength=len(trainsetIdfVectorizer[1])
nDimension=vectorDimension 
if vLength<=vectorDimension:
 nDimension=vLength-1
svd=TruncatedSVD(n_components=nDimension,algorithm='randomized',n_iter=15,random_state=42)
trainLSA=svd.fit_transform(trainsetIdfVectorizer)
pickle_path=os.path.join(scriptDir,'model',domain+'_hi_')
fileName=pickle_path+'utterance.m'
fileObject=open(fileName,'wb')
pickle.dump(utterance,fileObject) 
fileObject.close()
fileName=pickle_path+'intent.m'
fileObject=open(fileName,'wb')
pickle.dump(intent,fileObject) 
fileObject.close()
fileName=pickle_path+'tfidfVec.m'
fileObject=open(fileName,'wb')
pickle.dump(tfidfVec,fileObject) 
fileObject.close()
fileName=pickle_path+'svd.m'
fileObject=open(fileName,'wb')
pickle.dump(svd,fileObject) 
fileObject.close()
fileName=pickle_path+'trainLSA.m'
fileObject=open(fileName,'wb')
pickle.dump(trainLSA,fileObject) 
fileObject.close()