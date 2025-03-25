import React, { useCallback, useState, useRef } from "react";
import styles from "./AddKOL.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Icon from "../../Components/Icon";
import { useDropzone } from "react-dropzone";
// import { useNavigate } from "react-router-dom";

const AddKOL = () => {
  // const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [code, setCode] = useState(null);
  const [showAddress, setShowAddress] = useState(true);
  const twitterNameRef = useRef();
  const irlNameRef = useRef();
  const locationRef = useRef();
  const solanaWalletRef = useRef();
  const signatureIdRef = useRef();
  const twitterProfileRef = useRef();
  const discordInviteRef = useRef();
  const telegramInviteRef = useRef();
  const youtubeChannelRef = useRef();
  const streamRef = useRef();
  const copyRef = useRef();
  const hyphen = (text) =>
    text.toString().slice(0, text.toString().length / 2) +
    "-" +
    text.toString().slice(text.toString().length / 2);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    copyRef.current.innerText = "Copied!";
    setTimeout(() => {
      copyRef.current.innerText = hyphen(code);
    }, 2000);
  };

  const copyAddress = (addr) => {
    event.preventDefault();
    navigator.clipboard.writeText(addr);
    document.getElementById("addr4cpy").innerHTML = "Copied!";
    setTimeout(() => {
      document.getElementById("addr4cpy").innerHTML = addr;
    }, 1000);
  };

  const handleSubmit = async () => {
    if (!twitterNameRef.current.value) {
      alert("Twitter Name is required");
      return;
    }
    if (!locationRef.current.value) {
      alert("Current Location Country is required");
      return;
    }
    if (!solanaWalletRef.current.value) {
      alert("Solana Wallet Address is required");
      return;
    }
    if (!signatureIdRef.current.value) {
      alert("Signature ID is required");
      return;
    }
    if (!twitterProfileRef.current.value) {
      alert("Twitter Profile URL is required");
      return;
    }
    const twitterName = twitterNameRef.current.value; //required
    const IRLname = irlNameRef.current.value; //optional
    const country = locationRef.current.value; //required
    const walletAddress = solanaWalletRef.current.value; //required
    const signID = signatureIdRef.current.value; //required
    const twitterLink = twitterProfileRef.current.value; //required
    const discordLink = discordInviteRef.current.value; //optional
    const telegramLink = telegramInviteRef.current.value; //optional
    const youtubeLink = youtubeChannelRef.current.value; //optional
    const streamLink = streamRef.current.value; //optional
    const formData = new FormData();
    formData.append("twitterName", twitterName);
    formData.append("IRLname", IRLname);
    formData.append("country", country);
    formData.append("walletAddress", walletAddress);
    formData.append("showAddress", showAddress);
    formData.append("signID", signID);
    formData.append("twitterLink", twitterLink);
    formData.append("discordLink", discordLink);
    formData.append("telegramLink", telegramLink);
    formData.append("youtubeLink", youtubeLink);
    formData.append("streamLink", streamLink);
    if (file) {
      formData.append("imageFile", file);
    } else {
      alert("Please upload a profile photo");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/KOLregister/submitVerificationRequest`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert("Verification request submitted successfully");
      setCode(data.code);
    } else {
      alert(data.message);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    if (acceptedFiles.length > 1) {
      alert("Only one file is allowed");
      return;
    }
    if (acceptedFiles[0].size > 1000000) {
      alert("File size should be less than 1MB");
      return;
    }
    if (acceptedFiles[0].type.split("/")[0] !== "image") {
      alert("Only image files are allowed");
      return;
    }
    const file = acceptedFiles[0];
    setFile(file);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <Navbar />
      {code !== null && (
        <div className={styles.codeContainer}>
          <p>Below unique 6-digit code has been generated for you.</p>
          <div className={styles.code}>
            <div ref={copyRef}>{hyphen(code)}</div>
            <Icon
              name="Copy"
              color="#111315"
              height="32px"
              className={styles.icon}
              onClick={handleCopy}
            />
          </div>

          <p>
            Please DM this code to our Twitter (X) page to verify your identity.{" "}
            <br />
            <small>*This is a mandatory step.</small>
          </p>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.header}>KOL Application Form</div>
        <div className={styles.header2}>
          <div>Bio</div>
          <br />
          <div className={styles.dividerHorizontal}></div>
        </div>
        <div className={styles.key}>Twitter Name</div>
        <input
          className={styles.input}
          placeholder="Type your answer..."
          ref={twitterNameRef}
        ></input>
        <div className={styles.info}>*Required</div>
        <div className={styles.key1}>IRL name</div>
        <input
          className={styles.input1}
          placeholder="Type your answer..."
          ref={irlNameRef}
        ></input>
        <div className={styles.info1}>*Optional</div>
        <div className={styles.key2}>Current Location Country</div>
        <input
          className={styles.input2}
          placeholder="Type your answer..."
          ref={locationRef}
        ></input>
        <div className={styles.info2}>*Required</div>
        <div className={styles.key3}>
          Upload your Profile Photo. <br />A real life face photo is preferred
        </div>
        <div
          className={`${styles.input3} ${isDragActive && styles.active}`}
          {...getRootProps()}
        >
          <Icon name="FolderUpload" color="#3164f4" height="40px" />
          <input {...getInputProps()} accept="image/*" multiple={false} />
          <div className={styles.dropzoneText}>
            {file
              ? file.name
              : isDragActive
              ? "Drop the files here ..."
              : "Drag and drop or choose a file from your computer"}
          </div>
        </div>
        <button className={styles.btn1} {...getRootProps()}>
          Upload
        </button>
        <div className={styles.info3}>*Optional</div>
        <div className={styles.header3}>
          <div>Wallet</div>
          <br />
          <div className={styles.dividerHorizontal}></div>
        </div>
        <div className={styles.key4}>Your Solana Wallet Address</div>
        <input
          className={styles.input4}
          placeholder="Type your answer..."
          ref={solanaWalletRef}
        />
        <div className={styles.info4}>*Required</div>
        <div className={styles.key5}>
          Do you want to make your wallet public?
        </div>
        <div className={styles.input5}>
          <button onClick={() => setShowAddress(true)} className={showAddress && styles.selected}> Yes</button>
          <button onClick={() => setShowAddress(false)} className={!showAddress && styles.selected}> No</button>
        </div>
        <div className={styles.info5}>*Required</div>
        <div className={styles.key6}>
          Send $1 of SOL and submit signature ID or URL here to verify ownership.
        </div>
        <div className={styles.input6}>
          <div
            className={styles.recipientAddress}
            onClick={() =>
              copyAddress("7FD1SXXe8YaD1VxyCLmb41tzkUSfwNP4mFN9NUxPbZt3")
            }
          >
            <span id="addr4cpy">
              7FD1SXXe8YaD1VxyCLmb41tzkUSfwNP4mFN9NUxPbZt3
            </span>
            <img src="content_copy.svg" alt="copy" />
          </div>
          <input
            className={styles.inputSign}
            placeholder="Type your answer..."
            ref={signatureIdRef}
          />
        </div>
        <div className={styles.info6}>*Required</div>
        <br />
        <div className={styles.header4}>
          <div>Socials</div>
          <br />
          <div className={styles.dividerHorizontal}></div>
        </div>
        <div className={styles.key7}>Your Twitter Profile URL</div>
        <input
          className={styles.input7}
          placeholder="Type your answer..."
          ref={twitterProfileRef}
        />
        <div className={styles.info7}>*Required</div>
        <div className={styles.key8}>Your Discord Server Invite URL</div>
        <input
          className={styles.input8}
          placeholder="Type your answer..."
          ref={discordInviteRef}
        />
        <div className={styles.info8}>*Optional</div>
        <div className={styles.key9}>Your Telegram invite URL</div>
        <input
          className={styles.input9}
          placeholder="Type your answer..."
          ref={telegramInviteRef}
        />
        <div className={styles.info9}>*Optional</div>
        <div className={styles.key10}>Your YouTube Channel URL</div>
        <input
          className={styles.input10}
          placeholder="Type your answer..."
          ref={youtubeChannelRef}
        />
        <div className={styles.info10}>*Optional</div>
        <div className={styles.key11}>Stream (Twitch, Kick etc.)</div>
        <input
          className={styles.input11}
          placeholder="Type your answer..."
          ref={streamRef}
        />
        <div className={styles.info11}>*Optional</div>
        <div className={styles.msg}>
          By submitting this form, you agree to our Terms of Use and Privacy
          Policy.
        </div>
        <div className={styles.btn2_container}>
          <button className={styles.btn2} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className={styles.msg2}>
          *Once you click 'Submit', a 6-digit code will be generated. Please DM
          it to our Twitter (X) page to verify your identity.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddKOL;
