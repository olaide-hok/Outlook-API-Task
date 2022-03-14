import React, { useState } from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph , callMsGraphMail} from "./graph";
import MailData from "./components/MailData";


function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [graphMailData, setGraphMailData] = useState(null)

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              callMsGraph(response.accessToken).then(response => setGraphData(response));
          });
      });
  }

  function RequestMailData() {
    const request = {
        ...loginRequest,
        account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Mail data
    instance.acquireTokenSilent(request).then((response) => {
        callMsGraphMail(response.accessToken).then(response => setGraphMailData(response));
    }).catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
            callMsGraphMail(response.accessToken).then(response => setGraphMailData(response));
        });
    });
}

  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>

          {
              graphData ? <ProfileData graphData={graphData} /> :
              <Button variant="secondary" onClick={RequestProfileData}>Request Profile Content</Button>
          }
          {graphMailData ? (graphMailData.map((mail, index) => {
              return <MailData mail={mail} key={index} />
          })
              )
              :
              <Button variant="secondary" onClick={RequestMailData}>Request Mail Content</Button>
          }
      </>
  );
};


function App() {
  return (
      <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
              {/* <p>You are signed in!</p> */}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              <p className="text-center">You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </PageLayout>
  );
}

export default App;