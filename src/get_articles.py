from newspaper import Article
import re
import pandas as pd



columns = ['title','publish_date', 'authors', 'url', 'keywords', 'summary', 'word_count', 'category']
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


# get categories from google API
import argparse
import io
import json
import os
import requests

from google.cloud import language_v2
import numpy
import six


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.join('.', "GoogleLocalCreds.json")
language_client = language_v1.LanguageServiceClient()

def classify(text, verbose=True):
    """Classify the input text into categories. """
    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.HTML
    )
    response = language_client.classify_text(request={'document': document})
    categories = response.categories
    result = {}
    for category in categories:
        # Turn the categories into a dictionary of the form:
        # {category.name: category.confidence}, so that they can
        # be treated as a sparse vector.
        result[category.name] = category.confidence
    if verbose:
        print(text)
        for category in categories:
            print(u"=" * 20)
            print(u"{:<16}: {}".format("category", category.name))
            print(u"{:<16}: {}".format("confidence", category.confidence))
    return result

article_url = 'https://www.oedigital.com/news/483611-ifrog-robot-for-cleaning-and-inspection-of-offshore-wind-monopiles-completes-trials'
r = requests.get(article_url)
# r.text
cat_response = classify(r.text)

data_df.to_csv('data_df.csv', index=False)
