export const truncateText = (text, type = "1", maxLength = 10) => {
    // @param text: string to truncate
    //   @param type: "1" for wallet address, "2" for name
    // @param maxLength: maximum length of the truncated text
    if (text.length <= maxLength) {
        return text;
    }

    if (type === "1") {
        return `${text.slice(0, 3)}...${text.slice(-3)}`;
    } else if (type === "2") {
        return `${text.slice(0, maxLength)}..`;
    } else {
        return text;
    }
};

export const copyText = async (element, text) => {
    //@param element: the element to copy text from
    //@param text: text to copy to clipboard
    let msg = "";
    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                msg = "Copied!";
                return true;
            }

            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand("copy");
                document.body.removeChild(textArea);
                msg = "Copied!";
                return successful;
            } catch (err) {
                document.body.removeChild(textArea);
                msg = "Failed to copy!";
                return false;
            }
        } catch (err) {
            console.error("Failed to copy:", err);
            msg = "Failed to copy!";
            return false;
        }
    };
    await copyToClipboard(text);
    const originalText = element.innerText;
    element.innerText = msg;
    const wait = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
    await wait;
    element.innerText = originalText;
}