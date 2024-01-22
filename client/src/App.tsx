import React from "react";
import { Contact } from "./models/contact.model";
import {
  useAddContactMutation,
  useContactQuery,
  useContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./services/api";

function App() {
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery();
  return (
    <div className="App">
      <h1>Redux Toolkit RTK Query Tutorial</h1>
      {isLoading && <h1>...loading</h1>}
      {error && <p>Something went wrong</p>}
      {isSuccess && (
        <div>
          {data.map((contact: Contact) => {
            return (
              <div key={contact.id}>
                <span>{contact.name}</span>
                <span>
                  <ContactDetails id={contact.id} />
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <AddContact />
      </div>
    </div>
  );
}

export const ContactDetails = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id);
  return <p>{JSON.stringify(data, undefined)}</p>;
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contact = {
    id: "4",
    name: "new",
    email: "new@gmail.com",
  };

  const addHandler = async () => {
    await addContact(contact);
  };

  const updateHandler = async () => {
    await updateContact({
      id: "3",
      name: "Lerato Updated",
      email: "lerato@gmail.com",
    });
  };

  const deleteHandler = async () => {
    await deleteContact(contact.id);
  };

  return (
    <React.Fragment>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>Update Contact</button>
      <button onClick={deleteHandler}>delete Contact</button>
    </React.Fragment>
  );
};
export default App;
