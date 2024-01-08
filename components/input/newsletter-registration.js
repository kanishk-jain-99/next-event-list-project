import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for Newsletter",
      status: "pending",
    });

    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
