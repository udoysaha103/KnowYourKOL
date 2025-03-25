export const copyAddress = (copyRef, text) => {
    const copyToClipboard = async (text) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
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
          return successful;
        } catch (err) {
          document.body.removeChild(textArea);
          return false;
        }
      } catch (err) {
        console.error("Failed to copy:", err);
        return false;
      }
    };

    copyToClipboard(text);
    copyRef.current.children[0].innerText = "Copied!";
    setTimeout(() => {
      copyRef.current.children[0].innerText = truncateText(kol.walletAddress);
    }, 1000);
  };