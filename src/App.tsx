import {useState, FC, useCallback} from "react";

import {Fireworks, Hearts} from "./components";
import {PendingPage, InvitationPage, AcceptedPage} from "./pages";
import {Status} from "./types";
import "../src/styles/App.css";


export const App: FC = () => {
  const [status, setStatus] = useState<Status>('pending');

  const renderPage = useCallback(() => {
    switch (status) {
      case 'pending':
        return <PendingPage setStatus={setStatus}/>;
      case 'accepted':
        return <AcceptedPage setStatus={setStatus}/>;
      case 'invitation':
        return <InvitationPage/>;
    }
  }, [status]);


  return (
    <div className="container">
      <Hearts/>
      {status === 'accepted' && <Fireworks/>}

      {renderPage()}
    </div>
  );
};
