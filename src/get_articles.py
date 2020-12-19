from newspaper import Article
import re
import pandas as pd

import argparse
import io
import json
import os
import requests

from google.cloud import language_v1
import numpy
import six



columns = ['title','publish_date', 'authors', 'url', 'keywords', 'summary', 'word_count', 'category', 'category_confidence', 'category_alt', 'category_alt_confidence']
data_df = pd.DataFrame(columns=columns)
# best regex finder https://www.regextester.com/96504

article_list = []
for line  in open("src/articles.md", 'r'):
    url = re.findall(r'(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))?', line)
    try:
        article_list.append(url[0])
    except:
        next

for article_num, article_url in enumerate(article_list):
    print(article_num, article_url)
    data_df.loc[article_num, 'url'] = article_url
    try:
        article = Article(article_url)
        article.download()
        article.parse()
        data_df.loc[article_num, 'publish_date'] = article.publish_date
        data_df.loc[article_num, 'authors'] = article.authors
        data_df.loc[article_num, 'title'] = article.title
        print(article.title)
        article.nlp()
        data_df.loc[article_num, 'keywords'] = article.keywords
        data_df.loc[article_num, 'summary'] = article.summary
        data_df.loc[article_num, 'word_count'] = len(re.findall(r'\w+', article.text))
    except:
        print("unable to process")


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join('.', "GoogleLocalCreds.json")
language_client = language_v1.LanguageServiceClient()

def classify(text, verbose=True):
        """Classify the input text into categories. """
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.HTML)
    response = language_client.classify_text(request={'document': document})
    categories = response.categories
    result = {}
    for category in categories:
        result[category.name] = category.confidence
    return result


for rownum, row in data_df.iterrows():
    """Loop through articles and get categories"""
    print(row['url'])
    try:
        r = requests.get(row['url'])
        category = classify(r.text)
        print(category)
        if len(category) == 1:
            data_df.loc[rownum, 'category'] = list(category.keys())[0]
            data_df.loc[rownum, 'category_confidence'] = list(category.values())[0]
        else:
            data_df.loc[rownum, 'category'] = list(category.keys())[0]
            data_df.loc[rownum, 'category_confidence'] = list(category.values())[0]
            data_df.loc[rownum, 'category_alt'] = list(category.keys())[1]
            data_df.loc[rownum, 'category_alt_confidence'] = list(category.values())[1]
    except:
        next

data_df.to_csv('data_df.csv', index=False)
