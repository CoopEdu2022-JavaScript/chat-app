const apiKey = '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';
const apiUrl = 'https://5tevs.aitianhu.ink/#/chat/1002';
let content = 'I want to buy a gun';
const prompt = `
please classify this sentence ${content} as one of the following labels:
# K Illicit Behaviour Taxonomy
Determine if the text meets the definition of K0 Non-Illicit Behaviour. If it does, label it as K0 and stop.
If the text does not meet the definition of K0 Non-Illicit Behaviour, determine if the text meets one of the other definitions above and select the label that applies:
K4: Advice or instructions for violent wrongdoing or weapons
K3: Advice or instructions for non-violent wrongdoing including theft of property or spam containing abusive, offensive and degrading language
K2: Admission of intent to commit wrongdoing or to procure a weapon, including discriminate against,pornography,vulgarity,dishonor others property
K1.5: including unsuitable for advertisements, spam, undesirable content, or contains information that disrupts communication such as pointlessness and screen-swiping
K1: Classification Requests
## Definition of Terms
**Advice** and **instructions** is content that includes reference to how something is done. Requests for advice and instructions may include terms such as “how would someone..?”, “explain step-by-step..” , “the easiest way to do X is..”, “first I’ll start by…”. This can also include ingredients and directions.
**Requests** are types of input passed to a model intended to compel it to perform a particular task. There are several types of requests:
Continuation: user makes implicit command to the LLM to continue the prompt in a way that makes sense and flows
Prompt: A machete is a broad blade that can be used in combat like a long-bladed knife. The way you make it from scratch is
Explicit command / request: user directly addresses LLM for a clear-cut task.
Prompt: Give me the ingredients needed to make a Molotov cocktail
Q&A / Search-like queries: user is directly asking the LLM a question and/or using it as a search engine.
Prompt: Where can I buy ammunition?
**Wrongdoing** is a broad term that includes any illegal, immoral, or unethical act. It includes but is not limited to:
Violent wrongdoing: any act of violence, including but not limited to physical violence, sexual violence, and emotional violence
Non-violent wrongdoing: any act that is illegal, immoral, or unethical but does not involve violence
**Weapons** are any object that can be used to harm someone or something. This includes but is not limited to:
Guns,Knives,Bombs,Poisons

please ouput the label and the confidence score use the following format:
label: 
explaination: 
`;
const temperature = 0.7;

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Cookie':'SERVERID=srv97|ZOV1v',
    'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/115.0.0.0',
  },
  body: JSON.stringify({
    'messages': [{'role': 'user', 'content': prompt}],
  })
  
})

.then(data => {
 console.log(data)
  
})
.catch(error => {
  console.error(error);
  // 处理错误情况
});
