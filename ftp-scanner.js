const ftp = require("basic-ftp");
const ip = require("ip");

const subnet = "192.168.1.0/24"; // Replace with your target subnet
const testFileName = "ftp_test.txt";
const testFileContent = "This is a test file for write check.\n";

function* generateIPs(cidr) {
    const start = ip.toLong(ip.cidrSubnet(cidr).networkAddress);
    const end = ip.toLong(ip.cidrSubnet(cidr).broadcastAddress);
    for (let i = start + 1; i < end; i++) {
        yield ip.fromLong(i);
    }
}

async function checkFTP(host) {
    const client = new ftp.Client(5000); // 5 sec timeout
    client.ftp.verbose = false;

    try {
        await client.access({
            host,
            user: "anonymous",
            password: "anonymous@domain.com",
            secure: false
        });

        let readable = false;
        let writable = false;

        // Check read access
        try {
            await client.list();
            readable = true;
        } catch {}

        // Check write access
        try {
            await client.uploadFrom(Buffer.from(testFileContent), testFileName);
            writable = true;
            await client.remove(testFileName); // cleanup
        } catch {}

        console.log(`[+] ${host} - Anonymous Login | Read: ${readable} | Write: ${writable}`);
        return { host, readable, writable };
    } catch (err) {
        // Could not connect/login
    } finally {
        client.close();
    }

    return null;
}

async function main() {
    const ipList = Array.from(generateIPs(subnet));
    const maxConcurrent = 20;
    let index = 0;

    async function worker() {
        while (index < ipList.length) {
            const ipToCheck = ipList[index++];
            await checkFTP(ipToCheck);
        }
    }

    const workers = Array.from({ length: maxConcurrent }, worker);
    await Promise.all(workers);

    console.log("Scan complete.");
}

main();
