import React, { useCallback, useState, useRef } from "react";
import styles from "./AddKOL.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Icon from "../../Components/Icon";
import { useDropzone } from "react-dropzone";

const AddKOL = () => {
  const [file, setFile] = useState(null);
  const twitterNameRef = useRef();
  const irlNameRef = useRef();
  const locationRef = useRef();
  const solanaWalletRef = useRef();
  const walletPublicRef = useRef();
  const signatureIdRef = useRef();
  const twitterProfileRef = useRef();
  const discordInviteRef = useRef();
  const telegramInviteRef = useRef();
  const youtubeChannelRef = useRef();
  const streamRef = useRef();
  const handleSubmit = () => {
    const twitterName = twitterNameRef.current.value;
    const IRLname = irlNameRef.current.value;
    const country = locationRef.current.value;
    const walletAddress = solanaWalletRef.current.value;
    const showAddress = walletPublicRef.current.value;
    const signID = signatureIdRef.current.value;
    const twitterLink = twitterProfileRef.current.value;
    const discordLink = discordInviteRef.current.value;
    const telegramLink = telegramInviteRef.current.value;
    const youtubeLink = youtubeChannelRef.current.value;
    const streamLink = streamRef.current.value;
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
          <input
            {...getInputProps()}
            accept="image/*"
            multiple={false}
          />
          <div className={styles.dropzoneText}>
            {file
              ? file.name
              : isDragActive
              ? "Drop the files here ..."
              : "Drag and drop or choose a file from your computer"}
          </div>
        </div>
        <button className={styles.btn1}>Upload</button>
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
          Do you want to make your wallet address public? If you choose "No," we
          will hide your wallet address but still include you on the
          leaderboard.
        </div>
        <div className={styles.input5}>
            <label>
              <input 
                type="checkbox"
                ref={walletPublicRef}
              />
              Show my wallet address?
            </label>
        </div>
        <div className={styles.info5}>*Required</div>
        <div className={styles.key6}>
          Please send 1 dollar or any amount worth of Solana to our donation
          wallet and submit the signature ID or URL for us to confirm wallet
          ownership.
        </div>
        <input
          className={styles.input6}
          placeholder="Type your answer..."
          ref={signatureIdRef}
        />
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
          <button className={styles.btn2} onClick={handleSubmit}>Submit</button>
        </div>
        <div className={styles.msg2}>
          *Once you click 'Submit,' a 6-digit code will be generated. Please DM
          it to our Twitter (X) page to verify your identity.
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddKOL;
