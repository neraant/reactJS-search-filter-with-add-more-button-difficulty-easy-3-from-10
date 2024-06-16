import { useState } from "react";
import userImage from "./assets/people.png";
import JSONUSERSDATA from "../MOCK_DATA.json";

function App() {
  const [seacrhTerm, setSeacrhTerm] = useState("");
  const [quantity, setQuantity] = useState(JSONUSERSDATA.length);

  const [itemsToShow, setItemsToShow] = useState(8);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSeacrhTerm(searchTerm);

    const filteredUsers = JSONUSERSDATA.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    });

    setQuantity(filteredUsers.length);
  };

  const loadMore = () => {
    setItemsToShow(itemsToShow + 8);
  };

  return (
    <div className="users-container">
      <div className="users-quantity">Users: {quantity}</div>
      <input
        onChange={handleInputChange}
        type="text"
        className="name-input"
        placeholder="Enter Name"
      />
      <div className="users-container-wrapper">
        {JSONUSERSDATA.filter((val) => {
          if (seacrhTerm === "") {
            return val;
          } else if (
            val.first_name.toLowerCase().includes(seacrhTerm.toLowerCase())
          ) {
            return val;
          }
        })
          .slice(0, itemsToShow)
          .map((val, key) => {
            return (
              <div key={key} className="user-wrapper">
                <img src={userImage} alt="" />
                <div className="user-information-wrapper">
                  <p className="user-name user-information-text">
                    <strong>
                      {val.first_name} {val.last_name}
                    </strong>
                  </p>
                  <p className="user-email user-information-text">
                    <strong>Email:</strong> {val.email}
                  </p>
                  <p className="user-gender user-information-text">
                    <strong>Gender:</strong> {val.gender}
                  </p>
                  <p className="user-ip user-information-text">
                    <strong>IP-address:</strong> {val.ip_address}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {itemsToShow < quantity && (
        <button onClick={loadMore}>Загрузить ещё</button>
      )}
    </div>
  );
}

export default App;
