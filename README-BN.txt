ARANASHIFTER PORTFOLIO — START HERE
===================================

এই ZIP-এর ভেতরে website-এর সব ফাইল আছে:
- index.html  (মূল webpage)
- style.css   (design / layout)
- script.js   (mobile menu ও ছোট interaction)

প্রথমে যা বদলাবে:
1. index.html খুলে YOUR_EMAIL@example.com খুঁজে নিজের email বসাও।
2. Instagram / YouTube link নিজের সঠিক profile link দিয়ে যাচাই করো।
3. "PROJECT 01 / SHOWREEL" ইত্যাদি placeholder-এ নিজের কাজের link ও thumbnail বসাও।
   এখনকার project visuals কেবল design placeholder; এগুলো তোমার real work নয়।
4. About অংশের লেখা নিজের পরিচয় অনুযায়ী edit করো।

GITHUB-এ PUBLISH:
1. github.com-এ login করো।
2. উপরে ডানদিকে + > New repository।
3. Repository name: aranashifter-portfolio
4. Public নির্বাচন করে Create repository।
5. Add file > Upload files।
6. ZIP extract করে ভেতরের index.html, style.css, script.js এবং README.md upload করো।
   ZIP ফাইল নিজে upload কোরো না। ফাইলগুলো repository root-এ থাকতে হবে।
7. Commit changes।
8. Repository Settings > Pages।
9. Build and deployment > Deploy from a branch।
10. Branch: main; Folder: /(root); Save।
11. কয়েক মিনিট পরে Pages-এ দেওয়া github.io link খুলে দেখো।

CUSTOM DOMAIN:
1. আগে GitHub repository Settings > Pages > Custom domain-এ aranashifter.online লিখে Save করো।
2. Hostinger hPanel > Domains > Domain portfolio > aranashifter.online > DNS / Nameservers > DNS records।
3. বর্তমান DNS records-এর screenshot/backup রাখো। MX/TXT records অকারণে delete কোরো না।
4. Root domain-এর conflicting পুরনো A/AAAA record থাকলে বুঝে তারপর সরাও।
5. নিচের চারটি A record যোগ করো:
   Type A | Name @ | Points to 185.199.108.153
   Type A | Name @ | Points to 185.199.109.153
   Type A | Name @ | Points to 185.199.110.153
   Type A | Name @ | Points to 185.199.111.153
6. www-এর জন্য CNAME:
   Type CNAME | Name www | Points to aranashifter.github.io
7. DNS propagation-এর জন্য অপেক্ষা করো (কখনও 24 ঘণ্টা পর্যন্ত)।
8. GitHub Settings > Pages-এ ফিরে Enforce HTTPS enable করো।

সতর্কতা:
- Domain-এ আগে email ব্যবহার করলে MX/TXT records delete কোরো না।
- Hostinger nameservers active না থাকলে Hostinger-এর DNS edits কার্যকর হবে না।
- A/AAAA records নিয়ে নিশ্চিত না হলে delete না করে screenshot পাঠাও।
- GitHub Pages static HTML/CSS/JS host করে; database বা server-side PHP নয়।
