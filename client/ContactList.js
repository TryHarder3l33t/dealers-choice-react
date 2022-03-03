import * as React from "react";
import SingleContact from "./SingleContact";

const ContactList = (props) => {
  const { list, selectItem } = props;
  console.log(list);
  return (
    <ul>
      {list.map((user) => {
        return (
          <li key={user.id} onClick={() => selectItem(user.id)}>
            <SingleContact contact={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;
