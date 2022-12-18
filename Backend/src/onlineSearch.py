'''
OnlineSearch module to search question 
from google to find links and topic
'''
from nltk import word_tokenize
import nltk
import threading
import time
from operator import itemgetter
from ecommercetools import seo
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

def process(content):
    #------- NORMALIZATION ----------------#
    normalize = []
    for line in content:
        normalize.append(' '.join([''.join([ch.lower() for ch in word if ch.isalpha()]) for word in line.split()]))
    #------- TOKENIZATION ----------------#
    tokenize = []
    for line in normalize:
        tokenize.append(nltk.word_tokenize(line))
    #------- STOPWORD REMOVAL ----------------#
    stopword_lst = nltk.corpus.stopwords.words(fileids='english')
    nostop = []
    for line in tokenize:
        nostop.append([lemmatizer.lemmatize(word) for word in line if word not in stopword_lst])
    #------- Bi-Gram------------------------#
    newData = []
    for i in range(len(nostop)):
        data = []
        for bi in list(nltk.bigrams(nostop[i])):
            ls = list(bi)
            ls.sort()
            data.append(' '.join(ls))
        newData.append(data)
        
    #------- Word Frequency ----------------#
    wordFreq = {}
    for line in newData:
        for word in line:
            if(word not in wordFreq.keys()):
                wordFreq[word] = 0
            wordFreq[word] += 1
    return wordFreq


def findTopic(question, k = 1):
    try:
        results = seo.get_serps(question)
    except:
        return ("",[])
    wordDict = process(results.title)
    res = dict(sorted(wordDict.items(), key = itemgetter(1), reverse = True)[:k])
    res = list(res.keys())
    res.sort()
    res = ' '.join(res)
    return (res,list(results.link)[:3])


def preProcessPaper(paper):
    paper_dict = {}
    keys = list(paper.keys())
    idx=0
    for k in paper:
        v = paper[k]
        if len(v.split())>3:
            paper_dict[keys[idx]] = v
            idx += 1
    return paper_dict

def fetchOnlineAns(paper_dict):
    paper = preProcessPaper(paper_dict)
    paper_topics = {}
    topic_qnNo = {}
    def searchTopic(key):
        paper_topics[key] = findTopic(paper[key])
        if len(paper_topics[key][1])==0:
            return
        if paper_topics[key][0] not in topic_qnNo.keys():
            topic_qnNo[paper_topics[key][0]] = []
        topic_qnNo[paper_topics[key][0]].append(key)

    threads=[]
    for key in list(paper.keys()):
        t = threading.Thread(target=searchTopic, args=[key])
        t.start()
        threads.append(t)
    for t in threads:
        t.join()
        time.sleep(0.1)
    marklist = sorted(topic_qnNo.items(), key=lambda x:len(x[1]), reverse=True)
    topicData = [[tup[0],', '.join(tup[1])] for tup in marklist]
    qNumbers=list(paper.keys())
    qNumbers.sort()
    time.sleep(2)
    key_list = list(paper_topics.keys())
    linkData = []
    for qn in qNumbers:
        if qn in key_list:
            data = [qn,paper[qn]]+paper_topics[qn][1]
            linkData.append(data)
    return {'links':linkData,'topics':topicData}






