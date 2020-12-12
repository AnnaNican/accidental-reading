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

data_df.to_csv('data_df.csv', index=False)
