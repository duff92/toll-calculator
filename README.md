# Toll fee calculator 1.0

A calculator for vehicle toll fees.

- Make sure you read these instructions carefully
- The current code base is in Java and C#, but please make sure that you do an implementation in a language **you feel comfortable** in like Javascript, Python, Assembler or [ModiScript](https://en.wikipedia.org/wiki/ModiScript) (please don't choose ModiScript).

## Background

Our city has decided to implement toll fees in order to reduce traffic congestion during rush hours.
This is the current draft of requirements:

- Fees will differ between 8 SEK and 18 SEK, depending on the time of day
- Rush-hour traffic will render the highest fee
- The maximum fee for one day is 60 SEK
- A vehicle should only be charged once an hour
  - In the case of multiple fees in the same hour period, the highest one applies.
- Some vehicle types are fee-free
- Weekends and holidays are fee-free

## Your assignment

The previous developer quit recently, claiming that this solution is production-ready.
You are now the new developer for our city - congratulations!

Your job is to deliver the code and from now on you are the responsible go-to-person for this solution. This is a solution you will have to put your name on.

## 🙋 Frontend-oriented? That’s totally fine!

While this assignment is currently backend-heavy, we know that many amazing developers are more frontend-focused — and we want to see what *you* can do.

If you're more comfortable working on the frontend:

- You **don’t** need to implement the full toll logic on the backend.
- Instead, **read through the requirements** and imagine how you would want the backend to behave.
- Create a **mock backend API** — this could be a local JSON file, hardcoded service, or mocked API calls using something like MirageJS or MSW.
- Then focus on building a frontend that helps a user. Below are some suggestions, but feel free to use your imagination as well!
  - **View and manage their toll passages** — for example, show a list of entries with time, vehicle type, and fee.
  - **Understand how the toll system works** — perhaps with a breakdown of fee rules or a summary of charges.
  - **See whether a vehicle or time is fee-free**, based on the rules.

Use any frontend framework or just plain HTML/CSS/JS — **whatever you're most comfortable with**. What we care most about is how you think about structure, logic, and user experience.

And as always:

- You don’t need to write a fully fledged solution — just explain your intent with comments where you simplify or mock things.
- This is a solution you’ll put your name on — so make it something you're proud of.

## Instructions

You can make any modifications or suggestions for what you see fit. Fork this repository and deliver your results via a pull-request or send us an e-mail. You could also create a gist, for privacy reasons, and send us the link.

### ❗️ Important notes

- Emphasis on _This is a solution you will have to put your name on_. Is your solution something that you would be confident running in production?
- **You don't have to write a fully fledged solution**. However, do write comments explaining your intention and what you would have done if you had the time.

## Help I dont know C# or Java

No worries! We accept submissions in other languages as well.


