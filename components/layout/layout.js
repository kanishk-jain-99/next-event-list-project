import { Fragment, useContext } from "react";

import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotifiaction = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotifiaction && (
        <Notification
          title={activeNotifiaction.title}
          message={activeNotifiaction.message}
          status={activeNotifiaction.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
