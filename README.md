# Project Overview

This project is a component of my 26X leave-term research on failed welfare for retired Chinese athletes. I want to look at what court documents reveal about diﬀiculties faced by retired athletes, and summarize their areas of complaint. The result of this project will provide important data groundwork that will help me develop my thesis on the landscape of Chinese retired athlete welfare and possible reasons for its failure.

# Research Question

What are the main areas of complaints being raised by retired Chinese athletes against China’s 举国体制 “Whole-Nation” athlete development system?

# Data Source

I look at the two oﬀicial court case databases operated by the Supreme People’s Court of China: China Judgements Online (wenshu.court.gov.cn) and Renminfayuananliku (rmfyalk.court.gov.cn).

Dataset Volume:

-   China Judgements Online：164,680,709 cases

-   rmfyalk.court.gov.cn: 5,393 cases

Overview of the two databases’ function, according to the Supreme People’s Court work report[^1]:

[^1]: Donald Clarke. Follow-up on the Fate of China Judgments Online. url: https:// thechinacollection.org/follow-fate-china-judgments-online/.

-   China Judgments Online is a platform on which courts at four levels make legally effective adjudication documents public according to law. The purpose is, via judicial openness, to promote judicial fairness and provide a guide for the functioning of society. In the next stage, the people’s courts will continue to deepen judicial transparency, and—on the basis of increasing the number of uploaded documents, realizing full coverage of the adjudication field, and enriching the types of cases—promote the uploading of more documents from the Supreme People’s Court and the High Level People’s Courts. At the same time, we will strengthen the protection of the privacy of parties connected with litigation, hide relevant identifying information, and ensure that the life and work of parties and their families, and the development of business of enterprises and units, is not negatively influenced by the uploading of cases.

-   The People’s Court Case Database（人民法院案例库）collects all the Guiding Cases issued by the Supreme People’s Court; judges in handling cases must refer (canzhao 参照) to them according to law. At the same time, it collects authoritative cases with referential (cankao 参考) and model value on the recommendation of courts at every level and relevant units upon review and approval by the Supreme People’s Court, for the purpose of supplying references for judges in handling cases. When judges adjudicate cases, they must first check the case database, and make their judgments with reference to (cankao) or applying by reference (canzhao) cases of the same type that are in the database or else explain why they are not doing so. If the reason \[for not doing so\] is valid, then the case can become a new case for collection in the database or replace an existing case, and thus establish a new judgment for reference (cankao). The case database is open to the public for use by parties in litigation, lawyers handling cases, scholars doing research, and the public studying law. Through looking up cases in the database, parties and lawyers can clarify their expectations in litigation and reduce pointless lawsuit filings, appeals, shensu appeals, petitions, etc.

# Repo Guide

## code

`00_pull.ipynb`
- Pulls all court cases containing keyword 退役运动员 ("retired athletes") from China Judgements Online https://wenshu.court.gov.cn to a DataFrame. Then exports DataFrame as CSV file "00_raw_cases.csv" to user's working directory (file already available under the "date" directory in repo).
- INPUT: None.
- OUTPUT: `data/00_raw_cases.csv`

`01_filter_litigants.ipynb`
- Filter to cases where retired athletes are the litigant, i.e., at least one litigant is an individual person (not an organization) using parts of speech tagging from the `jieba` library on case names.
- INPUT: `data/00_raw_cases.csv`
- OUTPUT: `data/01_filtered_cases.csv`
- SUPPL: `01_additional_cases.txt` expands the `jieba` person name dictionary to improve tagging accuracy

`02_topic_modeling.ipynb`
- Cleans and tokenizes full text from filtered ligitant cases. Determines the optimal topic number (n = 8) for topic modeling using $C_v$ cohenrence and Jaccard similarity metrics before using the `gensim` library to employ Latent Dirichlet Allocation (LDA) visualization using pyLDAvis display ordering with loglift-ranked terms.
- INPUT: `data/01_filtered_cases.csv`
- OUTPUT: `data/02_tokenized.csv`, `output/n_topic_comparison.jpeg`, `output/lda_vis_chn_8.html`
- SUPPL: `02_topic_modeling_claude.ipynb` preserves Claude Code's analysis script which served as reference


`03_topic_summary.ipynb`
- Records main topics and categories Claude Code identified in the LDA topic modeling result. Creates intiutive pie chart of topics and their (sub)categories.
- INPUT: `output/lda_vis_chn_8.html`
- OUTPUT: `output/topic_pie_n8.png`

`04_keyword_distrib.ipynb`
- Builds a document-text-matrix (DTM) to find the top 15 high-frequency keywords across all cases, then creates a stacked bar plot showing their distrubution across topics.
- INPUT: `data/02_tokenized.csv`
- OUTPUT: `output/keyword_distrib.png`

`05_gender_dif.ipynb`
- Records gender of retired athlete litigants. Creates pie chart of male/female litigant porportions.
- INPUT: `data/01_filtered_cases.csv`
- OUTPUT: `output/gender_dif.jpeg`

`05_lawsuit_categ.ipynb`
- Summaries judicial category of cases raised by retired athletes and creates a pie chart to show distribution.
- INPUT: `data/01_filtered_cases.csv`
- OUTPUT: `output/lawsuit_types.jpeg`

## data 

`00_raw_cases.csv`
- All matches of the 退役运动员 keywords from https://wenshu.court.gov.cn.

`01_filtered_cases.csv`
- Filtered to cases where only retired athletes are the ligitant(s).

`02_tokenized.csv`
- Added new columns of cleaned and tokenized keywords using the full text of court cases.

## output

Files explained in code section above.

### `testing` folders

miscellaneous documents produced during the research process. Unrelated to final project files.

## website

React + Vercel stack. Vibe coded by Claude Code.

Visit the site here: https://qss20-athlete-court-compl-git-457cd4-wangyixun-frances-projects.vercel.app/

