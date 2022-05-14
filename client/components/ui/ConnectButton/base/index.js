import React from "react";

// CSS
import styles from "./style.module.css";

// Components
import MetamaskSVG from "components/ui/MetamaskSVG";

// react-icons
import { RiErrorWarningLine } from "react-icons/ri";

// Settings Modal
import { SettingsModal } from "components/ui/SettingsModal";

const ConnectButton = ({ account, connect, style, information }) => {
  const [inProgress, setInProgress] = React.useState(false);
  const [show, setShow] = React.useState(false);

  // Handle Click
  const handleClick = () => {
    if (!account?.data) {
      setInProgress(true);
      connect()
        .then(() => handleSignup())
        .catch(() => setInProgress(false))
        .finally(() => setInProgress(false));
    }
  };

  React.useEffect(() => {
    if (information) console.log(information);
  }, [information]);

  return (
    <div className="flex float-left">
      <SettingsModal show={show} onHide={() => setShow(false)} />
      <div style={style}>
        <span
          className={`bg-zinc-800 inline-flex items-center p-3 my-auto montserrat justify-center text-white rounded-md text-sm hover:ring-4 ring-zinc-400 transition duration-700 w-56 ${
            account?.data ? " cursor-default" : "cursor-pointer"
          }`}
          onClick={handleClick}
        >
          {account?.data ? (
            <>
              {String(account.data).slice(0, 10)}...
              {String(account.data).slice(-6)}
            </>
          ) : inProgress ? (
            "In Progress..."
          ) : (
            <>
              <MetamaskSVG />
              Connect with Metamask
            </>
          )}
        </span>
      </div>
      {information &&
        information.email == "" &&
        information.notification == false && (
          <RiErrorWarningLine
            className="my-auto mx-2 cursor-pointer"
            size={25}
            color="red"
            onClick={() => setShow(true)}
          />
        )}
    </div>
  );
};

export default ConnectButton;
