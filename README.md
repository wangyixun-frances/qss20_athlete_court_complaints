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

# Methodology

- filter raw_cases.csv to complaints RAISED by athletes AGAINST entity

-  download full text of complaints

- filter to keep cases where athletes are litigants

- clean full case text and tokenize

-  topic analysis using tokens.

------------------------------------------------------------------------


- 如果是针对体校、劳动（整个体系的），驳回上诉的比例？
- 网站：finding2改成可以选中文还是英文


type of complaint. 


SIDEQUEST> discrepancy - gender agency
- 起诉人。



todo:
Paper + repo + website due: Sunday 06-07, 11:59 PM EST.

Final deliverables are worth 45% of your grade and consist of four pieces:

1. Paper (6 pages)

Graded with the project rubric — same elements as before (intro/related work, data, methods, results writing, results figures/tables, discussion, code/repo), plus a new element:

Agentic Analysis — A short section (or appendix) that includes your AI transcripts and a critical reflection on your coding session: what you asked the assistant, what you accepted, what you rejected, and where the assistant went wrong.

KEY: USAGE FOR  analysis and for website generation

Format. Write the paper in LaTeX using a PNAS-style single-column template:
For reference, see the PNAS author guidelines.

The page limit is 6 pages (excluding references and the Agentic Analysis section).

2. GitHub repo (public)
Numbered notebooks that run in order (00_pull.ipynb, 01_merge.ipynb, 02_analyze.ipynb, …).

README links each notebook with its inputs, what it does, and its outputs.

Directories: code/, data/ (or a cloud-storage link), output/.

No spaces in filenames; no hardcoded paths.

Define functions at the top of each notebook.

Print diagnostics before/after merges.

3. Website (public demo)
A public-facing site that demos the entire project. It should tell the story end-to-end: question → data → method → result → takeaway. Embed your key figures so a visitor can grasp the project in 2–3 minutes.

Must be live and linkable by the Sunday 06-07 deadline.

Pushes after the deadline receive a 0 for the website component.

Suggested stack: React + Vercel — a tutorial walking through this setup will be released; you are free to use a different stack if you prefer (e.g., GitHub Pages with Jupyter Book or Quarto, Streamlit, static HTML).

intro/related work

data


methods

results writing


results figures/tables 

discussion


code/repo