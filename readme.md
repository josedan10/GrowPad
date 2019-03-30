# Models

## Clients
- _id
- companyName (**String**)
- clientName (**String**)
- location (**String**)
- email (**String**)
- website (**String**)
- facebook (**String**)
- instagram (**Instagram**)
- briefing (**JSON**)
- status (**reviewed | client | contacted | mail sent**)
- weakness (**SEO | brand | optimization**)
- description (**String**)
- observations (**String**)
- reviewerId (**ID**)
- emailMarketingID (**ID**)
- pageWereWasFound (**ID**)

## Pages
- _id
- name (**String**)
- URL (**String**)
- clientsCaptureds (**Int**)
- weakInSEO (**Int**)
- weakInWebsite (**Int**)
- weakInMarketing (**Int**)
- weakInBranding (**Int**)