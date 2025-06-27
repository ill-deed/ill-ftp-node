# FTP Anonymous Access Scanner

This Node.js script scans a given subnet for FTP servers that allow anonymous login. It checks for read and write permissions using the basic-ftp library.

## 🔍 Features

Scans all IPs in a given CIDR subnet

Attempts anonymous FTP login (anonymous:anonymous@domain.com)

Checks for:

Read access (LIST)

Write access (uploadFrom)


Automatically cleans up test file if upload is successful

Uses multithreading for faster scans



---

## ⚙️ Requirements

Node.js v14+ recommended

NPM packages:

basic-ftp ip


Install dependencies:


```bash
npm install basic-ftp ip
```

---

## 🚀 Usage

1. Edit the target subnet in the script:

```js
const subnet = "192.168.1.0/24"; // Replace with your subnet
```

2. Run the script:

```bash
node ftp-anon-scan.js
```

---

## 🧪 Output

For each reachable FTP server with anonymous login:
```
[+] 192.168.1.25 - Anonymous Login | Read: true | Write: false
```
If both read and write are available, it indicates a potential security risk.


---

## ⚠️ Legal Disclaimer

This tool is for educational and authorized security testing purposes only.
Scanning networks without permission is illegal and unethical.
The author is not responsible for any misuse of this code.
