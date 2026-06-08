For all references to code please refer to https://github.com/wangyixun-frances/qss20_athlete_court_complaints

-----intro/related work-----

Looking at the sport world, China is no doubt a formidable force on the world stage: in the most recent 2024 Paris Olympics, China ??? medals, and have dominated sports like diving and weightlifting, sports that require years of training and expertise. The secret behind this success is China's "Whole-Nation" athlete development system, where athletes are identified as young as five years old, and grow up in specialized sports schools with less academic requirements than normal 义务教育, and train full-time, fully sponsored by the State. This full financial subsidy is a defining characteristic for China's system among the world's. Looking at the other nations ranking Top3 in the Olympics, the US relies on highly commercialized sports leagues such as the NCAA to produce athletes with no governental spending (CITE), and ???? (the other country). For many athletes and their families, having their education and lodging payed for is also one of the largest motivating factors when deciding to trains as an athlete. 

The other side of this coin is that sponsorship ends at the athlete's retirement, and that retirement subsidy is completely dependent on the athlete's performance during their career (CITE LAW). As a result, the majority of ahtletes withouth international-level performance end up in low paying jobs as a result of their lack of education, if not in desolate poverty (CITE MEDIA ). This is an understudied phenonemon, as athletes are often viewed as symbols and tools of achieving national pride, then forgotten without their functionality (Source: Xu, Guoqi. Olympic Dreams: China and Sports, 1895–2008. Harvard University Press, 2008.).  

This project aims to restore importance in the athlete as an individual, and explore the struggles they face post-retirement under the JuGuotixi system. Using China Judgements Online, the largest publicly available databease published by the Supreme People's Court of China,  I explore the main areas of complaint raised by retired athletes. The fingdings provide important data groundwork to analysize the current landscape of athlete welfare in China, and possible causes for its insufficiency.



------data-------
China Judgements Online (CJO, chn name, link) is one of the two officially maintainted databases in China where "legally effective ajudication documents [are made] public according to law" (Donald Clarke. Follow-up on the Fate of China Judgments Online. url: https:// thechinacollection.org/follow-fate-china-judgments-online/.). The Supreme People's Court work report describes the database as an effort to promote judicial through judical openess and transparency. Despite recent taken-down////下架 of ????? cases, CJO still boasts ??? cases and is the largest database for a judicial perspective into Chinese society. The CJO includes cases from all four levels of Chinese court, from the national Supreme People's Court to local High Level People's Courts. All cases studied in this project are pulled from this database, available after a open-to-all user registration using a China mainland phone number.


Methods
Because court cases can be pulled as pure text, topic modeling was determined to be the best method to categorize main areas of complaint raised by retired Chinese athletes.

\\\\ add flow chart: pull - filter - clean - topic modeling - additional analysis.)

1. Pull
Data was first obtained from CJO using the ??? package in Python to perform web scraping for all cases that matched the keyword "退役运动员" using the CJO website's built-in search function.  


2. Filter
After examming sample cases, it was evident there were coincidental matches that needed to be removed, such as cases between two maketing companies that had retired athletes as a potential customer (?). To filter to cases where retired athletes were the litigant, jieba parts of speech labeling (LINK) was used on case titles (Chinese court case case titles clearly contain the names of the litigant and defendant). Titles containing person's names (NR per jieba's dictionary) where kept except in the case if the person name was directly followed by a orginization indicator, a list of keywords that denote institutioanl entities. This accounted for all cases of NR misidentification in the project dataset. Titles that did not contain NR labels were also kept, although none were found in the dataset.

3. Topic Identification

Using the filtered cases, original cases texts were cleaned of stopwords and preprocessed into word tokens. 

STOPWORDS
Stopwords consisted of boiler-plate court jargon and words that did not contain useful infromation (e.g. document formatting languge). The list of stopwords went through many iterations after manually checking top keywords from the Genism visualization for irrelevant words, and with AI sugguestions after having it read the raw CSV of filtered cases. All stopwords were ultimately defined manually. Below is the full table of stopwords used in the analysis
\\\ read 02_topic_modeling.ipynb and insert stopwords formatted as a table

NUMBER OF TOPICS
The most suitable topic was chosen based on lowest topic overlap according to Jaccard index calculation as well as highest semantic coherence using gensim's \(C_{v}\) coherence model. The best number of topics was determined to be eight.
![output/n_topic_comaparison]


Topic mdeling then was performed using the gensim (insert link) library, with the resulting LDA visualziation fed to Claude Code to analyze topic content. (FOOTNOTE: full transcript of the Claude Code session is available in the Appendix: Agentic Workflow Review.) In addition, the top 15 keywords out of all cases were identified to analyse their distrubution across topics 

4. Results 

4.1

Eight pricinpal topics of concern were identified: 
\\\read 03_topic_summary.ipynb and insert summaryTable .


The two main areas of complaint raised by retired Chinese athletes are surrounding roster managemsnt and wage disputes, as well as commercial contract breach and debt recovery.

Main clusters 




4.2 Majority of complaints were related to sports career

\\\\insert  topic_pie_n8.png

despite being retired, 68.8% of cases were related to career-concerns, indicating a governmantal issue.

4.3 Under-studied categories of online infringment

Online rights infringment is often associated with celebreties, yet 9.5% cases revealed that athletes are affected by similar offenses.


5. Supplementary findings

Male judicial visibility is historically high, with more men likely to go to court for the same offenses than women (find academic citation). I was curious if this was also true for Chinese retired athletes. Court cases almost always idinfitied the gender of the litigant, 58 out of the total 79 cases), and results showed that female judicial visibility was 38% less than men. 

///// insert gender_dif.jpeg


6. discussion

Topic identification performed by claude code was able to extract main trends in the court cases, however keywords categorization seems to be unreliable after looking at sample keywords under each topic. For example, "WeChat" was seen as a main contributor to the "Online Rights Infringment" cateogory. However, "WeChat" is a common communication application that can be used in all senarios.

//// insert keyword_distrib.png

Analysis using top 20 keywords revealed disporpotionate distrubution of keywords among categories, warranting further investigation into the accuracy of keyword identificaiton of the AI model.


Gender discrepnacy.
There are more male athletes in china than men (FIND CITATION), so the difference could be due to demographics. However, legal challenges faced by female athletes are very much present.



Note: 
The full code and data of this project can be found at the following GitHub repository: link. Addtionally, a general-audience demo website is available here(link). 


Appendix: agentic review

Used AI to perform analysis on Gensim LDA topics and 
- updated stopwords using selected modifications, updated analysis
    - AI proposed: 民事判决, 民事裁定, 民事, 出生, 汉族, 送达, 公告送达, 案件, 申请, 规定, 京民
    - manually added 出生, 送达, 公告送达, 案件, 申请, 规定, 京民
    - kept: 民事判决, 民事裁定, 民事 -> important legal category
    - Kept: 汉族 -> shows demographic information

As mentioned in the discussion section, certain keywords were understood by the AI as wrongly contributing to topic clusters, and requires further review.